import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Layers, ShoppingBag, Cpu } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../../data/categories';
import { getCategoryCounts } from '../../data/projects';
import { ProjectCategory } from '../../types/project';

export const HomeCategories: React.FC = () => {
  const counts = getCategoryCounts();
  const categories = PROJECT_CATEGORIES.filter((c) => c.id !== 'All Projects');

  const getCategoryIcon = (category: ProjectCategory | 'All Projects') => {
    switch (category) {
      case 'Static Websites':
        return <Globe className="text-primary" size={24} />;
      case 'Dynamic Websites':
        return <Layers className="text-primary" size={24} />;
      case 'E-Commerce':
        return <ShoppingBag className="text-primary" size={24} />;
      case 'Web Applications':
        return <Cpu className="text-primary" size={24} />;
      default:
        return <Globe className="text-primary" size={24} />;
    }
  };

  return (
    <section className="py-20 border-t border-border bg-[#F5F5F3]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Core Capabilities
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              Specialized Project Categories
            </h2>
            <p className="text-secondary text-sm sm:text-base mt-2">
              Browse our architectural executions across performance-tuned websites, content-driven experiences, e-commerce, and enterprise applications.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            <span>Explore All Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Categories 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const count = counts[cat.id] ?? 0;

            return (
              <Link
                key={cat.id}
                to={`/projects?category=${encodeURIComponent(cat.id)}`}
                className="group bg-white rounded-md p-6 sm:p-7 border border-border hover:border-border-strong hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-sm bg-[#F7F7F5] border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                      {getCategoryIcon(cat.id)}
                    </div>
                    
                    <span className="text-xs font-mono font-semibold text-secondary">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-1 block">
                    {cat.accentLabel}
                  </span>

                  <h3 className="font-heading font-bold text-xl text-primary tracking-tight group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-secondary mt-2.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary tabular-nums">
                    {count} {count === 1 ? 'Project' : 'Projects'}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 font-semibold text-secondary group-hover:text-primary transition-colors">
                    <span>View Category</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
