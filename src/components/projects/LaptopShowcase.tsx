import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types/project';
import { LaptopDevice } from './LaptopDevice';
import { ProjectThumbnails } from './ProjectThumbnails';
import { Badge } from '../common/Badge';
import { generateProjectWhatsAppLink } from '../../lib/config';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Globe,
} from 'lucide-react';
import '../../styles/laptop-showcase.css';

interface LaptopShowcaseProps {
  projects: Project[];
  activeSlug?: string;
  onActiveProjectChange?: (project: Project) => void;
}

export const LaptopShowcase: React.FC<LaptopShowcaseProps> = ({
  projects,
  activeSlug,
  onActiveProjectChange,
}) => {
  // Find current index based on activeSlug or default to 0
  const initialIndex = useMemo(() => {
    if (!activeSlug || projects.length === 0) return 0;
    const foundIdx = projects.findIndex((p) => p.slug === activeSlug);
    return foundIdx !== -1 ? foundIdx : 0;
  }, [activeSlug, projects]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync index if activeSlug or projects array changes
  useEffect(() => {
    if (currentIndex >= projects.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, currentIndex, projects.length]);

  const activeProject = projects[currentIndex] || projects[0];

  // Safe navigation handlers
  const handleSelectProject = useCallback(
    (project: Project) => {
      const idx = projects.findIndex((p) => p.id === project.id);
      if (idx !== -1 && idx !== currentIndex) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(idx);
          setIsTransitioning(false);
          onActiveProjectChange?.(project);
        }, 150);
      }
    },
    [currentIndex, onActiveProjectChange, projects]
  );

  const handleNext = useCallback(() => {
    if (projects.length <= 1) return;
    const nextIdx = (currentIndex + 1) % projects.length;
    handleSelectProject(projects[nextIdx]);
  }, [currentIndex, handleSelectProject, projects]);

  const handlePrev = useCallback(() => {
    if (projects.length <= 1) return;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    handleSelectProject(projects[prevIdx]);
  }, [currentIndex, handleSelectProject, projects]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!activeProject) {
    return null;
  }

  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(projects.length).padStart(2, '0');
  const whatsappUrl = generateProjectWhatsAppLink(activeProject.title);

  return (
    <div className="w-full">
      {/* Split-Screen Laptop Showcase: 60% Left / 40% Right on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-border rounded-lg p-6 sm:p-8 lg:p-10 shadow-subtle">
        
        {/* LEFT COLUMN: 60% Laptop Mockup Presentation (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div
            className={`w-full transition-opacity duration-200 ${
              isTransitioning ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            <LaptopDevice project={activeProject} />
          </div>

          <p className="text-[11px] text-secondary text-center mt-3 flex items-center justify-center gap-1.5 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Display: Auto-scrolls page. Hover over screen to pause & explore.</span>
          </p>
        </div>

        {/* RIGHT COLUMN: 40% Project Details (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div
            className={`transition-all duration-200 ${
              isTransitioning ? 'opacity-30 translate-x-2' : 'opacity-100 translate-x-0'
            }`}
          >
            {/* Project Index Counter & Type Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase">
                  PROJECT {currentFormatted} / {totalFormatted}
                </span>
              </div>
              <Badge variant="accent" size="sm" className="font-semibold">
                {activeProject.websiteType}
              </Badge>
            </div>

            {/* Category Pill */}
            <div className="mb-2">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-secondary bg-[#F0F0EE] px-2.5 py-1 rounded-sm border border-border">
                {activeProject.category}
              </span>
            </div>

            {/* Project Title */}
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primary tracking-tight leading-tight mb-3">
              {activeProject.title}
            </h2>

            {/* Project Description */}
            <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6">
              {activeProject.shortDescription}
            </p>

            {/* Verified Domain Pill */}
            <div className="p-3 bg-[#F7F7F5] border border-border rounded-md mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <Globe size={15} className="text-accent flex-shrink-0" />
                <span className="text-xs font-mono text-primary font-medium truncate">
                  {activeProject.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold flex-shrink-0 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Client Site
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary CTA: Visit Live Website */}
              <a
                href={activeProject.domain}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-sm shadow-subtle hover:shadow transition-all group"
              >
                <span>Visit Live Website</span>
                <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Secondary CTA: WhatsApp Enquiry */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-primary border border-border text-sm font-semibold rounded-sm shadow-subtle hover:shadow transition-all group"
                title="Enquire on WhatsApp about a similar website"
              >
                <MessageCircle size={16} className="text-emerald-600" />
                <span>Enquire</span>
              </a>
            </div>

            {/* Case Study Details Link */}
            <div className="mt-4 pt-3 border-t border-border/60">
              <Link
                to={`/projects/${activeProject.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-accent transition-colors group"
              >
                <span>View Complete Project Specifications</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Navigation Controls: Previous / Next buttons & Progress Track */}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-border text-primary hover:border-primary rounded-sm text-xs font-semibold shadow-subtle transition-all active:scale-95"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                aria-label="Next project"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-border text-primary hover:border-primary rounded-sm text-xs font-semibold shadow-subtle transition-all active:scale-95"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-secondary">
              <kbd className="px-1.5 py-0.5 bg-[#EAEAE8] border border-border rounded text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-[#EAEAE8] border border-border rounded text-[10px]">→</kbd>
              <span className="ml-1">Navigate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Thumbnail Selector for All Projects */}
      <ProjectThumbnails
        projects={projects}
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
      />
    </div>
  );
};
