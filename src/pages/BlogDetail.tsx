import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Seo from "../components/Seo";
import NotFound from './NotFound';
import { formatGradientText } from '../utils/textGradient';
import { buildBlogPostingSchema } from '../utils/schema';
import { renderRichText } from '../utils/richText';
import { buttonClasses } from '../components/ui/Button';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((item) => item.id === id);
  const relatedPosts = blogPosts.filter((item) => item.id !== id).slice(0, 3);

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <Seo
        title={post.seoTitle ?? post.title}
        description={post.seoDescription ?? post.intro}
        schema={buildBlogPostingSchema(post)}
        image={post.image}
        type="article"
        publishedTime={isNaN(new Date(post.date).getTime()) ? undefined : new Date(post.date).toISOString()}
      />
    <div className="pt-32">
      <article>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">{post.category}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-h1 font-bold mb-6">{formatGradientText(post.title)}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{post.intro}</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
          <div className="relative overflow-hidden rounded-3xl border border-border aspect-[16/8]">
            <img width={960} height={600} fetchPriority="high" src={post.image} alt={post.title} className="w-full h-full object-cover" decoding="async" />
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-h2 font-bold mb-5">{section.heading}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{renderRichText(section.body)}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-muted/30 border border-border">
            <h2 className="text-2xl font-bold mb-4">Ready to apply this in your business?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              AIScripto helps teams turn strategy into production-ready AI, cloud, software, and security solutions.
            </p>
            <Link
              to="/contact"
              className={buttonClasses('primary', 'lg')}
            >
              Talk to an Expert <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Keep Reading</h2>
            <h3 className="text-3xl font-bold">Related Articles</h3>
          </div>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((item) => (
            <Link key={item.id} to={`/blog/${item.id}`} className="group bg-background border border-border rounded-3xl overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img width={960} height={600} src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-3">{item.category}</p>
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
    </>
);
}
