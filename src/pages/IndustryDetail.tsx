import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';
import Seo from "../components/Seo";
import NotFound from './NotFound';
import EnterpriseCta from '../components/EnterpriseCta';
import { formatGradientText } from '../utils/textGradient';
import { renderRichText } from '../utils/richText';
import { industryData } from '../data/industries';
import { stockImage } from '../utils/images';
import { buttonClasses } from '../components/ui/Button';


const getImageSrc = (image: string) => {
  if (image.startsWith('/') || image.startsWith('http')) return image;
  return stockImage(image, 960);
};

export default function IndustryDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id ? industryData[id as keyof typeof industryData] : null;

  if (!data) {
    return <NotFound />;
  }


  return (
    <>
      <Seo
        title={data.seoTitle ?? data.title}
        description={data.seoDescription ?? data.description}
      />
    <div className="pt-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-from-left [animation-duration:0.6s]">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", data.bg, data.color)}>
              <data.icon className="w-8 h-8" />
            </div>
            <h1 className="text-h1 font-bold mb-6">
              {formatGradientText(data.h1 ?? data.title)}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {data.description}
            </p>
            <Link
              to="/contact"
              className={buttonClasses('primary', 'lg')}
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="relative animate-fade-scale [animation-duration:0.6s]">
            <div className="relative glass rounded-3xl overflow-hidden border border-border aspect-video">
              <img width={960} height={600} fetchPriority="high" 
                src={getImageSrc(data.image)} 
                alt={data.title} 
                className="w-full h-full object-cover"
               
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-h2 font-bold mb-8">Industry Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                {renderRichText(data.overview)}
              </p>
              
              <h3 className="text-2xl font-bold mb-8">Key Challenges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-background border border-border rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <p className="font-medium">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-primary text-primary-foreground p-10 rounded-3xl shadow-2xl shadow-primary/20">
                <h3 className="text-2xl font-bold mb-6">Why AIScripto?</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/60" />
                    <span className="font-medium">Deep Industry Expertise</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/60" />
                    <span className="font-medium">Tailored Solutions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/60" />
                    <span className="font-medium">Global Delivery Model</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/60" />
                    <span className="font-medium">Dedicated support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="section-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-bold text-brand-primary-ink uppercase tracking-widest mb-4">Our Solutions</div>
            <h2 className="text-h2 font-bold">Technology Built for {data.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.solutions.map((solution, i) => (
              <div key={i} className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 hover:shadow-2xl transition-all group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <solution.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {renderRichText(solution.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Industry CTA */}
      <EnterpriseCta
        badge={`${data.title} Architecture`}
        heading={`Accelerate Your ${data.title} Technology Roadmap`}
        description="Schedule an architecture session with our industry practice leads to evaluate technical specifications, security controls, and dedicated engineering delivery."
        primaryButtonText="Book a consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore All Industries"
        secondaryButtonLink="/industries"
        trustPoints={[
          "Domain-Specific Architecture Guidance",
          "Mutual NDA Execution on Request",
          "Enterprise Compliance & Security Review"
        ]}
      />
    </div>
    </>
);
}
