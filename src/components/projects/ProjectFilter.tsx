import React from 'react';
import { PROJECT_CATEGORIES } from '../../data/categories';
import { cn } from '../../lib/utils';

interface ProjectFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  // Only show categories that have projects or are 'All Projects' (per spec: hide empty categories unless approved)
  const availableCategories = PROJECT_CATEGORIES.filter((cat) => {
    const count = categoryCounts[cat.id] ?? 0;
    return count > 0 || cat.id === 'All Projects';
  });

  return (
    <div className="flex items-center overflow-x-auto no-scrollbar py-2 gap-2 border-b border-border pb-4">
      {availableCategories.map((cat) => {
        const isSelected = activeCategory === cat.id;
        const count = categoryCounts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap border',
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
