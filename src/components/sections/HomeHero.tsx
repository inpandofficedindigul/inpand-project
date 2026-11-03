import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, Eye } from 'lucide-react';
import { Button } from '../common/Button';
import { generateGeneralWhatsAppLink } from '../../lib/config';
import { Project } from '../../types/project';

interface HomeHeroProps {
  heroProject?: Project;
  onOpenVideo?: (videoUrl: string, title: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ heroProject, onOpenVideo }) => {
  return (
    <section className="relative pt-6 pb-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm shadow-subtle mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Digital Engineering &bull; Production Showcase
          </span>
        </div>

        {/* Large Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-primary tracking-tight leading-[1.08]">
              Digital Experiences. <br />
              <span className="text-secondary font-medium italic">Built to Make</span> an Impact.
            </h1>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Explore websites and digital solutions crafted by INPAND Technologies. From business websites to advanced e-commerce platforms, discover what we&apos;ve built.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                to="/projects"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight size={16} />}
              >
                Explore Projects
              </Button>

              <Button
                href={generateGeneralWhatsAppLink()}
                target="_blank"
                variant="secondary"
                size="lg"
              >
                Let&apos;s Talk
              </Button>
            </div>
          </div>
        </div>

        {/* Distinctive Visual Hero: Featured Client Showcase Teaser */}
        {heroProject && (
          <div className="relative mt-8 rounded-lg overflow-hidden border border-border bg-white shadow-card group">
            {/* Top Bar with Editorial Metadata */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#F5F5F3] border-b border-border text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold uppercase tracking-wider text-accent">
                  Latest Flagship Deployment
                </span>
                <span className="text-border">&bull;</span>
                <span className="font-medium text-primary">{heroProject.title}</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-4 text-secondary">
                <span>{heroProject.category}</span>
                <span>&bull;</span>
                <span>{heroProject.completionYear}</span>
              </div>
            </div>

            {/* Large Visual Screen Teaser */}
            <div className="relative aspect-[21/9] min-h-[320px] bg-neutral-900 overflow-hidden">
              <img
                src={heroProject.thumbnail}
                alt={heroProject.title}
                fetchPriority="high"
                className="w-full h-full object-cover object-top opacity-95 group-hover:scale-[1.01] transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
                      {heroProject.category} &bull; Case Study
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                      {heroProject.title}
                    </h2>
                    <p className="text-sm text-neutral-300 mt-2 line-clamp-2 max-w-xl">
                      {heroProject.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {heroProject.previewVideo && onOpenVideo && (
                      <button
                        onClick={() => onOpenVideo(heroProject.previewVideo!, heroProject.title)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-primary text-xs sm:text-sm font-semibold rounded-sm hover:bg-neutral-100 transition-colors shadow-lg"
                      >
                        <Play size={14} className="fill-primary" />
                        <span>Watch Preview</span>
                      </button>
                    )}

                    <Link
                      to={`/projects/${heroProject.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-black/60 hover:bg-black text-white text-xs sm:text-sm font-medium rounded-sm border border-white/20 backdrop-blur-sm transition-colors"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
