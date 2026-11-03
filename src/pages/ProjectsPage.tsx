import React, { useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PROJECTS, getCategoryCounts } from '../data/projects';
import { findCategory } from '../data/categories';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowLeft } from 'lucide-react';

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

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (!activeCategory) {
      return PROJECTS;
    }
    return PROJECTS.filter((p) => p.category === activeCategory.name);
  }, [activeCategory]);

  const totalCount = filteredProjects.length;

  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title={activeCategory ? `${activeCategory.name} — Project Collection` : 'All Projects — Digital Showcase'}
        description={
          activeCategory
            ? `Explore ${activeCategory.name.toLowerCase()} developed by INPAND Technologies. ${activeCategory.description}`
            : 'Explore websites, dynamic portals, e-commerce storefronts, and web applications developed by INPAND Technologies.'
        }
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

        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-primary mb-4 shadow-subtle">
            <span>Project Collection</span>
            <span className="text-border">&bull;</span>
            <span className="text-accent">
              {totalCount} {totalCount === 1 ? 'Project Published' : 'Projects Published'}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">
            {activeCategory ? activeCategory.name : 'All Projects'}
          </h1>

          <p className="text-base sm:text-lg text-secondary mt-4 leading-relaxed">
            {activeCategory
              ? activeCategory.description
              : 'Browse our digital showcase of websites, dynamic web platforms, and tailored web applications developed by INPAND Technologies.'}
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="mb-10">
          <ProjectFilter
            activeCategorySlug={activeCategorySlug}
            onSelectCategory={handleSelectCategory}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Dynamic Project Grid or Curated Empty State */}
        <ProjectGrid
          projects={filteredProjects}
          categoryName={activeCategory?.name}
          isFiltered={Boolean(activeCategory)}
          onResetFilter={handleResetFilter}
        />
      </div>
    </div>
  );
};
