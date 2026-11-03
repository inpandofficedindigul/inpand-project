import React, { useState } from 'react';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { VideoModal } from '../common/VideoModal';

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
  className?: string;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  emptyMessage = 'No digital projects found in this category.',
  className,
}) => {
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
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center rounded-md border border-dashed border-border bg-white p-8">
        <h4 className="font-heading font-semibold text-lg text-primary mb-2">Showcase Index</h4>
        <p className="text-sm text-secondary max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className={className || 'grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10'}>
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenVideo={handleOpenVideo}
            priority={idx < 2}
          />
        ))}
      </div>

      <VideoModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        videoSrc={modalState.videoUrl}
        projectTitle={modalState.title}
      />
    </>
  );
};
