import React from 'react';
import { MessageSquare, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import { generateGeneralWhatsAppLink, generateGeneralEmailLink, COMPANY_CONFIG } from '../../lib/config';

interface ProjectEmptyStateProps {
  categoryName?: string;
  isFiltered?: boolean;
  onResetFilter?: () => void;
}

export const ProjectEmptyState: React.FC<ProjectEmptyStateProps> = ({
  categoryName,
  isFiltered = false,
  onResetFilter,
}) => {
  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-white p-8 sm:p-12 md:p-16 text-center shadow-subtle">
      {/* Subtle top indicator */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-secondary mb-6">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>Curated Showcase in Preparation</span>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight mb-4">
          {isFiltered && categoryName
            ? `${categoryName} Showcase in Preparation`
            : 'Production Showcase Catalog Being Curated'}
        </h3>

        <p className="text-secondary text-sm sm:text-base leading-relaxed mb-8">
          {isFiltered && categoryName
            ? `Approved client projects in the ${categoryName} category are currently undergoing final asset review and client domain verification. Contact us directly to discuss our capabilities in this area.`
            : 'INPAND Technologies is curating our latest production web applications, e-commerce storefronts, and client platforms for publication. In the meantime, our engineering team is available to discuss your specific digital project requirements.'}
        </p>

        {/* Capability Tags / What INPAND builds */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs">
          <span className="px-3 py-1 bg-[#F5F5F3] border border-border text-primary font-medium rounded-sm">
            Static Websites
          </span>
          <span className="px-3 py-1 bg-[#F5F5F3] border border-border text-primary font-medium rounded-sm">
            Dynamic CMS Websites
          </span>
          <span className="px-3 py-1 bg-[#F5F5F3] border border-border text-primary font-medium rounded-sm">
            E-Commerce Storefronts
          </span>
          <span className="px-3 py-1 bg-[#F5F5F3] border border-border text-primary font-medium rounded-sm">
            Custom Web Applications
          </span>
        </div>

        {/* Direct Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            href={generateGeneralWhatsAppLink()}
            target="_blank"
            variant="accent"
            size="md"
            icon={<MessageSquare size={16} />}
          >
            Discuss on WhatsApp
          </Button>

          <Button
            href={generateGeneralEmailLink()}
            variant="secondary"
            size="md"
            icon={<Mail size={16} />}
          >
            Email Project Enquiry
          </Button>

          {isFiltered && onResetFilter && (
            <button
              onClick={onResetFilter}
              className="text-xs font-semibold text-secondary hover:text-primary transition-colors px-3 py-2"
            >
              &larr; View All Categories
            </button>
          )}
        </div>

        <p className="text-xs text-secondary/80 mt-8">
          Direct telephone enquiries: <a href={COMPANY_CONFIG.phoneTel} className="text-primary hover:underline font-medium">{COMPANY_CONFIG.phoneDisplay}</a> &bull; {COMPANY_CONFIG.workingHours}
        </p>
      </div>
    </div>
  );
};
