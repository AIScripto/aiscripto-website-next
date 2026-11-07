import { useState, useMemo } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import Seo from "../components/Seo";
import EnterpriseCta from '../components/EnterpriseCta';

/** Filter chips built from the post data, so every category in use gets a chip. */
const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.intro.toLowerCase().includes(q) ||
        post.sections.some(s => s.heading.toLowerCase().includes(q) || s.body.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;

  return (
    <>
      <Seo
        title="Enterprise AI, Cloud & Software Engineering Blog"
        description="In-depth technical architecture, deployment methodologies, and operational benchmarks across autonomous AI agents, voice telephony, ERP automation, and cloud."
      />
    <div className="pt-32">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <div className="inline-block text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Engineering & Technology Blog</div>
            <h1 className="text-h1 font-bold mb-6">Enterprise AI &amp; Software <span className="text-gradient">Engineering Blog</span></h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              In-depth technical architecture, deployment methodologies, and operational benchmarks across autonomous AI agents, voice telephony, ERP automation, and cloud platforms.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full bg-muted border border-border rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(6);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <article key={post.id} className="group bg-background border border-border rounded-3xl overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col justify-between reveal">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img width={960} height={600} 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                   
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-md">{post.category}</span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full">{post.readTime}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-8 pb-8 pt-0">
                <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {visiblePosts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No articles found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-sm font-bold text-primary hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {hasMorePosts && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((count) => Math.min(count + 6, filteredPosts.length))}
              className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 px-8 py-3.5 rounded-full font-bold transition-all text-sm cursor-pointer shadow-sm"
            >
              Load More Articles ({filteredPosts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </section>

      {/* Enterprise Consultation CTA */}
      <EnterpriseCta
        badge="Enterprise AI Engineering"
        heading="Looking to Implement These AI Architectures?"
        description="Schedule a technical consultation with our solutions architects to evaluate feasibility, system integrations, and pilot delivery for your organization."
        primaryButtonText="Book a consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Try a live demo"
        secondaryButtonLink="/live-demos"
        trustPoints={[
          "Direct Solutions Architect Consultation",
          "Mutual NDA Execution on Request",
          "Production-Grade Architecture Roadmaps"
        ]}
      />
    </div>
    </>
  );
}
