import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Layers, ShoppingBag, Cpu } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../../data/categories';
import { getCategoryCounts } from '../../data/projects';

export const HomeCategories: React.FC = () => {
  const counts = getCategoryCounts();

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'static-websites':
        return <Globe className="text-primary" size={22} />;
      case 'dynamic-websites':
        return <Layers className="text-primary" size={22} />;
      case 'e-commerce':
        return <ShoppingBag className="text-primary" size={22} />;
      case 'web-applications':
        return <Cpu className="text-primary" size={22} />;
      default:
        return <Globe className="text-primary" size={22} />;
    }
  };

  return (
    <section className="py-20 border-t border-border bg-[#F5F5F3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Core Capabilities
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              Project Categories
            </h2>
            <p className="text-secondary text-sm sm:text-base mt-2">
              Explore how INPAND Technologies categorizes and delivers digital solutions across varying technical requirements and architectural needs.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            <span>View All Categories</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Categories 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECT_CATEGORIES.map((cat, index) => {
            const count = counts[cat.slug] ?? 0;

            return (
              <Link
                key={cat.slug}
                to={`/projects?category=${cat.slug}`}
                className="group bg-white rounded-md p-6 sm:p-7 border border-border hover:border-border-strong hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-sm bg-[#F7F7F5] border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                      {getCategoryIcon(cat.slug)}
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
                  <span className="font-medium text-secondary">
                    {count > 0 ? (
                      <span className="font-semibold text-primary tabular-nums">
                        {count} {count === 1 ? 'Project' : 'Projects'}
                      </span>
                    ) : (
                      <span>Curating Works</span>
                    )}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 font-semibold text-secondary group-hover:text-primary transition-colors">
                    <span>Explore</span>
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
