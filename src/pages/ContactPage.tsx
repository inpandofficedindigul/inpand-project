import React from 'react';
import { MessageSquare, Mail, Phone, Clock, MapPin, Building2, ArrowUpRight, HelpCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { COMPANY_CONFIG, generateGeneralWhatsAppLink, generateGeneralEmailLink } from '../lib/config';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title="Contact & Enquiries — INPAND Technologies"
        description={`Connect with INPAND Technologies via official WhatsApp (${COMPANY_CONFIG.phoneDisplay}), email (${COMPANY_CONFIG.email}), or phone to discuss your website or web application project.`}
        path="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-accent mb-4 shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Direct Client Communication</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-primary tracking-tight leading-[1.08] mb-6">
            Let&apos;s discuss your project.
          </h1>

          <p className="text-lg sm:text-xl text-secondary leading-relaxed">
            Connect directly with INPAND Technologies. We believe in direct communication to understand your project requirements, timeline, and commercial objectives.
          </p>
        </div>

        {/* Primary Contact Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Official WhatsApp */}
          <div className="bg-white p-8 rounded-md border border-border flex flex-col justify-between shadow-subtle hover:border-border-strong transition-all">
            <div>
              <div className="w-12 h-12 rounded-sm bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100">
                <MessageSquare size={24} />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1 block">
                Instant Chat
              </span>

              <h2 className="font-heading font-bold text-xl text-primary mb-2">
                WhatsApp Chat
              </h2>

              <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">
                Start a direct WhatsApp conversation for quick questions, project scope outlines, or consultation requests.
              </p>

              <div className="bg-[#F7F7F5] p-3 rounded-sm border border-border text-xs mb-6">
                <span className="text-secondary block mb-0.5">WhatsApp Number:</span>
                <span className="font-mono font-semibold text-primary">{COMPANY_CONFIG.phoneDisplay}</span>
              </div>
            </div>

            <Button
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              variant="accent"
              size="md"
              className="w-full justify-center bg-emerald-600 hover:bg-emerald-700"
              icon={<ArrowUpRight size={16} />}
            >
              Open in WhatsApp
            </Button>
          </div>

          {/* Card 2: Official Email */}
          <div className="bg-white p-8 rounded-md border border-border flex flex-col justify-between shadow-subtle hover:border-border-strong transition-all">
            <div>
              <div className="w-12 h-12 rounded-sm bg-blue-50 text-accent flex items-center justify-center mb-6 border border-blue-100">
                <Mail size={24} />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-accent mb-1 block">
                Detailed Enquiries
              </span>

              <h2 className="font-heading font-bold text-xl text-primary mb-2">
                Email Enquiry
              </h2>

              <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">
                Send your detailed project specifications, RFPs, or design references directly to our engineering mailbox.
              </p>

              <div className="bg-[#F7F7F5] p-3 rounded-sm border border-border text-xs mb-6">
                <span className="text-secondary block mb-0.5">Official Email:</span>
                <span className="font-mono font-semibold text-primary truncate block">{COMPANY_CONFIG.email}</span>
              </div>
            </div>

            <Button
              href={generateGeneralEmailLink()}
              variant="primary"
              size="md"
              className="w-full justify-center"
              icon={<ArrowUpRight size={16} />}
            >
              Compose Email
            </Button>
          </div>

          {/* Card 3: Telephone Direct */}
          <div className="bg-white p-8 rounded-md border border-border flex flex-col justify-between shadow-subtle hover:border-border-strong transition-all">
            <div>
              <div className="w-12 h-12 rounded-sm bg-neutral-100 text-primary flex items-center justify-center mb-6 border border-border">
                <Phone size={24} />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1 block">
                Direct Call
              </span>

              <h2 className="font-heading font-bold text-xl text-primary mb-2">
                Phone Call
              </h2>

              <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">
                Speak directly with an INPAND representative during standard office working hours.
              </p>

              <div className="bg-[#F7F7F5] p-3 rounded-sm border border-border text-xs mb-6">
                <span className="text-secondary block mb-0.5">Telephone Number:</span>
                <span className="font-mono font-semibold text-primary">{COMPANY_CONFIG.phoneDisplay}</span>
              </div>
            </div>

            <Button
              href={COMPANY_CONFIG.phoneTel}
              variant="secondary"
              size="md"
              className="w-full justify-center"
              icon={<ArrowUpRight size={16} />}
            >
              Call {COMPANY_CONFIG.phone}
            </Button>
          </div>

        </div>

        {/* Office Locations & Operating Schedule */}
        <div className="bg-white rounded-md border border-border p-8 sm:p-10 mb-12 shadow-subtle">
          <div className="mb-6 pb-4 border-b border-border/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-heading font-bold text-xl text-primary">
                Official Office Locations
              </h2>
              <p className="text-xs sm:text-sm text-secondary">
                Visit or write to INPAND Technologies at either of our verified office branches in Dindigul.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F7F5] border border-border rounded text-[11px] font-semibold text-secondary self-start sm:self-auto">
              <Building2 size={13} className="text-accent" />
              <span>2 Verified Locations</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
            
            {/* Head Office */}
            <div className="flex items-start gap-4 p-5 rounded-md bg-[#F7F7F5]/70 border border-border/80">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-subtle">
                <Building2 size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-heading font-bold text-base text-primary">
                    Head Office
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded-sm">
                    Main HQ
                  </span>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-2 font-medium">
                  {COMPANY_CONFIG.headOffice.address}
                </p>
                <p className="text-xs text-secondary/80">
                  Registered corporate and engineering development headquarters.
                </p>
              </div>
            </div>

            {/* Branch Office */}
            <div className="flex items-start gap-4 p-5 rounded-md bg-[#F7F7F5]/70 border border-border/80">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-subtle">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-heading font-bold text-base text-primary">
                    Branch Office
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 rounded-sm">
                    Branch
                  </span>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-2 font-medium">
                  {COMPANY_CONFIG.branchOffice.address}
                </p>
                <p className="text-xs text-secondary/80">
                  Client consultation, project onboarding, and meeting facility.
                </p>
              </div>
            </div>

            {/* Operating Schedule */}
            <div className="flex items-start gap-4 p-5 rounded-md bg-[#F7F7F5]/70 border border-border/80">
              <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-subtle">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-heading font-bold text-base text-primary">
                    Operating Hours
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-sm">
                    Standard
                  </span>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-2 font-medium">
                  {COMPANY_CONFIG.workingHours}
                </p>
                <p className="text-xs text-secondary/80">
                  Enquiries received outside office hours are addressed on the next business day.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Project Enquiry Guidance Note */}
        <div className="p-6 bg-[#F5F5F3] border border-border rounded-md text-xs sm:text-sm text-secondary flex items-start gap-3">
          <HelpCircle size={18} className="text-accent shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-primary block mb-1">How We Handle Project Enquiries:</span>
            <p className="leading-relaxed">
              When contacting us, please outline your business type, the category of website or application needed (Static Website, Dynamic Website, E-Commerce, or Web Application), and any target launch dates. We will review your requirements and provide a direct response.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
