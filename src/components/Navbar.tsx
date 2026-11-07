import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Search, PlayCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { megaMenuData, navLinks } from '../data/navigation';
import { cn } from '../utils/cn';
import { hasDarkHero } from '../utils/darkHeroRoutes';
import { stockImage } from '../utils/images';

const getMenuImageSrc = (image: string) => {
  if (image.startsWith('/') || image.startsWith('http')) return image;
  return stockImage(image, 160);
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim();
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Move focus into the search field when it opens (instead of autoFocus).
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Close menus on navigation.
  useEffect(() => {
    setIsOpen(false);
    setActiveMega(null);
    setSearchOpen(false);
  }, [location.pathname]);

  // Esc closes whichever overlay is open; mobile drawer also locks page scroll.
  useEffect(() => {
    if (!activeMega && !isOpen && !searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (activeMega) {
        document.getElementById(`mega-toggle-${activeMega}`)?.focus();
        setActiveMega(null);
      }
      if (isOpen) {
        setIsOpen(false);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
      setSearchOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeMega, isOpen, searchOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pages whose hero is a dark stage in both themes (home hero and SpotlightHero pages).
  const isOverDark = hasDarkHero(location.pathname) && !scrolled && !activeMega && !isOpen;

  return (
    <>
        {activeMega && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[65] animate-fade-in" onMouseEnter={() => setActiveMega(null)} />
        )}

      <nav className={cn(
        "fixed left-0 right-0 top-0 transition-all duration-500 border-b z-[70] flex items-center",
        (scrolled || activeMega || isOpen)
          ? "bg-background/95 backdrop-blur-md border-border h-20 shadow-sm"
          : isOverDark
            ? "bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-transparent border-transparent h-24"
            : "bg-transparent border-transparent h-24"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-full">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <Logo
                alt="AIScripto home"
                variant={isOverDark ? 'white' : 'auto'}
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0 xl:gap-1 flex-grow justify-center min-w-0">
              {navLinks.filter((link) => link.path !== '/').map((link) => {
                return (
                  <div
                    key={link.name}
                    className="static"
                    onMouseEnter={() => link.isMega && handleMouseEnter(link.name)}
                    onMouseLeave={() => link.isMega && handleMouseLeave()}
                    onBlur={(e) => {
                      // Close the panel when keyboard focus moves outside this menu item.
                      if (link.isMega && activeMega === link.name && !e.currentTarget.contains(e.relatedTarget as Node)) {
                        setActiveMega(null);
                      }
                    }}
                  >
                    <div className={cn(
                      "flex items-center",
                      location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                        ? (isOverDark ? "text-cyan-300 font-extrabold" : "text-primary")
                        : (isOverDark ? "text-white/95 hover:text-white" : "text-foreground/90")
                    )}>
                      <Link
                        to={link.path}
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                        className={cn(
                          "text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 py-6 uppercase tracking-wide",
                          isOverDark ? "hover:text-cyan-200 drop-shadow-xs" : "hover:text-primary",
                          link.isMega ? "pl-2.5 pr-0.5" : "px-2.5"
                        )}
                      >
                        {link.name}
                      </Link>
                      {link.isMega && (
                        <button
                          type="button"
                          id={`mega-toggle-${link.name}`}
                          aria-expanded={activeMega === link.name}
                          aria-controls={`mega-panel-${link.name}`}
                          aria-label={`${link.name} menu`}
                          onClick={() => setActiveMega(activeMega === link.name ? null : link.name)}
                          className={cn(
                            "py-6 pr-2 pl-0.5 transition-colors",
                            isOverDark ? "text-white/80 hover:text-white" : "hover:text-primary"
                          )}
                        >
                          <ChevronDown aria-hidden="true" className={cn(
                            "w-3.5 h-3.5 transition-transform duration-300",
                            activeMega === link.name && "rotate-180"
                          )} />
                        </button>
                      )}
                    </div>

                    {link.isMega && activeMega === link.name && (
                          <div id={`mega-panel-${link.name}`} className="absolute top-full left-0 right-0 w-full z-[80] bg-background border-b border-border shadow-2xl overflow-hidden animate-fade-down [animation-duration:0.3s]" onMouseEnter={() => handleMouseEnter(link.name)} onMouseLeave={() => handleMouseLeave()}>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                              <div className="grid grid-cols-12 gap-8 items-start">
                                <div className="col-span-3 border-r border-border/60 pr-6">
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-brand-primary-ink text-xs font-bold uppercase tracking-wider mb-2">
                                    Overview
                                  </div>
                                  <h4 className="text-xl font-bold mb-1.5 text-foreground">{link.name}</h4>
                                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                    {link.name === 'Products' && "Explore our production-grade AI solutions built to solve real business challenges."}
                                    {link.name === 'Services' && "Comprehensive technology solutions to drive your business forward."}
                                    {link.name === 'Industries' && "Specialized expertise across diverse sectors to solve complex challenges."}
                                    {link.name === 'Insights' && "Stay ahead with the latest trends, research, and success stories."}
                                    {link.name === 'Company' && "Learn about our journey, our people, and how we make an impact."}
                                  </p>
                                  <Link
                                    to={link.path}
                                    onClick={() => setActiveMega(null)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all"
                                  >
                                    Explore All <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>

                                <div className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-1.5">
                                  {megaMenuData[link.name as keyof typeof megaMenuData]?.map((sub) => (
                                    <Link
                                      key={sub.title}
                                      to={sub.path}
                                      onClick={() => setActiveMega(null)}
                                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/70 transition-all group/item border border-transparent hover:border-border/50"
                                    >
                                      <div className="relative shrink-0 mt-0.5">
                                        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 group-hover/item:scale-105 shadow-xs", sub.bg, sub.color)}>
                                          <sub.icon className="w-4.5 h-4.5" />
                                        </div>
                                        {sub.image && (
                                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md border border-background overflow-hidden shadow-xs">
                                            <img width={16} height={16}
                                              src={getMenuImageSrc(sub.image)}
                                              alt=""
                                              className="w-full h-full object-cover"
                                             
                                              loading="lazy"
                                              decoding="async"
                                            />
                                          </div>
                                        )}
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <h5 className="font-bold text-sm text-foreground mb-0.5 group-hover/item:text-primary transition-colors leading-snug">
                                          {sub.title}
                                        </h5>
                                        <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                                          {sub.description}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/30 py-2.5 border-t border-border/60">
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
                                <div className="flex items-center gap-6">
                                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Trending:</span>
                                  <Link to="/products/nexus-agent" onClick={() => setActiveMega(null)} className="text-xs font-semibold text-foreground/80 hover:text-primary transition-colors">NexusAgent Voice AI</Link>
                                  <Link to="/products/ai-voice-booking" onClick={() => setActiveMega(null)} className="text-xs font-semibold text-foreground/80 hover:text-primary transition-colors">AI Booking Agent</Link>
                                  <Link to="/products/pos-restaurant" onClick={() => setActiveMega(null)} className="text-xs font-semibold text-foreground/80 hover:text-primary transition-colors">AI POS System</Link>
                                  <Link to="/live-demos" onClick={() => setActiveMega(null)} className="text-xs font-bold text-brand-secondary-ink hover:underline">Live Demos</Link>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-muted-foreground">Ready to start?</span>
                                  <Link to="/contact" onClick={() => setActiveMega(null)} className="text-xs font-bold text-primary hover:underline">Talk to an Expert &rarr;</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-1 shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  isOverDark
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <ThemeSwitcher isOverDark={isOverDark} />

              <Link
                to="/live-demos"
                /* Quiet outline style: the page's own primary CTA stays the single filled button in view. */
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                  isOverDark
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-border text-foreground hover:bg-muted'
                }`}
              >
                <PlayCircle className={`w-4 h-4 ${isOverDark ? 'text-cyan-300' : 'text-brand-primary-ink'}`} aria-hidden="true" />
                Live demos
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeSwitcher isOverDark={isOverDark} />
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isOverDark
                    ? "text-white hover:bg-white/10"
                    : "hover:bg-muted text-foreground"
                )}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu-panel"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
          {searchOpen && (
            <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-8 shadow-2xl pointer-events-auto animate-fade-down">
              <div className="max-w-3xl mx-auto relative">
                <form onSubmit={handleSearchSubmit}>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    aria-label="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, services, industries, or insights..."
                    className="w-full bg-muted border border-border rounded-2xl py-4 pl-14 pr-16 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </form>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
      </nav>

      {/* Mobile Menu - Rendered OUTSIDE nav to avoid z-index clipping */}
        {isOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden animate-fade-in [animation-duration:0.2s]">
            {/* Backdrop */}
            <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setIsOpen(false)} />

            {/* Menu Panel */}
            <div id="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Site navigation" className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl flex flex-col animate-slide-in-right">
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-border">
                <Logo alt="AIScripto" width={112} height={32} className="h-8 w-auto" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Items */}
              <div className="flex-grow overflow-y-auto p-5 space-y-1">
                {navLinks.map((link) => {
                  const isExpanded = expandedMobile === link.name;
                  const LinkIcon = link.icon;
                  const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));

                  return (
                    <div key={link.name}>
                      {link.isMega ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`mobile-sub-${link.name}`}
                            onClick={() => setExpandedMobile(isExpanded ? null : link.name)}
                            className={cn(
                              "w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all",
                              isActive ? "text-primary bg-primary/5" : "text-foreground hover:bg-muted"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <LinkIcon className="w-5 h-5" />
                              <span className="font-bold text-base">{link.name}</span>
                            </div>
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180")} />
                          </button>
                            {isExpanded && (
                              <div className="overflow-hidden animate-fade-in [animation-duration:0.25s]">
                                <div id={`mobile-sub-${link.name}`} className="ml-4 pl-4 border-l-2 border-primary/20 space-y-1 py-2">
                                  {megaMenuData[link.name as keyof typeof megaMenuData]?.map((sub) => (
                                    <Link
                                      key={sub.title}
                                      to={sub.path}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-muted transition-colors"
                                    >
                                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", sub.bg, sub.color)}>
                                        <sub.icon className="w-4 h-4" />
                                      </div>
                                      <div className="min-w-0">
                                        <span className="text-sm font-semibold block truncate">{sub.title}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{sub.description}</span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 py-3 px-4 rounded-xl transition-all",
                            isActive ? "text-primary bg-primary/5" : "text-foreground hover:bg-muted"
                          )}
                        >
                          <LinkIcon className="w-5 h-5" />
                          <span className="font-bold text-base">{link.name}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="p-5 border-t border-border space-y-3">
                <Link
                  to="/live-demos"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-primary/20"
                >
                  <PlayCircle className="w-4 h-4" aria-hidden="true" />
                  Try a live demo
                </Link>
              </div>
            </div>
          </div>
        )}
    </>
  );
}