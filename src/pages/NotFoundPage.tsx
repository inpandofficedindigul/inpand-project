import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 md:py-32 flex items-center justify-center">
      <SEOHead title="404 — Page Not Found" />

      <div className="max-w-xl mx-auto px-4 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
          Error 404 &bull; Missing Route
        </span>

        <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-primary tracking-tight mb-4">
          Project Not Located
        </h1>

        <p className="text-secondary text-base sm:text-lg mb-8 leading-relaxed">
          The requested page or showcase project could not be found. It may have been archived or the URL may be incorrect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/" variant="primary" size="md" icon={<ArrowLeft size={16} />} iconPosition="left">
            Return to Homepage
          </Button>

          <Button to="/projects" variant="secondary" size="md" icon={<ArrowUpRight size={16} />}>
            Explore All Projects
          </Button>
        </div>
      </div>
    </div>
  );
};
