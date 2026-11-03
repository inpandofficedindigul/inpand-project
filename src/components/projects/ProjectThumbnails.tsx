import React, { useRef, useEffect } from 'react';
import { Project } from '../../types/project';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/laptop-showcase.css';

interface ProjectThumbnailsProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
}

export const ProjectThumbnails: React.FC<ProjectThumbnailsProps> = ({
  projects,
  activeProject,
  onSelectProject,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Automatically scroll the active thumbnail into view
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeProject.id]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mt-8 pt-6 border-t border-border">
      {/* Header & Paging Arrows */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Project Navigation
          </span>
          <p className="text-xs text-secondary mt-0.5">
            Click any thumbnail or use arrows to switch projects
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll thumbnails left"
            className="p-1.5 rounded-sm border border-border bg-white text-secondary hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll thumbnails right"
            className="p-1.5 rounded-sm border border-border bg-white text-secondary hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Thumbnails Strip */}
      <div
        ref={scrollContainerRef}
        className="thumbnail-scrollbar flex items-center gap-3 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth"
      >
        {projects.map((project, idx) => {
          const isActive = project.id === activeProject.id;
          const indexFormatted = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={project.id}
              ref={isActive ? activeItemRef : null}
              onClick={() => onSelectProject(project)}
              aria-label={`Select ${project.title}`}
              aria-current={isActive ? 'true' : undefined}
              className={`flex-shrink-0 group text-left rounded-md transition-all duration-200 p-1.5 border ${
                isActive
                  ? 'bg-white border-accent ring-2 ring-accent/30 shadow-md translate-y-[-2px]'
                  : 'bg-white/60 border-border hover:bg-white hover:border-slate-300'
              }`}
              style={{ width: '170px' }}
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] w-full rounded overflow-hidden bg-slate-900 mb-2 border border-black/5">
                <img
                  src={project.thumbnail || `/images/projects/${project.slug}-thumb.webp`}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {isActive && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-accent text-[10px] font-bold text-white rounded-xs uppercase tracking-wider shadow">
                    Active
                  </span>
                )}
                <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white/90 rounded-xs">
                  {indexFormatted}
                </span>
              </div>

              {/* Title & Category */}
              <div className="px-0.5">
                <p
                  className={`text-xs font-semibold truncate ${
                    isActive ? 'text-accent' : 'text-primary group-hover:text-primary'
                  }`}
                  title={project.title}
                >
                  {project.title}
                </p>
                <p className="text-[11px] text-secondary truncate mt-0.5">
                  {project.category}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
