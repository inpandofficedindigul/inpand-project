import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROJECTS, getCategoryCounts } from '../data/projects';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { SEOHead } from '../components/common/SEOHead';
import { PROJECT_CATEGORIES } from '../data/categories';

export const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get('category');
  
  // Validate or default category
  const activeCategory = useMemo(() => {
    if (!rawCategory) return 'All Projects';
    const found = PROJECT_CATEGORIES.some((c) => c.id === rawCategory);
    return found ? rawCategory : 'All Projects';
  }, [rawCategory]);

  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const handleSelectCategory = (category: string) => {
    if (category === 'All Projects') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category }, { replace: true });
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Projects') {
      return PROJECTS;
    }
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const currentCategoryInfo = useMemo(() => {
    return PROJECT_CATEGORIES.find((c) => c.id === activeCategory) || PROJECT_CATEGORIES[0];
  }, [activeCategory]);

  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title={`${activeCategory} — Portfolio Showcase`}
        description={`Explore our curated index of ${activeCategory.toLowerCase()} developed for clients worldwide by INPAND Technologies.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            <span>Project Index</span>
            <span className="text-border">&bull;</span>
            <span className="text-accent">{filteredProjects.length} Projects Total</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">
            All Projects &amp; Digital Works
          </h1>

          <p className="text-base sm:text-lg text-secondary mt-4 leading-relaxed">
            {currentCategoryInfo.description}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="mb-10">
          <ProjectFilter
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Projects Grid */}
        <ProjectGrid
          projects={filteredProjects}
          emptyMessage={`No approved projects currently listed under ${activeCategory}. New client case studies are added upon deployment verification.`}
        />
      </div>
    </div>
  );
};
