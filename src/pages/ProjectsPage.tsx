import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PROJECTS, getCategoryCounts } from '../data/projects';
import { findCategory } from '../data/categories';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { SEOHead } from '../components/common/SEOHead';
import { SoftwareFilterSlug, SoftwareProject } from '../types/software';
import { SOFTWARE_CATEGORIES, filterSoftwareProjects } from '../data/software';
import { SoftwareCard } from '../components/software/SoftwareCard';
import { SoftwareFilter } from '../components/software/SoftwareFilter';
import { VideoPlaybackModal } from '../components/software/VideoPlaybackModal';
import { ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategoryParam = searchParams.get('category');

  // Website Category Filtering
  const activeCategory = useMemo(() => {
    if (!rawCategoryParam || rawCategoryParam.toLowerCase() === 'all') {
      return null;
    }
    return findCategory(rawCategoryParam) || null;
  }, [rawCategoryParam]);

  const activeCategorySlug = activeCategory ? activeCategory.slug : 'all';
  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const handleSelectCategory = useCallback(
    (slug: string) => {
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

  const handleResetFilter = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('category');
    setSearchParams(nextParams);
  }, [searchParams, setSearchParams]);

  // Filter website projects
  const filteredProjects = useMemo(() => {
    if (!activeCategory || activeCategory.slug === 'all') {
      return PROJECTS;
    }
    return PROJECTS.filter((p) => p.categories.includes(activeCategory.name));
  }, [activeCategory]);

  const totalCount = filteredProjects.length;

  // Software Showcase State
  const [activeSoftwareSlug, setActiveSoftwareSlug] = useState<SoftwareFilterSlug>('all');
  const [selectedVideoProject, setSelectedVideoProject] = useState<SoftwareProject | null>(null);

  const filteredSoftware = useMemo(() => {
    return filterSoftwareProjects(activeSoftwareSlug);
  }, [activeSoftwareSlug]);

  const currentSoftwareCategoryInfo = useMemo(() => {
    return SOFTWARE_CATEGORIES.find((c) => c.slug === activeSoftwareSlug) || SOFTWARE_CATEGORIES[0];
  }, [activeSoftwareSlug]);

  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title={activeCategory ? `${activeCategory.name} — Our Portfolio` : 'Our Portfolio — Completed Client Websites & Software'}
        description={
          activeCategory
            ? `Explore ${activeCategory.name.toLowerCase()} delivered by INPAND Technologies. ${activeCategory.description}`
            : 'Explore a collection of digital platforms, business websites and technology solutions delivered by INPAND Technologies.'
        }
        path="/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb back to Home */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* ================================================================= */}
        {/* 1. WEBSITE PROJECTS SECTION (Restored 3-Column Original Design)  */}
        {/* ================================================================= */}
        <section aria-labelledby="websites-heading" className="mb-24">
          {/* Header Section */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-primary mb-4 shadow-subtle">
              <span className="font-bold text-accent">OUR PORTFOLIO</span>
              <span className="text-border">&bull;</span>
              <span className="text-secondary font-mono">
                {totalCount} {totalCount === 1 ? 'Project' : 'Projects'}
              </span>
            </div>

            <h1 id="websites-heading" className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.1]">
              Building Digital Experiences That Matter.
            </h1>

            <p className="text-base sm:text-lg text-secondary mt-4 leading-relaxed">
              {activeCategory
                ? activeCategory.description
                : 'Explore a collection of digital platforms, business websites and technology solutions delivered by INPAND Technologies.'}
            </p>
          </div>

          {/* Functional Category Filters */}
          <div className="mb-10">
            <ProjectFilter
              activeCategorySlug={activeCategorySlug}
              onSelectCategory={handleSelectCategory}
              categoryCounts={categoryCounts}
            />
          </div>

          {/* Restored 3-Column Project Card Grid */}
          <ProjectGrid
            projects={filteredProjects}
            categoryName={activeCategory?.name}
            isFiltered={Boolean(activeCategory)}
            onResetFilter={handleResetFilter}
          />
        </section>

        {/* ================================================================= */}
        {/* 2. APPLICATION & ELECTRON VIDEO SHOWCASE SECTION (Separate Below) */}
        {/* ================================================================= */}
        <section
          id="software-showcase"
          aria-labelledby="software-heading"
          className="pt-16 border-t-2 border-border"
        >
          {/* Software Showcase Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-accent mb-4 shadow-subtle">
              <Sparkles size={13} className="text-accent" />
              <span>APPLICATIONS &amp; ELECTRON SOFTWARE</span>
              <span className="text-border">&bull;</span>
              <span className="text-secondary font-mono">6 Walkthrough Previews</span>
            </div>

            <h2 id="software-heading" className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.15]">
              Mobile Apps &amp; Electron Desktop Software.
            </h2>

            <p className="text-base sm:text-lg text-secondary mt-3 leading-relaxed">
              {currentSoftwareCategoryInfo.description}
            </p>
          </div>

          {/* Category Filter Tabs for Software: All, Applications, Electron Desktop Apps */}
          <div className="mb-10">
            <SoftwareFilter
              activeSlug={activeSoftwareSlug}
              onSelectCategory={(slug) => setActiveSoftwareSlug(slug)}
            />
          </div>

          {/* Software Video Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredSoftware.map((project) => (
              <SoftwareCard
                key={project.id}
                project={project}
                onPlayVideo={(p) => setSelectedVideoProject(p)}
              />
            ))}
          </div>

          {/* Direct CTA Box */}
          <div className="p-8 bg-white border border-border rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-1">
                Custom Engineering
              </span>
              <h3 className="font-heading font-bold text-2xl text-primary">
                Need a Custom App or Desktop ERP Solution?
              </h3>
              <p className="text-sm text-secondary mt-1 max-w-xl">
                Connect directly with INPAND Technologies to discuss your mobile application features, offline Electron desktop portals, and development roadmap.
              </p>
            </div>

            <a
              href="https://wa.me/919080394828?text=Hello%20INPAND%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20custom%20software%20or%20application%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-sm shadow-subtle transition-all flex-shrink-0"
            >
              <MessageSquare size={16} />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </section>
      </div>

      {/* Video Playback Modal */}
      {selectedVideoProject && (
        <VideoPlaybackModal
          project={selectedVideoProject}
          onClose={() => setSelectedVideoProject(null)}
        />
      )}
    </div>
  );
};
