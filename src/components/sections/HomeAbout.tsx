import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Laptop, ShoppingCart, TrendingUp } from 'lucide-react';
import { COMPANY_CONFIG } from '../../lib/config';

export const HomeAbout: React.FC = () => {
  return (
    <section className="py-24 border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Value Prop from inpand.com */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              About INPAND Technologies
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight leading-tight">
              &ldquo;{COMPANY_CONFIG.tagline}&rdquo;
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              INPAND Technologies is a digital technology company specializing in professional website design, custom application development, e-commerce solutions, and digital marketing strategies.
            </p>
            <p className="text-secondary text-sm leading-relaxed">
              We partner with businesses to engineer digital experiences that strengthen brand presence, streamline customer interactions, and drive sustainable commercial growth.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                <span>Learn More About Our Approach</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Verified Services from inpand.com */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent mb-4">
                <Laptop size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-primary mb-2">
                Website Design &amp; Development
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Responsive, modern websites crafted with clean typography, intuitive user journeys, and robust frontend performance across all devices.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent mb-4">
                <Code2 size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-primary mb-2">
                Web Application Development
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Tailored web applications, client portals, and interactive business tools engineered to solve operational workflows efficiently.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent mb-4">
                <ShoppingCart size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-primary mb-2">
                E-Commerce Solutions
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Scalable online storefronts designed to optimize product presentation, provide smooth catalog browsing, and convert visitors into buyers.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F5] rounded-md border border-border">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent mb-4">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-primary mb-2">
                Digital Marketing
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Strategic online marketing services helping companies expand their digital reach, attract qualified leads, and grow their market presence.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
