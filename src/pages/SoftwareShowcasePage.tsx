import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SoftwareProject, SoftwareFilterSlug } from '../types/software';
import { SOFTWARE_CATEGORIES, filterSoftwareProjects } from '../data/software';
import { SoftwareCard } from '../components/software/SoftwareCard';
import { SoftwareFilter } from '../components/software/SoftwareFilter';
import { VideoPlaybackModal } from '../components/software/VideoPlaybackModal';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowLeft, MessageSquare, Laptop, ArrowRight } from 'lucide-react';

export const SoftwareShowcasePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategoryParam = searchParams.get('category') as SoftwareFilterSlug | null;

  const activeSlug: SoftwareFilterSlug = useMemo(() => {
    if (rawCategoryParam === 'applications' || rawCategoryParam === 'electron-desktop-apps') {
      return rawCategoryParam;
    }
    return 'all';
  }, [rawCategoryParam]);

  const [activeVideoProject, setActiveVideoProject] = useState<SoftwareProject | null>(null);

  const handleSelectCategory = useCallback(
    (slug: SoftwareFilterSlug) => {
      const nextParams = new URLSearchParams(searchParams);
      if (slug === 'all') {
        nextParams.delete('category');
      } else {
        nextParams.set('category', slug);
      }
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  const filteredProjects = useMemo(() => {
    return filterSoftwareProjects(activeSlug);
  }, [activeSlug]);

  const currentCategoryInfo = useMemo(() => {
    return SOFTWARE_CATEGORIES.find((c) => c.slug === activeSlug) || SOFTWARE_CATEGORIES[0];
  }, [activeSlug]);

  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title="App & Electron Video Showcase — INPAND Technologies"
        description="Explore video previews of mobile applications and Electron desktop software developed by INPAND Technologies."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors group"
          >
            <Laptop size={14} />
            <span>Switch to Website Showcase</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-primary mb-4 shadow-subtle">
            <span className="font-bold text-accent">APPLICATIONS & ELECTRON SOFTWARE</span>
            <span className="text-border">&bull;</span>
            <span className="text-secondary font-mono">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'System' : 'Systems'}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.1]">
            Engineering Mobile Apps & Desktop Systems.
          </h1>

          <p className="text-base sm:text-lg text-secondary mt-4 leading-relaxed">
            {currentCategoryInfo.description}
          </p>
        </div>

        {/* Functional Category Filter Tabs */}
        <div className="mb-10">
          <SoftwareFilter
            activeSlug={activeSlug}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Software Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <SoftwareCard
              key={project.id}
              project={project}
              onPlayVideo={(p) => setActiveVideoProject(p)}
            />
          ))}
        </div>

        {/* Direct Contact Banner */}
        <div className="mt-16 p-8 bg-white border border-border rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-1">
              Custom Software Development
            </span>
            <h3 className="font-heading font-bold text-2xl text-primary">
              Have an App or Desktop ERP Requirement?
            </h3>
            <p className="text-sm text-secondary mt-1 max-w-xl">
              Discuss your mobile application architecture, Electron desktop portal, or custom software timeline directly with the INPAND Technologies engineering team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/919080394828?text=Hello%20INPAND%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20mobile%20app%20or%20desktop%20software%20project%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-sm shadow-subtle transition-all"
            >
              <MessageSquare size={16} />
              <span>Discuss on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#F7F7F5] hover:bg-slate-100 border border-border text-primary text-sm font-semibold rounded-sm transition-colors"
            >
              <span>Contact Coordinates</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Playback Modal */}
      {activeVideoProject && (
        <VideoPlaybackModal
          project={activeVideoProject}
          onClose={() => setActiveVideoProject(null)}
        />
      )}
    </div>
  );
};

