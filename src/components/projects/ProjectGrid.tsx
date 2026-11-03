import React from 'react';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectEmptyState } from './ProjectEmptyState';

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
    <div className={className || 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'}>
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          priority={idx < 3}
        />
      ))}
    </div>
  );
};
