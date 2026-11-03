import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types/project';
import { ProjectCard } from '../projects/ProjectCard';
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

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Curated Portfolio
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary tracking-tight">
              Featured Client Work
            </h2>
            <p className="text-secondary text-sm sm:text-base mt-3 leading-relaxed">
              A curated selection of digital solutions built for our clients, prioritizing visual clarity, performance engineering, and measurable conversion.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors pb-1 border-b border-primary/20 hover:border-accent"
          >
            <span>View All Projects ({featuredProjects.length}+)</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Featured Projects Grid */}
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
