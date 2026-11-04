import React, { useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PROJECTS, getCategoryCounts } from '../data/projects';
import { findCategory } from '../data/categories';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import { LaptopShowcase } from '../components/projects/LaptopShowcase';
import { ProjectEmptyState } from '../components/projects/ProjectEmptyState';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowLeft, ArrowRight, AppWindow } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategoryParam = searchParams.get('category');

  // Safely resolve the active category slug
  const activeCategory = useMemo(() => {
    if (!rawCategoryParam || rawCategoryParam.toLowerCase() === 'all') {
      return null;
    }
    return findCategory(rawCategoryParam) || null;
  }, [rawCategoryParam]);

  const activeCategorySlug = activeCategory ? activeCategory.slug : 'all';
  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  // Sync category selection with URL query parameter
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

  // Filter projects by category: checks if project.categories includes category name
  const filteredProjects = useMemo(() => {
    if (!activeCategory || activeCategory.slug === 'all') {
      return PROJECTS;
    }
    return PROJECTS.filter((p) => p.categories.includes(activeCategory.name));
  }, [activeCategory]);

  const totalCount = filteredProjects.length;

  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title={activeCategory ? `${activeCategory.name} — Our Portfolio` : 'Our Portfolio — Completed Client Websites'}
        description={
          activeCategory
            ? `Explore ${activeCategory.name.toLowerCase()} delivered by INPAND Technologies. ${activeCategory.description}`
            : 'Explore a collection of digital platforms, business websites and technology solutions delivered by INPAND Technologies.'
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb back to Home */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/software"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-border rounded-sm text-xs font-semibold text-accent shadow-subtle transition-all group"
          >
            <AppWindow size={14} />
            <span>Apps & Desktop Software</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Header Section (Section 4 Requirements) */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-primary mb-4 shadow-subtle">
            <span className="font-bold text-accent">OUR PORTFOLIO</span>
            <span className="text-border">&bull;</span>
            <span className="text-secondary font-mono">
              {totalCount} {totalCount === 1 ? 'Project' : 'Projects'}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.1]">
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

        {/* Interactive Laptop Showcase Experience */}
        {filteredProjects.length > 0 ? (
          <LaptopShowcase
            projects={filteredProjects}
            onActiveProjectChange={() => {}}
          />
        ) : (
          <ProjectEmptyState
            categoryName={activeCategory?.name}
            isFiltered={Boolean(activeCategory)}
            onResetFilter={handleResetFilter}
          />
        )}
      </div>
    </div>
  );
};
