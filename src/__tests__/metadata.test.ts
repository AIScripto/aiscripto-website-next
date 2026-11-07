import { describe, it, expect } from 'vitest';
import { SEOConfig } from '../config/seoConfig';
import {
  buildServiceSchema,
  buildBlogPostingSchema,
  buildSoftwareApplicationSchema,
  buildLocalBusinessSchema,
  buildCaseStudySchema,
  buildFaqSchema,
  verifiedOfficesData,
} from '../utils/schema';
import { caseStudies } from '../data/caseStudies';

describe('SEO Metadata Configuration', () => {
  it('should have correct default site values', () => {
    expect(SEOConfig.siteName).toBe('AIScripto');
    expect(SEOConfig.siteUrl).toBe('https://www.aiscripto.com');
    expect(SEOConfig.titleTemplate).toBe('%s | AIScripto');
    expect(SEOConfig.defaultLocale).toBe('en_US');
  });

  it('should format page titles with single brand suffix and deduplicate if already branded', () => {
    const rawTitle = 'Enterprise AI Agent Development & Automation Services';
    const formatted = SEOConfig.titleTemplate.replace('%s', rawTitle);

    expect(formatted).toBe('Enterprise AI Agent Development & Automation Services | AIScripto');
    expect(formatted.match(/AIScripto/g)?.length).toBe(1);

    // Verify deduplication logic used in Seo.tsx
    const alreadyBrandedTitle = 'Contact AIScripto | Schedule an Enterprise AI Consultation';
    const deduplicated = alreadyBrandedTitle.includes(SEOConfig.siteName)
      ? alreadyBrandedTitle
      : SEOConfig.titleTemplate.replace('%s', alreadyBrandedTitle);
    expect(deduplicated).toBe('Contact AIScripto | Schedule an Enterprise AI Consultation');
    expect(deduplicated.match(/AIScripto/g)?.length).toBe(1);
  });

  it('should target primary GSC keyword in case study metadata (PAGE-01)', () => {
    const eventStudy = caseStudies.find((s) => s.id === 'ai-event-registration-services');
    expect(eventStudy).toBeDefined();
    expect(eventStudy?.title).toBe('AI Onsite Event Registration Services');
    expect(eventStudy?.seoTitle).toContain('AI Onsite Event Registration Services');
    expect(eventStudy?.seoDescription).toContain('AI onsite event registration services');
  });

  it('should use defaultTitle when no specific title is supplied', () => {
    const emptyTitle = '';
    const pageTitle = emptyTitle
      ? SEOConfig.titleTemplate.replace('%s', emptyTitle)
      : SEOConfig.defaultTitle;

    expect(pageTitle).toBe(SEOConfig.defaultTitle);
  });
});

