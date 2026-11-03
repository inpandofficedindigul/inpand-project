import React from 'react';
import { ArrowUpRight, Zap, Sparkles, Terminal } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { generateGeneralWhatsAppLink } from '../lib/config';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title="About Studio — Digital Engineering & Craft"
        description="Learn about INPAND Technologies. We design and engineer premium websites and digital platforms built to make a commercial impact."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            <span>Studio Profile</span>
            <span className="text-border">&bull;</span>
            <span>INPAND Technologies</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-primary tracking-tight leading-[1.08] mb-6">
            Digital craftsmanship meets engineering discipline.
          </h1>

          <p className="text-lg sm:text-xl text-secondary leading-relaxed">
            INPAND Technologies is an independent creative technology studio. We specialize in designing and engineering high-impact web presences, custom commerce systems, and bespoke digital platforms for forward-thinking enterprises.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6 text-base text-secondary leading-relaxed">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary tracking-tight">
              Our Ethos &amp; Approach
            </h2>
            <p>
              The modern web is inundated with generic templates, fragile plugins, and bloated user interfaces that compromise brand reputation and slow down user engagement. At INPAND Technologies, we believe in a radically different standard.
            </p>
            <p>
              We treat digital development as a discipline of precision: typography tailored with architectural rhythm, layouts optimized for sensory clarity, and frontend codebases structured for long-term maintainability.
            </p>
            <p>
              Whether engineering an ultra-fast static showcase for a design atelier, an international headless e-commerce store, or a mission-critical web application, we build with rigorous standards and uncompromised focus on commercial results.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-md border border-border flex flex-col gap-6">
            <h3 className="font-heading font-bold text-lg text-primary pb-3 border-b border-border">
              Studio Metrics &amp; Commitments
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="font-heading font-extrabold text-3xl text-primary block">
                  100%
                </span>
                <span className="text-xs text-secondary mt-1 block">
                  Bespoke Codebases &bull; Zero Bloat
                </span>
              </div>

              <div>
                <span className="font-heading font-extrabold text-3xl text-primary block">
                  &lt; 0.8s
                </span>
                <span className="text-xs text-secondary mt-1 block">
                  Target Interactive Latency
                </span>
              </div>

              <div>
                <span className="font-heading font-extrabold text-3xl text-primary block">
                  A+
                </span>
                <span className="text-xs text-secondary mt-1 block">
                  Core Web Vitals Benchmark
                </span>
              </div>

              <div>
                <span className="font-heading font-extrabold text-3xl text-primary block">
                  24/7
                </span>
                <span className="text-xs text-secondary mt-1 block">
                  Direct WhatsApp &amp; Email Support
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                href={generateGeneralWhatsAppLink()}
                target="_blank"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowUpRight size={16} />}
              >
                Discuss a Project With Us
              </Button>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="pt-16 border-t border-border mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
              Core Principles
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              What Defines Our Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-[#F7F7F5] border border-border flex items-center justify-center text-accent mb-5">
                <Zap size={20} />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-3">Speed as a Feature</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Page speed directly dictates conversion and brand prestige. We eliminate unneeded libraries, bundle sizes, and unnecessary requests.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-[#F7F7F5] border border-border flex items-center justify-center text-accent mb-5">
                <Sparkles size={20} />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-3">Editorial Aesthetics</h3>
              <p className="text-sm text-secondary leading-relaxed">
                We draw inspiration from modern architectural publishing and minimalist design studios, providing our clients with an unmistakably high-end aura.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-[#F7F7F5] border border-border flex items-center justify-center text-accent mb-5">
                <Terminal size={20} />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-3">Clean Architecture</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Strongly typed TypeScript codebases, modular component architecture, and future-proof patterns that any frontend team can effortlessly maintain.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
