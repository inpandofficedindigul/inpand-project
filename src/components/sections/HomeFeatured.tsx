import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types/project';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectEmptyState } from '../projects/ProjectEmptyState';
import { VideoModal } from '../common/VideoModal';

interface HomeFeaturedProps {
  featuredProjects: Project[];
}

export const HomeFeatured: React.FC<HomeFeaturedProps> = ({ featuredProjects }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  const handleOpenVideo = (videoUrl: string, title: string) => {
    setModalState({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const hasProjects = featuredProjects.length > 0;

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Digital Showcase
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary tracking-tight">
              Featured Client Work
            </h2>
            <p className="text-secondary text-sm sm:text-base mt-3 leading-relaxed">
              Explore websites and digital solutions developed by INPAND Technologies. Designed for speed, conversion, and architectural reliability.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors pb-1 border-b border-primary/20 hover:border-accent"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Dynamic State: Real Project Grid or Curated Preparation Notice */}
        {hasProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenVideo={handleOpenVideo}
                priority={idx < 2}
              />
            ))}
          </div>
        ) : (
          <ProjectEmptyState />
        )}

      </div>

      <VideoModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        videoSrc={modalState.videoUrl}
        projectTitle={modalState.title}
      />
    </section>
  );
};
