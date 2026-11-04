import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../../lib/config';
import { PROJECT_CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-border">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="inline-block" aria-label="INPAND Technologies">
              <img
                src="/images/inpand-logo-horizontal.png"
                alt="INPAND Technologies — The Business Point"
                className="h-9 sm:h-10 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>

            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              &ldquo;{COMPANY_CONFIG.tagline}&rdquo;
            </p>

            <p className="text-sm text-secondary leading-relaxed max-w-sm">
              Showcasing websites, e-commerce storefronts, and tailored web applications built by INPAND Technologies for businesses across industries.
            </p>

            <div className="pt-2 text-xs text-secondary">
              <a
                href={COMPANY_CONFIG.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium text-accent"
              >
                <span>Visit Main Corporate Website (inpand.com)</span>
                <ArrowUpRight size={13} />
              </a>
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
                  Websites Portfolio
                </Link>
              </li>
              <li>
                <Link to="/software" className="hover:text-primary transition-colors">
                  Apps & Desktop Software
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About INPAND
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Information
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
              {PROJECT_CATEGORIES.filter((c) => c.slug !== 'all').slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/projects?category=${cat.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/projects"
                  className="text-xs text-accent font-semibold hover:underline"
                >
                  View All 14 Projects &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Official Contact Info */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">
              Official Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-secondary">
              <a
                href={`mailto:${COMPANY_CONFIG.email}`}
                className="inline-flex items-center gap-2 hover:text-accent transition-colors truncate"
              >
                <Mail size={15} className="shrink-0 text-accent" />
                <span className="truncate">{COMPANY_CONFIG.email}</span>
              </a>

              <a
                href={COMPANY_CONFIG.phoneTel}
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone size={15} className="shrink-0 text-accent" />
                <span>{COMPANY_CONFIG.phoneDisplay}</span>
              </a>

              <div className="inline-flex items-start gap-2 pt-1 text-xs">
                <MapPin size={15} className="shrink-0 text-secondary mt-0.5" />
                <span>{COMPANY_CONFIG.address}</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs">
                <Clock size={15} className="shrink-0 text-secondary" />
                <span>{COMPANY_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Dynamic Year & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <p>&copy; {currentYear} INPAND Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Digital Project Showcase</span>
            <span className="text-border">&bull;</span>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Discuss Requirements
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
