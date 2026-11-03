import React from 'react';
import { PROJECT_CATEGORIES } from '../../data/categories';
import { cn } from '../../lib/utils';

interface ProjectFilterProps {
  activeCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  categoryCounts: Record<string, number>;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  activeCategorySlug,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="flex items-center overflow-x-auto no-scrollbar py-2 gap-2 border-b border-border pb-4">
      {PROJECT_CATEGORIES.map((cat) => {
        const isSelected =
          activeCategorySlug === cat.slug ||
          (cat.slug === 'all' && (!activeCategorySlug || activeCategorySlug === 'all'));
        const count = categoryCounts[cat.slug] ?? categoryCounts[cat.name] ?? 0;

        return (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isSelected
                ? 'bg-primary text-white border-primary shadow-subtle'
                : 'bg-white text-secondary border-border hover:border-border-strong hover:text-primary hover:bg-[#FDFDFD]'
            )}
            aria-pressed={isSelected}
          >
            <span>{cat.name}</span>
            <span
              className={cn(
                'text-[10px] tabular-nums font-semibold px-1.5 py-0.5 rounded-sm',
                isSelected ? 'bg-white/20 text-white' : 'bg-[#EAEAEA] text-secondary'
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
