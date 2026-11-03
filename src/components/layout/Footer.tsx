import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_CONFIG, generateGeneralWhatsAppLink, generateGeneralEmailLink } from '../../lib/config';
import { PROJECT_CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-border">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3 inline-block" aria-label="INPAND Technologies">
              <div className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center text-white font-heading font-extrabold text-lg">
                <span>I</span>
                <span className="text-accent font-black text-xl leading-none">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg text-primary tracking-tight leading-none">
                  INPAND
                </span>
                <span className="text-[9px] font-semibold text-secondary tracking-[0.2em] uppercase mt-0.5">
                  Technologies
                </span>
              </div>
            </Link>

            <p className="text-sm text-secondary leading-relaxed max-w-sm">
              Engineering high-impact digital experiences, bespoke web applications, and custom e-commerce flagships for forward-looking brands and enterprises.
            </p>

            <div className="flex items-center gap-4 text-xs text-secondary pt-2">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for New Digital Projects
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-secondary">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Categories */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">
              Categories
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-secondary">
              {PROJECT_CATEGORIES.filter((c) => c.id !== 'All Projects').map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/projects?category=${encodeURIComponent(cat.id)}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Official Contact & Verification */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">
              Direct Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-secondary">
              <a
                href={generateGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone size={15} className="shrink-0 text-accent" />
                <span>{COMPANY_CONFIG.whatsappDisplay}</span>
              </a>

              <a
                href={generateGeneralEmailLink()}
                className="inline-flex items-center gap-2 hover:text-accent transition-colors truncate"
              >
                <Mail size={15} className="shrink-0 text-accent" />
                <span className="truncate">{COMPANY_CONFIG.email}</span>
              </a>

              <div className="inline-flex items-start gap-2 pt-1 text-xs">
                <MapPin size={15} className="shrink-0 text-secondary mt-0.5" />
                <span>{COMPANY_CONFIG.address}</span>
              </div>
            </div>

            {/* Verified Social Channels */}
            <div className="pt-2 flex items-center gap-3 text-xs text-secondary">
              <a
                href={COMPANY_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary inline-flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight size={12} />
              </a>
              <span className="text-border">&bull;</span>
              <a
                href={COMPANY_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary inline-flex items-center gap-1"
              >
                GitHub <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <p>{COMPANY_CONFIG.copyrightText}</p>
          <div className="flex items-center gap-6">
            <span>Premium Digital Showcase</span>
            <span className="hidden sm:inline text-border">&bull;</span>
            <span>Production Grade Frontend Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
