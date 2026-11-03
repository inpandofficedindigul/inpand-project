import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

export const HomeHero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Architectural Editorial Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm shadow-subtle mb-8">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            INPAND Technologies &bull; Digital Project Showcase
          </span>
        </div>

        {/* Hero Composition: Large Editorial Typography & Intentional Whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-primary tracking-tight leading-[1.08]">
              Digital Experiences. <br />
              <span className="text-secondary font-normal">Built to Make</span> an Impact.
            </h1>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-8 pt-2">
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Explore websites and digital solutions developed by INPAND Technologies for businesses across different industries.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                to="/projects"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight size={16} />}
              >
                Explore Our Work
              </Button>

              <Button
                to="/contact"
                variant="secondary"
                size="lg"
              >
                Discuss Your Project
              </Button>
            </div>
          </div>
        </div>

        {/* Minimal Architectural Grid Framework */}
        <div className="mt-16 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-secondary">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-accent uppercase font-bold tracking-wider">01 &bull; Engineering</span>
            <span className="font-heading font-bold text-sm text-primary">Static Websites</span>
            <span>Ultra-fast architecture &amp; high performance</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-accent uppercase font-bold tracking-wider">02 &bull; Interaction</span>
            <span className="font-heading font-bold text-sm text-primary">Dynamic Websites</span>
            <span>Content-driven corporate web platforms</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-accent uppercase font-bold tracking-wider">03 &bull; Commerce</span>
            <span className="font-heading font-bold text-sm text-primary">E-Commerce</span>
            <span>Conversion-focused digital storefronts</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-accent uppercase font-bold tracking-wider">04 &bull; Solutions</span>
            <span className="font-heading font-bold text-sm text-primary">Web Applications</span>
            <span>Custom business portals &amp; digital tools</span>
          </div>
        </div>

      </div>
    </section>
  );
};
