import React from 'react';
import { SoftwareFilterSlug } from '../../types/software';
import { SOFTWARE_CATEGORIES, getSoftwareCategoryCounts } from '../../data/software';
import { AppWindow, Smartphone, Monitor } from 'lucide-react';

interface SoftwareFilterProps {
  activeSlug: SoftwareFilterSlug;
  onSelectCategory: (slug: SoftwareFilterSlug) => void;
}

export const SoftwareFilter: React.FC<SoftwareFilterProps> = ({
  activeSlug,
  onSelectCategory,
}) => {
  const counts = getSoftwareCategoryCounts();

  const getIcon = (slug: SoftwareFilterSlug) => {
    switch (slug) {
      case 'applications':
        return <Smartphone size={14} />;
      case 'electron-desktop-apps':
        return <Monitor size={14} />;
      default:
        return <AppWindow size={14} />;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {SOFTWARE_CATEGORIES.map((cat) => {
        const isActive = activeSlug === cat.slug;
        const count = counts[cat.slug] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-sm transition-all border ${
              isActive
                ? 'bg-primary text-white border-primary shadow-subtle'
                : 'bg-white text-secondary border-border hover:border-slate-300 hover:text-primary'
            }`}
            aria-pressed={isActive}
          >
            <span className={isActive ? 'text-accent' : 'text-secondary'}>
              {getIcon(cat.slug)}
            </span>
            <span>{cat.name}</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#EFEFEF] text-secondary'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
