import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SOFTWARE_PROJECTS } from '../../data/software';
import { SoftwareProject } from '../../types/software';
import { SoftwareCard } from '../software/SoftwareCard';
import { VideoPlaybackModal } from '../software/VideoPlaybackModal';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomeSoftwareFeatured: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<SoftwareProject | null>(null);

  // Feature 3 diverse software projects (Desktop ERP + Mobile OTT + Mobile Scheme App)
  const featured = [
    SOFTWARE_PROJECTS[2], // Sri Krishna Jewellers ERP (Electron)
    SOFTWARE_PROJECTS[3], // Mei Alai OTT (Mobile App)
    SOFTWARE_PROJECTS[4], // MRC Builders ERP (Electron)
  ];

  return (
    <section className="py-16 md:py-24 border-t border-border bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-accent mb-4 shadow-subtle">
              <Sparkles size={13} className="text-accent" />
              <span>SOFTWARE SUITE</span>
              <span className="text-border">&bull;</span>
              <span className="text-secondary font-mono">Mobile &amp; Electron</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
              Production Apps &amp; Desktop Software.
            </h2>

            <p className="text-secondary text-base sm:text-lg mt-3 leading-relaxed">
              Explore walkthrough videos of production mobile apps and specialized Electron desktop systems engineered for enterprise workflows.
            </p>
          </div>

          <Link
            to="/software"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-border text-primary hover:text-accent rounded-sm text-xs font-semibold shadow-subtle transition-all self-start md:self-auto group"
          >
            <span>Explore All 6 Software Projects</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <SoftwareCard
              key={project.id}
              project={project}
              onPlayVideo={(p) => setSelectedVideo(p)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoPlaybackModal
          project={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};

