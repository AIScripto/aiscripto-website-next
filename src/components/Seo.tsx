import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEOConfig } from "../config/seoConfig";
import { HeadContext } from "./HeadContext";

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  noIndex?: boolean;
  schema?: Record<string, unknown> | (Record<string, unknown> | null)[] | null;
  /** Open Graph type; use "article" for blog posts and case studies. */
  type?: "website" | "article";
  /** ISO date, emitted as article:published_time when type is "article". */
  publishedTime?: string;
};

const SECTION_HUBS: Record<string, { name: string; path: string }> = {
  products: { name: "Products", path: "/products" },
  solutions: { name: "Products", path: "/products" }, // /solutions/* has no hub of its own
  services: { name: "Services", path: "/services" },
  blog: { name: "Blog", path: "/blog" },
  "case-studies": { name: "Case Studies", path: "/case-studies" },
  industries: { name: "Industries", path: "/industries" },
};

/** BreadcrumbList for two-level pages (e.g. /services/erp): Home › Services › ERP. */
export function buildBreadcrumbSchema(path: string, pageName: string) {
  const [section, slug, ...rest] = path.split("/").filter(Boolean);
  const hub = section ? SECTION_HUBS[section] : undefined;
  if (!hub || !slug || rest.length > 0) return null;
  const item = (position: number, name: string, p: string) => ({
    "@type": "ListItem",
    position,
    name,
    item: `${SEOConfig.siteUrl}${p}`,
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [item(1, "Home", "/"), item(2, hub.name, hub.path), item(3, pageName, path)],
  };
}

/** One canonical form per page: lowercase, no trailing slash (except root). */
export function normalizePath(pathname: string) {
  const lower = pathname.toLowerCase();
  return lower.length > 1 ? lower.replace(/\/+$/, "") : lower;
}

function updateMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.content = content;
}

function updateLinkRel(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function updateJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[] | null | undefined) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"]#${id}`);

  if (!data) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data, null, 2);
}

export default function Seo({
  title,
  description,
  image,
  pathname,
  noIndex,
  schema,
  type = "website",
  publishedTime,
}: SeoProps) {
  const location = useLocation();
  const pageTitle = title
    ? title.includes(SEOConfig.siteName)
      ? title
      : SEOConfig.titleTemplate.replace("%s", title)
    : SEOConfig.defaultTitle;
  const pageDescription = description ?? SEOConfig.defaultDescription;
  const pagePath = normalizePath(pathname ?? location.pathname);
  const pageUrl = `${SEOConfig.siteUrl}${pagePath}`;
  // Social scrapers need absolute image URLs.
  const rawImage = image ?? SEOConfig.defaultImage;
  const pageImage = rawImage.startsWith("/") ? `${SEOConfig.siteUrl}${rawImage}` : rawImage;

  // Page schema plus an automatic breadcrumb trail for detail pages.
  const breadcrumb = noIndex ? null : buildBreadcrumbSchema(pagePath, (title ?? SEOConfig.siteName).split(" | ")[0]);
  const pageSchemas = [...(Array.isArray(schema) ? schema : [schema]), breadcrumb].filter(
    (s): s is Record<string, unknown> => Boolean(s),
  );
  const allSchema = pageSchemas.length === 0 ? undefined : pageSchemas.length === 1 ? pageSchemas[0] : pageSchemas;
  // Stable dependency for the effect (schema objects are rebuilt every render).
  const schemaJson = allSchema ? JSON.stringify(allSchema) : "";

  // Prerendering: hand head data to the build script (effects don't run on the server).
  const headCollector = useContext(HeadContext);
  if (headCollector) {
    headCollector.current = {
      title: pageTitle,
      description: pageDescription,
      canonical: pageUrl,
      image: pageImage,
      type,
      noIndex: Boolean(noIndex),
      publishedTime,
      schema: allSchema,
    };
  }

  useEffect(() => {
    document.title = pageTitle;

    updateMeta("description", pageDescription);
    updateMetaProperty("og:title", pageTitle);
    updateMetaProperty("og:description", pageDescription);
    updateMetaProperty("og:type", type);
    const publishedEl = document.head.querySelector('meta[property="article:published_time"]');
    if (type === "article" && publishedTime) {
      updateMetaProperty("article:published_time", publishedTime);
    } else {
      publishedEl?.remove();
    }
    updateMetaProperty("og:url", pageUrl);
    updateMetaProperty("og:image", pageImage);
    updateMetaProperty("og:site_name", SEOConfig.siteName);
    updateMetaProperty("og:locale", SEOConfig.defaultLocale);

    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", pageTitle);
    updateMeta("twitter:description", pageDescription);
    updateMeta("twitter:image", pageImage);
    updateMeta("twitter:site", SEOConfig.twitterHandle);
    updateMeta("robots", noIndex ? "noindex,nofollow" : "index,follow");

    updateLinkRel("canonical", pageUrl);

    if (schemaJson) {
      updateJsonLd("route-structured-data", JSON.parse(schemaJson));
    } else {
      updateJsonLd("route-structured-data", null);
    }

    return () => {
      updateJsonLd("route-structured-data", null);
    };
  }, [pageTitle, pageDescription, pageUrl, pageImage, noIndex, schemaJson, type, publishedTime]);

  return null;
}
