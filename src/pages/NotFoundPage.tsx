import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 md:py-36 flex items-center justify-center">
      <SEOHead title="404 — Page Not Found" noindex={true} />

      <div className="max-w-xl mx-auto px-4 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
          Error 404 &bull; Page Not Found
        </span>

        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-primary tracking-tight mb-4">
          Route Not Found
        </h1>

        <p className="text-secondary text-base sm:text-lg mb-8 leading-relaxed">
          The requested page does not exist or may have been moved. You can navigate back to the homepage or explore our project collection.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button to="/" variant="primary" size="md" icon={<ArrowLeft size={16} />} iconPosition="left">
            Return to Homepage
          </Button>

          <Button to="/projects" variant="secondary" size="md" icon={<ArrowUpRight size={16} />}>
            Explore Projects
          </Button>
        </div>
      </div>
    </div>
  );
};
