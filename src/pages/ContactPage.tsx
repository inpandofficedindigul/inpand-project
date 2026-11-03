import React from 'react';
import { MessageSquare, Mail, Clock, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { COMPANY_CONFIG, generateGeneralWhatsAppLink, generateGeneralEmailLink } from '../lib/config';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title="Contact & Enquiries — Direct Communication"
        description="Connect directly with INPAND Technologies via official WhatsApp or email to discuss your upcoming website, e-commerce, or web application project."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Direct Client Channels</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-primary tracking-tight leading-[1.08] mb-6">
            Let&apos;s discuss your next digital project.
          </h1>

          <p className="text-lg sm:text-xl text-secondary leading-relaxed">
            We value direct and prompt communication. Connect with our principal engineers and directors via WhatsApp or email to explore requirements, timelines, and budgets.
          </p>
        </div>

        {/* Primary Contact Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Official WhatsApp Business */}
          <div className="bg-white p-8 sm:p-10 rounded-md border border-border flex flex-col justify-between shadow-subtle group hover:border-border-strong transition-all">
            <div>
              <div className="w-12 h-12 rounded-sm bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100">
                <MessageSquare size={24} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 block">
                Immediate Response
              </span>

              <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                WhatsApp Business Enquiry
              </h2>

              <p className="text-sm text-secondary leading-relaxed mb-6">
                Connect directly with our team on WhatsApp for real-time discussions, project scoping, and quick consultations.
              </p>

              <div className="bg-[#F7F7F5] p-4 rounded-sm border border-border text-xs text-secondary mb-8">
                <span className="font-semibold text-primary block mb-1">Official WhatsApp Number:</span>
                <span className="font-mono text-sm text-primary">{COMPANY_CONFIG.whatsappDisplay}</span>
              </div>
            </div>

            <Button
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              variant="accent"
              size="lg"
              className="w-full justify-center bg-emerald-600 hover:bg-emerald-700"
              icon={<ArrowUpRight size={18} />}
            >
              Start WhatsApp Conversation
            </Button>
          </div>

          {/* Card 2: Official Email Enquiry */}
          <div className="bg-white p-8 sm:p-10 rounded-md border border-border flex flex-col justify-between shadow-subtle group hover:border-border-strong transition-all">
            <div>
              <div className="w-12 h-12 rounded-sm bg-blue-50 text-accent flex items-center justify-center mb-6 border border-blue-100">
                <Mail size={24} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
                Formal Project RFPs
              </span>

              <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                Email Enquiry &amp; Briefs
              </h2>

              <p className="text-sm text-secondary leading-relaxed mb-6">
                Send us your project brief, specifications, or request for proposal. We provide detailed feasibility feedback and quotes.
              </p>

              <div className="bg-[#F7F7F5] p-4 rounded-sm border border-border text-xs text-secondary mb-8">
                <span className="font-semibold text-primary block mb-1">Official Enquiry Mail:</span>
                <span className="font-mono text-sm text-primary">{COMPANY_CONFIG.email}</span>
              </div>
            </div>

            <Button
              href={generateGeneralEmailLink()}
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={<ArrowUpRight size={18} />}
            >
              Compose Email to INPAND
            </Button>
          </div>

        </div>

        {/* Studio Details & Verification Info */}
        <div className="bg-white rounded-md border border-border p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-base text-primary mb-1">Response Time</h4>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                  We reply to inquiries within 24 hours on business days, and typically within 2 hours on WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-base text-primary mb-1">Global Delivery</h4>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                  Headquartered in India with client deployments across North America, Europe, Asia, and Australia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-base text-primary mb-1">Client Confidentiality</h4>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                  All shared project concepts, specifications, and proprietary data are treated with strict confidentiality.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
