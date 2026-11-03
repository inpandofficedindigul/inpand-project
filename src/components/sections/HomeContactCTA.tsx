import React from 'react';
import { MessageSquare, Mail, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';
import { generateGeneralWhatsAppLink, generateGeneralEmailLink, COMPANY_CONFIG } from '../../lib/config';

export const HomeContactCTA: React.FC = () => {
  return (
    <section className="py-24 border-t border-border bg-primary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-sm text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Ready to Build</span>
          </div>

          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white mb-6">
            Have a project in mind?
          </h2>

          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed mb-10 max-w-2xl">
            Tell us what you&apos;re planning. Let&apos;s discuss how INPAND Technologies can help bring your digital solution to life.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              variant="accent"
              size="lg"
              icon={<MessageSquare size={17} />}
            >
              Contact on WhatsApp
            </Button>

            <Button
              href={generateGeneralEmailLink()}
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20 border-white/20"
              icon={<Mail size={17} />}
            >
              Contact via Email
            </Button>

            <Button
              to="/contact"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              icon={<ArrowUpRight size={17} />}
            >
              Contact Details
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <span>Direct WhatsApp: {COMPANY_CONFIG.phoneDisplay}</span>
            <span>&bull;</span>
            <span>Official Email: {COMPANY_CONFIG.email}</span>
            <span>&bull;</span>
            <span>Hours: {COMPANY_CONFIG.workingHours}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
