import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import Seo from "../components/Seo";
import { buttonClasses } from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The requested page could not be found on the AIScripto website." noIndex={true} />
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="space-y-8 animate-fade-up">
          <h1 className="text-9xl font-black text-primary/20">404</h1>
          <div className="space-y-4">
            <h2 className="text-h2 font-bold">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className={buttonClasses('primary', 'lg')}
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 border border-border px-8 py-3.5 rounded-full font-bold uppercase tracking-wider hover:bg-muted transition-all text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Popular Destinations</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
              <Link to="/services" className="px-4 py-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors">Enterprise Services</Link>
              <Link to="/products" className="px-4 py-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors">AI Products</Link>
              <Link to="/live-demos" className="px-4 py-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors">Live Demos</Link>
              <Link to="/contact" className="px-4 py-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors">Contact Engineering</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
);
}
