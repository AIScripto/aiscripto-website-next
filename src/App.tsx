import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import WhatsAppButton from './components/WhatsAppButton';
import { useEffect, lazy, Suspense } from 'react';
import { normalizePath } from './components/Seo';
import Home from './pages/Home';

// Route-level code-splitting to minimize initial bundle size and maximize PageSpeed scores
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const LiveDemos = lazy(() => import('./pages/LiveDemos'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Insights = lazy(() => import('./pages/Insights'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Leadership = lazy(() => import('./pages/Leadership'));
const Careers = lazy(() => import('./pages/Careers'));
const Events = lazy(() => import('./pages/Events'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Global = lazy(() => import('./pages/Global'));
const Inventors = lazy(() => import('./pages/Inventors'));
const AiChatbotDevelopment = lazy(() => import('./pages/AiChatbotDevelopment'));
const HvacAiReceptionist = lazy(() => import('./pages/HvacAiReceptionist'));
const CustomCrmDevelopment = lazy(() => import('./pages/CustomCrmDevelopment'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }

    try {
      const gtag = window.gtag;
      if (typeof gtag === 'function') {
        gtag('config', 'G-ZDN3RE88L3', {
          page_path: pathname,
        });
        gtag('config', 'G-ZGG48Z60PZ', {
          page_path: pathname,
        });
      }
    } catch {
      // Safely ignore analytics beaconing errors if blocked by extensions
    }
  }, [pathname, hash]);

  return null;
}

/** Redirects /SERVICES/ERP or /services/erp/ to /services/erp so each page has one URL. */
function CanonicalPathRedirect() {
  const { pathname, search, hash } = useLocation();
  const normalized = normalizePath(pathname);
  if (normalized !== pathname) {
    return <Navigate to={`${normalized}${search}${hash}`} replace />;
  }
  return null;
}

function ServiceRedirect() {
  const { id } = useParams<{ id: string }>();
  if (id === 'custom-software-development') {
    return <Navigate to="/services/software" replace />;
  }
  return <Navigate to={id ? `/services/${id}` : '/services'} replace />;
}

/** Everything inside the router. Shared by the browser (BrowserRouter) and the prerenderer (StaticRouter). */
export function AppContent() {
  return (
    <>
        <ScrollToTop />
        <CanonicalPathRedirect />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:font-bold focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <Navbar />

          <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/ai-pos" element={<Navigate to="/products/pos-restaurant" replace />} />
                <Route path="/products/calibr" element={<Navigate to="/products" replace />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/live-demos" element={<LiveDemos />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services/erp/odoo-implementation" element={<Navigate to="/services/erp" replace />} />
                <Route path="/services/cloud/finops-cost-optimization" element={<Navigate to="/services/cloud" replace />} />
                <Route path="/solutions/ai-voice-receptionist-healthcare" element={<Navigate to="/products/ai-voice-booking" replace />} />
                <Route path="/solutions/ai-receptionist-for-hvac" element={<HvacAiReceptionist />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/ai-chatbot-development" element={<AiChatbotDevelopment />} />
                <Route path="/services/custom-crm-development" element={<CustomCrmDevelopment />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/service" element={<Navigate to="/services" replace />} />
                <Route path="/service/:id" element={<ServiceRedirect />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
                <Route path="/blog/erp-crm-accounting-integration-guide" element={<Navigate to="/services/erp" replace />} />
                <Route path="/blog/ai-agents-vs-chatbots-enterprise" element={<Navigate to="/services/ai" replace />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:id" element={<IndustryDetail />} />
                <Route path="/company" element={<Navigate to="/about" replace />} />
                <Route path="/leadership" element={<Leadership />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/events" element={<Events />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/global" element={<Global />} />
                <Route path="/inventors" element={<Inventors />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
          <ChatWidget />
        </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
