import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types/project';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectEmptyState } from '../projects/ProjectEmptyState';

interface HomeFeaturedProps {
  featuredProjects: Project[];
}

export const HomeFeatured: React.FC<HomeFeaturedProps> = ({ featuredProjects }) => {
  const hasProjects = featuredProjects.length > 0;

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Featured Work
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary tracking-tight">
              Client Websites &amp; Digital Solutions
            </h2>
            <p className="text-secondary text-sm sm:text-base mt-3 leading-relaxed">
              Explore completed websites and web platforms engineered by INPAND Technologies for clients across diverse industries.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors pb-1 border-b border-primary/20 hover:border-accent"
          >
            <span>View All 13 Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Dynamic State: Real Project Grid or Preparation Notice */}
        {hasProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={idx < 3}
              />
            ))}
          </div>
        ) : (
          <ProjectEmptyState />
        )}

      </div>
    </section>
  );
};
