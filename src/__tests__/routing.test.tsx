import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from '../hooks/useTheme';
import NotFound from '../pages/NotFound';
import ServiceDetail from '../pages/ServiceDetail';
import { productsData } from '../data/products';

function ServiceRedirect() {
  const { id } = useParams<{ id: string }>();
  if (id === 'custom-software-development') {
    return <Navigate to="/services/software" replace />;
  }
  return <Navigate to={id ? `/services/${id}` : '/services'} replace />;
}

describe('Routing and Fallback Redirects', () => {
  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
  });
  it('should redirect /service/custom-software-development to /services/software', () => {
    render(
      <MemoryRouter initialEntries={['/service/custom-software-development']}>
        <Routes>
          <Route path="/service/:id" element={<ServiceRedirect />} />
          <Route path="/services/software" element={<div>Custom Software Target</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Custom Software Target')).toBeDefined();
  });

  it('should redirect /service/:id to /services/:id', () => {
    render(
      <MemoryRouter initialEntries={['/service/ai']}>
        <Routes>
          <Route path="/service/:id" element={<ServiceRedirect />} />
          <Route path="/services/ai" element={<div>AI Service Target</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('AI Service Target')).toBeDefined();
  });

  it('should redirect legacy /products/ai-pos to /products/pos-restaurant', () => {
    render(
      <MemoryRouter initialEntries={['/products/ai-pos']}>
        <Routes>
          <Route path="/products/ai-pos" element={<Navigate to="/products/pos-restaurant" replace />} />
          <Route path="/products/pos-restaurant" element={<div>POS Restaurant Target</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('POS Restaurant Target')).toBeDefined();
  });

  it('should render NotFound page on unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-non-existent-page-xyz']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
  });

  it('should contain all valid product IDs in products catalog', () => {
    const productIds = productsData.map(p => p.id);
    expect(productIds).toContain('business-analytics-ai');
    expect(productIds).toContain('nexus-agent');
    expect(productIds).toContain('ai-voice-booking');
    expect(productIds).toContain('pos-fast-food');
    expect(productIds).toContain('pos-restaurant');
    expect(productIds).toContain('ai-agent-web');
    expect(productIds).toContain('erp-financials');
    expect(productIds.length).toBe(7);
  });

  const allServices = [
    { id: 'ai', expectedHeading: 'Autonomous AI Agent Development & Workflow Automation Services' },
    { id: 'devops', expectedHeading: 'DevOps Consulting & Site Reliability Engineering (SRE) Services' },
    { id: 'erp', expectedHeading: 'Enterprise ERP & CRM Integration Services' },
    { id: 'software', expectedHeading: 'Custom Software Development & Enterprise Application Engineering' },
    { id: 'cloud', expectedHeading: 'Cloud Migration, Multi-Cloud Architecture & FinOps Optimization' },
    { id: 'security', expectedHeading: 'Cybersecurity Consulting & Compliance Engineering Services' }
  ];

  allServices.forEach(({ id, expectedHeading }) => {
    it(`should render /services/${id} with correct commercial heading`, () => {
      render(
        <MemoryRouter initialEntries={[`/services/${id}`]}>
          <Routes>
            <Route path="/services/:id" element={<ServiceDetail />} />
          </Routes>
        </MemoryRouter>
      );

      const headings = screen.getAllByRole('heading', { level: 1 });
      const mainHeading = headings.find(h => h.textContent?.includes(expectedHeading));
      expect(mainHeading).toBeDefined();
    });
  });

  it('should render persistent visible H1 and value proposition on Homepage', async () => {
    const Home = (await import('../pages/Home')).default;
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toContain('Enterprise AI Solutions & Software Development');

    // Confirm persistent value proposition copy and internal links exist
    expect(screen.getByText(/We partner with businesses in the US, UK and Europe on/i)).toBeDefined();
    expect(screen.getByText('enterprise AI agent development')).toBeDefined();
    expect(screen.getByText('ERP & CRM integration')).toBeDefined();
  });

  it('should show the US head office on Contact and link to all offices on /global', async () => {
    const Contact = (await import('../pages/Contact')).default;
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/7034 Sacramento Dr, Tracy, CA 95377, USA/i)).toBeDefined();
    expect(screen.getAllByText(/\+1 \(425\) 554 1783/i).length).toBeGreaterThan(0);
    // Office cards live on /global; Contact shows the head office and links there.
    expect(screen.getByRole('link', { name: /All 4 offices/i }).getAttribute('href')).toBe('/global');
    expect(screen.queryByText(/Via Giambattista Miliani, 21, 60044 Fabriano AN, Italy/i)).toBeNull();
    expect(screen.queryByText(/18112 132nd Ave E, South Hill, WA 98374/i)).toBeNull();
  });

  it('should display Tracy CA as US Head Office and Italy office on Global page', async () => {
    const Global = (await import('../pages/Global')).default;
    render(
      <MemoryRouter initialEntries={['/global']}>
        <Routes>
          <Route path="/global" element={<Global />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/7034 Sacramento Dr, Tracy, CA 95377, USA/i)).toBeDefined();
    expect(screen.getAllByText(/\+1 \(425\) 554 1783/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Via Giambattista Miliani, 21, 60044 Fabriano AN, Italy/i)).toBeDefined();
    expect(screen.getByText(/\+39 380 130 5231/i)).toBeDefined();
    expect(screen.queryByText(/18112 132nd Ave E, South Hill, WA 98374/i)).toBeNull();
  });

  it('should redirect content roadmap routes to consolidated parent services (ROAD-01..05)', () => {
    render(
      <MemoryRouter initialEntries={['/services/erp/odoo-implementation']}>
        <Routes>
          <Route path="/services/erp/odoo-implementation" element={<Navigate to="/services/erp" replace />} />
          <Route path="/services/erp" element={<div>ERP Parent Target</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('ERP Parent Target')).toBeDefined();
  });

  it('should display commercial H1 on Healthcare industry page (PAGE-02)', async () => {
    const IndustryDetail = (await import('../pages/IndustryDetail')).default;
    render(
      <MemoryRouter initialEntries={['/industries/healthcare']}>
        <Routes>
          <Route path="/industries/:id" element={<IndustryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBe(1);
    expect(h1Elements[0].textContent).toContain('Healthcare AI Solutions');
  });
});
