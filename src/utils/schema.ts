/**
 * Structured Data (Schema.org JSON-LD) Generators for AIScripto.com
 * Adheres strictly to Google Search Central guidelines:
 * - Uses only verified, visible page content
 * - No invented reviews, ratings, pricing, certifications, or fictitious locations
 * - Uses stable @id anchors to connect WebSite -> Organization -> Services / Products
 */

import { COMPANY, OFFICES } from "../data/company";

const SITE_URL = "https://www.aiscripto.com";
const ORG_ID = `${SITE_URL}/#organization`;

export interface SchemaServiceData {
  title: string;
  shortTitle?: string;
  seoDescription?: string;
  description: string;
  process?: { title: string; desc: string }[];
  features?: string[];
}

export function buildServiceSchema(id: string, data: SchemaServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${id}#service`,
    name: data.title,
    serviceType: data.shortTitle || data.title,
    description: data.seoDescription || data.description,
    url: `${SITE_URL}/services/${id}`,
    provider: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "AIScripto",
      url: `${SITE_URL}/`,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Italy" },
      { "@type": "Country", name: "Pakistan" },
    ],
    termsOfService: `${SITE_URL}/terms-of-service`,
    ...(data.process && data.process.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${data.title} Phases & Deliverables`,
            itemListElement: data.process.map((step, idx) => ({
              "@type": "Offer",
              position: idx + 1,
              itemOffered: {
                "@type": "Service",
                name: step.title,
                description: step.desc,
              },
            })),
          },
        }
      : {}),
  };
}

/** Service schema for standalone landing pages (/services/ai-chatbot-development etc.). */
export function buildLandingServiceSchema(page: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  areaServed: string[];
}) {
  const url = `${SITE_URL}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.name,
    serviceType: page.serviceType,
    description: page.description,
    url,
    provider: { "@type": "Organization", "@id": ORG_ID, name: "AIScripto", url: `${SITE_URL}/` },
    // "European Union" is not a schema.org Country; describe it as a Place.
    areaServed: page.areaServed.map((name) => ({ "@type": name === "European Union" ? "Place" : "Country", name })),
  };
}

export interface SchemaBlogPost {
  id: string;
  title: string;
  intro?: string;
  excerpt?: string;
  image: string;
  date: string;
  /** Optional last-updated date; set it when a post is materially revised. */
  updated?: string;
  author: string;
  category: string;
}

const toIso = (value?: string) => {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
};

export function buildBlogPostingSchema(post: SchemaBlogPost) {
  // Never invent a date: an invalid/missing date is omitted rather than faked.
  const isoDate = toIso(post.date);
  const isoModified = toIso(post.updated) ?? isoDate;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.id}#article`,
    headline: post.title,
    description: post.excerpt || post.intro || post.title,
    image: [post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`],
    ...(isoDate ? { datePublished: isoDate, dateModified: isoModified } : {}),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "AIScripto",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.id}`,
    },
    articleSection: post.category,
    inLanguage: "en-US",
  };
}

export interface SchemaProduct {
  id: string;
  name: string;
  headline?: string;
  shortDescription: string;
  image: string;
  category?: string;
  pricingPilot?: {
    model?: string;
    starter?: string;
    growth?: string;
    enterprise?: string;
    pilotOffer?: string;
  };
}

export function buildSoftwareApplicationSchema(product: SchemaProduct) {
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image}`;

  // Extract real numeric starter price if published in starter tier (e.g. "$490/mo" -> "490.00")
  let priceMatch: RegExpMatchArray | null = null;
  if (product.pricingPilot?.starter) {
    priceMatch = product.pricingPilot.starter.match(/\$([0-9,]+)/);
  }

  const numericPrice = priceMatch
    ? priceMatch[1].replace(/,/g, "") + ".00"
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/products/${product.id}#software`,
    name: product.name,
    headline: product.headline || product.name,
    description: product.shortDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Cloud",
    image: imageUrl,
    url: `${SITE_URL}/products/${product.id}`,
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "AIScripto",
    },
    // Only emit an Offer when a real published price exists — an Offer without
    // `price` is invalid for Google's SoftwareApplication rich results.
    ...(numericPrice
      ? {
          offers: {
            "@type": "Offer",
            price: numericPrice,
            priceCurrency: "USD",
            url: `${SITE_URL}/products/${product.id}`,
            description: product.pricingPilot?.starter,
          },
        }
      : {}),
  };
}

export interface VerifiedOffice {
  title: string;
  address: string;
  phone: string;
  country: string;
  city: string;
  street?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  countryCode?: string;
}

export function buildLocalBusinessSchema(offices: VerifiedOffice[]) {
  return offices.map((office) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/contact#${office.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: `AIScripto - ${office.title}`,
    telephone: office.phone,
    email: COMPANY.email,
    url: `${SITE_URL}/contact`,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.street || office.address.split(",")[0],
      addressLocality: office.locality || office.city.split(",")[0].trim(),
      addressRegion: office.region || (office.city.split(",")[1] ? office.city.split(",")[1].trim() : ""),
      postalCode: office.postalCode || "",
      addressCountry: office.countryCode || office.country,
    },
    parentOrganization: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "AIScripto",
      url: `${SITE_URL}/`,
    },
  }));
}

export const verifiedOfficesData: VerifiedOffice[] = OFFICES;

export function buildServiceCatalogSchema(services: { id: string; title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/services#catalog`,
    name: "AIScripto Enterprise Technology & AI Engineering Services",
    description: "Production-ready enterprise software development, autonomous AI agent engineering, ERP/CRM integration, cloud modernization, DevOps, and cybersecurity services.",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${service.id}#service`,
        name: service.title,
        description: service.description,
        url: `${SITE_URL}/services/${service.id}`,
        provider: {
          "@type": "Organization",
          "@id": ORG_ID,
          name: "AIScripto",
          url: `${SITE_URL}/`,
        },
      },
    })),
  };
}

export function buildProductCatalogSchema(products: SchemaProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/products#catalog`,
    name: "AIScripto Enterprise AI Software Products",
    description: "Production-grade AI software suite including voice receptionists, offline-first restaurant POS, business analytics, and executive AI agents.",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/products/${product.id}#software`,
        name: product.name,
        description: product.shortDescription,
        applicationCategory: "BusinessApplication",
        url: `${SITE_URL}/products/${product.id}`,
      },
    })),
  };
}

export interface SchemaCaseStudy {
  id: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  client?: string;
  industry?: string;
  solution?: string;
  results?: string;
  image: string;
  tech?: string[];
  challenge?: string;
  approach?: string;
  impact?: string[];
}

export function buildCaseStudySchema(study: SchemaCaseStudy) {
  const imageUrl = study.image.startsWith("http")
    ? study.image
    : `${SITE_URL}${study.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/case-studies/${study.id}#article`,
    headline: study.seoTitle || study.title,
    description: study.seoDescription || study.solution || study.title,
    image: [imageUrl],
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "AIScripto",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "AIScripto",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    about: study.industry
      ? {
          "@type": "Thing",
          name: study.industry,
        }
      : undefined,
    keywords: study.tech ? study.tech.join(", ") : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/case-studies/${study.id}`,
    },
    inLanguage: "en-US",
  };
}

export interface SchemaFaqItem {
  q: string;
  a: string;
}

export function buildFaqSchema(faqs?: SchemaFaqItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

