import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import { generateGeneralWhatsAppLink, generateGeneralEmailLink, COMPANY_CONFIG } from '../../lib/config';

export const HomeContactCTA: React.FC = () => {
  return (
    <section className="py-24 border-t border-border bg-primary text-white relative overflow-hidden">
      {/* Subtle architectural background accents */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-sm text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ready For New Client Engagements</span>
          </div>

          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white mb-6">
            Have a Project in Mind?
          </h2>

          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed mb-10 max-w-2xl">
            Let&apos;s discuss how INPAND Technologies can bring your next digital idea to life.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              variant="accent"
              size="lg"
              icon={<MessageCircle size={18} />}
            >
              WhatsApp Us
            </Button>

            <Button
              href={generateGeneralEmailLink()}
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20 border-white/20"
              icon={<Mail size={18} />}
            >
              Email Us
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <span>Direct WhatsApp: {COMPANY_CONFIG.whatsappDisplay}</span>
            <span>&bull;</span>
            <span>Official Email: {COMPANY_CONFIG.email}</span>
            <span>&bull;</span>
            <span>Response within 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
};