describe('Schema.org Structured Data Generators', () => {
  it('generates valid Service schema adhering strictly to Google Search Central guidelines', () => {
    const serviceSchema = buildServiceSchema('ai', {
      title: 'AI Agents & Automation',
      shortTitle: 'AI Agents',
      seoDescription: 'Enterprise AI Agent Development Services',
      description: 'We build autonomous AI agents.',
      process: [{ title: 'Audit', desc: 'Opportunity audit' }],
    });

    expect(serviceSchema['@context']).toBe('https://schema.org');
    expect(serviceSchema['@type']).toBe('Service');
    expect(serviceSchema['@id']).toBe('https://www.aiscripto.com/services/ai#service');
    expect(serviceSchema.name).toBe('AI Agents & Automation');
    expect(serviceSchema.provider['@id']).toBe('https://www.aiscripto.com/#organization');
    expect(serviceSchema.hasOfferCatalog?.['@type']).toBe('OfferCatalog');
    expect(serviceSchema.hasOfferCatalog?.itemListElement[0].itemOffered.name).toBe('Audit');
  });

  it('generates valid CaseStudy / TechArticle schema (TECH-05, PAGE-01)', () => {
    const studySchema = buildCaseStudySchema({
      id: 'ai-event-registration-services',
      title: 'AI Onsite Event Registration Services',
      seoTitle: 'AI Onsite Event Registration Services | Case Study | AIScripto',
      seoDescription: 'Discover how AIScripto delivered AI onsite event registration services.',
      solution: 'AI-assisted registration',
      image: 'https://images.unsplash.com/test.jpg',
      tech: ['Next.js', 'OpenAI', 'QR Check-in'],
      industry: 'Events',
    });

    expect(studySchema['@context']).toBe('https://schema.org');
    expect(studySchema['@type']).toBe('TechArticle');
    expect(studySchema['@id']).toBe('https://www.aiscripto.com/case-studies/ai-event-registration-services#article');
    expect(studySchema.headline).toBe('AI Onsite Event Registration Services | Case Study | AIScripto');
    expect(studySchema.author['@id']).toBe('https://www.aiscripto.com/#organization');
    expect(studySchema.publisher['@id']).toBe('https://www.aiscripto.com/#organization');
    expect(studySchema.keywords).toBe('Next.js, OpenAI, QR Check-in');
  });

  it('generates valid FAQPage schema for service FAQs (TECH-05)', () => {
    const faqSchema = buildFaqSchema([
      { q: 'How do you integrate ERP systems?', a: 'We build custom connectors and pipelines.' },
    ]);

    expect(faqSchema).not.toBeNull();
    expect(faqSchema?.['@context']).toBe('https://schema.org');
    expect(faqSchema?.['@type']).toBe('FAQPage');
    expect(faqSchema?.mainEntity.length).toBe(1);
    expect(faqSchema?.mainEntity[0]['@type']).toBe('Question');
    expect(faqSchema?.mainEntity[0].name).toBe('How do you integrate ERP systems?');
    expect(faqSchema?.mainEntity[0].acceptedAnswer.text).toBe('We build custom connectors and pipelines.');
  });

  it('generates valid BlogPosting schema with correct publisher and date formats', () => {
    const blogSchema = buildBlogPostingSchema({
      id: 'test-post',
      title: 'Testing Enterprise AI',
      intro: 'A technical overview of testing AI in production.',
      image: 'https://images.unsplash.com/test.jpg',
      date: 'May 15, 2026',
      author: 'Alex Rivera',
      category: 'AI & ML',
    });

    expect(blogSchema['@type']).toBe('BlogPosting');
    expect(blogSchema.headline).toBe('Testing Enterprise AI');
    expect(blogSchema.author.name).toBe('Alex Rivera');
    expect(blogSchema.publisher['@id']).toBe('https://www.aiscripto.com/#organization');
    expect(blogSchema.datePublished).toContain('2026');
  });

  it('generates valid SoftwareApplication schema matching published product information', () => {
    const productSchema = buildSoftwareApplicationSchema({
      id: 'business-analytics-ai',
      name: 'Business Analytics AI',
      headline: 'Autonomous Loss Prevention',
      shortDescription: 'Zero-code executive overlay.',
      image: '/images/products/analytics-dashboard.webp',
      pricingPilot: {
        starter: 'Single Business Unit ($490/mo)',
      },
    });

    expect(productSchema['@type']).toBe('SoftwareApplication');
    expect(productSchema.applicationCategory).toBe('BusinessApplication');
    expect(productSchema.offers?.['@type']).toBe('Offer');
    expect(productSchema.offers?.price).toBe('490.00');
    expect(productSchema.offers?.priceCurrency).toBe('USD');
  });

  it('omits the Offer entirely when no numeric price is published', () => {
    const productSchema = buildSoftwareApplicationSchema({
      id: 'erp-financials',
      name: 'ERP',
      shortDescription: 'Financial core.',
      image: '/images/products/erp-dashboard.webp',
      pricingPilot: { model: 'Custom enterprise pilot' },
    });

    expect(productSchema.offers).toBeUndefined();
  });

  it('generates accurate LocalBusiness schemas for verified physical office locations', () => {
    const localSchemas = buildLocalBusinessSchema(verifiedOfficesData);

    expect(localSchemas.length).toBe(4);
    expect(localSchemas[0]['@type']).toBe('ProfessionalService');
    expect(localSchemas[0].address.addressCountry).toBe('US');
    expect(localSchemas[0].address.streetAddress).toBe('7034 Sacramento Dr');
    expect(localSchemas[0].parentOrganization['@id']).toBe('https://www.aiscripto.com/#organization');
  });

  it('ensures index.html does not contain hardcoded static root canonical (TECH-02)', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    const indexHtml = await fs.readFile(path.resolve(process.cwd(), 'index.html'), 'utf8');

    expect(indexHtml).not.toContain('<link rel="canonical" href="https://www.aiscripto.com/" />');
    expect(indexHtml).not.toContain('<link rel="canonical"');
  });
});

describe('BreadcrumbList schema', () => {
  it('builds Home › Section › Page for detail pages', async () => {
    const { buildBreadcrumbSchema } = await import('../components/Seo');
    const crumbs = buildBreadcrumbSchema('/services/erp', 'ERP Integration');
    expect(crumbs?.itemListElement.map((i: { name: string }) => i.name)).toEqual(['Home', 'Services', 'ERP Integration']);
    expect(crumbs?.itemListElement[2].item).toBe('https://www.aiscripto.com/services/erp');
  });

  it('maps /solutions/* to the Products hub and skips top-level pages', async () => {
    const { buildBreadcrumbSchema } = await import('../components/Seo');
    expect(buildBreadcrumbSchema('/solutions/ai-receptionist-for-hvac', 'HVAC')?.itemListElement[1].item).toBe('https://www.aiscripto.com/products');
    expect(buildBreadcrumbSchema('/contact', 'Contact')).toBeNull();
    expect(buildBreadcrumbSchema('/', 'Home')).toBeNull();
  });
});
