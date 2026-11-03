import React, { useState } from 'react';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectEmptyState } from './ProjectEmptyState';
import { VideoModal } from '../common/VideoModal';

interface ProjectGridProps {
  projects: Project[];
  categoryName?: string;
  isFiltered?: boolean;
  onResetFilter?: () => void;
  className?: string;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  categoryName,
  isFiltered = false,
  onResetFilter,
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
      <ProjectEmptyState
        categoryName={categoryName}
        isFiltered={isFiltered}
        onResetFilter={onResetFilter}
      />
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
