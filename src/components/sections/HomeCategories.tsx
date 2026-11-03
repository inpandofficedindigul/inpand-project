import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Layers, ShoppingBag, Cpu, Film, GraduationCap, Building2, Briefcase } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../../data/categories';
import { getCategoryCounts } from '../../data/projects';

export const HomeCategories: React.FC = () => {
  const counts = getCategoryCounts();
  const displayCategories = PROJECT_CATEGORIES.filter((c) => c.slug !== 'all');

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'dynamic-websites':
        return <Layers className="text-primary" size={20} />;
      case 'static-websites':
        return <Globe className="text-primary" size={20} />;
      case 'hybrid-websites':
        return <Cpu className="text-primary" size={20} />;
      case 'e-commerce':
        return <ShoppingBag className="text-primary" size={20} />;
      case 'saas-technology':
        return <Cpu className="text-primary" size={20} />;
      case 'media-entertainment':
        return <Film className="text-primary" size={20} />;
      case 'education':
        return <GraduationCap className="text-primary" size={20} />;
      case 'real-estate':
        return <Building2 className="text-primary" size={20} />;
      case 'business-services':
        return <Briefcase className="text-primary" size={20} />;
      default:
        return <Globe className="text-primary" size={20} />;
    }
  };

  return (
    <section className="py-20 border-t border-border bg-[#F5F5F3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Classification
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              Explore by Category &amp; Type
            </h2>
            <p className="text-secondary text-sm sm:text-base mt-2">
              Browse our portfolio across website architectures and specific industry sectors delivered for clients.
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayCategories.map((cat, index) => {
            const count = counts[cat.slug] ?? 0;

            return (
              <Link
                key={cat.slug}
                to={`/projects?category=${cat.slug}`}
                className="group bg-white rounded-md p-6 border border-border hover:border-border-strong hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-[#F7F7F5] border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                      {getCategoryIcon(cat.slug)}
                    </div>
                    
                    <span className="text-xs font-mono font-semibold text-secondary">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-primary tracking-tight group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary tabular-nums">
                    {count} {count === 1 ? 'Project' : 'Projects'}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 font-semibold text-secondary group-hover:text-primary transition-colors">
                    <span>Explore</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
