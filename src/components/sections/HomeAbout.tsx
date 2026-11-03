import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Terminal } from 'lucide-react';

export const HomeAbout: React.FC = () => {
  return (
    <section className="py-24 border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              About INPAND Technologies
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-tight">
              We engineer digital platforms where design precision meets technical excellence.
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              INPAND Technologies is a specialized digital technology studio. We partner with ambitious companies to architect, design, and develop web experiences that define brands and accelerate business outcomes.
            </p>
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                <span>Read Full Studio Profile</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Key Principles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-primary mb-4">
                <Zap size={20} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Performance First</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Zero bloated scripts, sub-second load times, and flawless Core Web Vitals to deliver immediate engagement and high search visibility.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-primary mb-4">
                <Terminal size={20} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Modern Architecture</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Built with modern React, TypeScript, and headless API integrations that scale reliably with your business growth.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-primary mb-4">
                <CheckCircle2 size={20} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Editorial Precision</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Every layout, typeface pairing, and transition is meticulously considered to reflect your brand&apos;s true caliber and market authority.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={20} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Production Reliability</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                We deliver thoroughly tested, secure, and production-ready code with continuous support and transparent handover.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
