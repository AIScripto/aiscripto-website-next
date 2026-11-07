import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, Phone, MapPin, MessageSquare, PlayCircle } from 'lucide-react';
import Logo from './Logo';
import { megaMenuData } from '../data/navigation';
import { liveDemoItems } from '../data/products';
import { COMPANY, WHATSAPP_URL } from '../data/company';

export default function Footer() {
  const socialLinks = [
    {
      href: 'https://www.facebook.com/profile.php?id=61590698113621',
      Icon: Facebook,
      label: 'Facebook',
    },
    {
      href: 'https://www.linkedin.com/company/aiscripto/',
      Icon: Linkedin,
      label: 'LinkedIn',
    },
  ];

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10 mb-16">
          {/* Brand Col (full width on phones/tablets so the link columns can sit two-up) */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo alt="AIScripto home" lazy className="h-10 md:h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We build AI agents, automation and custom software for growing businesses, from voice receptionists and analytics to POS, ERP and the integrations that connect them.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="pt-1">
              <Link
                to="/live-demos"
                className="inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 px-4 py-2 text-sm font-bold text-brand-secondary-ink hover:bg-brand-secondary/20 transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                Try {liveDemoItems.length} live demos
              </Link>
            </div>
          </div>

          {/* Products Col */}
          <div>
            <h2 className="font-bold mb-5 text-xs uppercase tracking-wider text-foreground">Products</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {megaMenuData.Products.map((item) => (
                <li key={item.path}><Link to={item.path} className="hover:text-primary transition-colors">{item.title}</Link></li>
              ))}
              <li className="pt-1.5"><Link to="/products" className="font-bold text-primary hover:underline inline-flex items-center gap-1">View All Products →</Link></li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h2 className="font-bold mb-5 text-xs uppercase tracking-wider text-foreground">Services</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {megaMenuData.Services.map((item) => (
                <li key={item.path}><Link to={item.path} className="hover:text-primary transition-colors">{item.title}</Link></li>
              ))}
              <li className="pt-1.5"><Link to="/services" className="font-bold text-primary hover:underline inline-flex items-center gap-1">Explore Services →</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h2 className="font-bold mb-5 text-xs uppercase tracking-wider text-foreground">Company</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/leadership" className="hover:text-primary transition-colors">Practice Leadership</Link></li>
              <li><Link to="/global" className="hover:text-primary transition-colors">Global Presence</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/inventors" className="hover:text-primary transition-colors">Innovation Lab</Link></li>
              <li><Link to="/industries" className="hover:text-primary transition-colors">Industries</Link></li>
              <li><Link to="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Engineering Blog</Link></li>
              <li><Link to="/insights" className="hover:text-primary transition-colors">Insights</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events & Webinars</Link></li>
            </ul>
          </div>

          {/* Contact Col (full width on small phones so the address and email never overflow) */}
          <div className="col-span-2 sm:col-span-1">
            <h2 className="font-bold mb-5 text-xs uppercase tracking-wider text-foreground">Offices & Contact</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{COMPANY.headOfficeAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={COMPANY.phoneHref} className="hover:text-primary transition-colors">{COMPANY.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-primary transition-colors [overflow-wrap:anywhere]">{COMPANY.email}</a>
              </li>
              <li className="pt-1.5">
                <Link to="/contact" className="font-bold text-primary hover:underline inline-flex items-center gap-1">Contact Us →</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AIScripto. All rights reserved.</p>
          <div className="flex gap-6 text-xs sm:text-sm">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
