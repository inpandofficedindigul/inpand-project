import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Project } from '../../types/project';
import { Badge } from '../common/Badge';
import { generateProjectWhatsAppLink } from '../../lib/config';

interface ProjectCardProps {
  project: Project;
  onOpenVideo?: (videoUrl: string, title: string) => void;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenVideo,
  priority = false,
}) => {
  const hasVideo = Boolean(project.previewVideo && project.previewVideo.trim().length > 0);
  const hasDomain = Boolean(project.domain && project.domain.trim().length > 0);
  const whatsappLink = generateProjectWhatsAppLink(project.title, project.category);

  return (
    <article className="group bg-surface-card rounded-md border border-border hover:border-border-strong hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Visual Screenshot Header */}
      <div className="relative aspect-[16/10] bg-[#ECECE9] overflow-hidden border-b border-border">
        <Link to={`/projects/${project.slug}`} className="block w-full h-full">
          <img
            src={project.thumbnail}
            alt={`Production showcase: ${project.title}`}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </Link>

        {/* Video Preview Overlay Button (if available) */}
        {hasVideo && onOpenVideo && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenVideo(project.previewVideo!, project.title);
            }}
            aria-label={`Watch video preview of ${project.title}`}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-black text-white text-xs font-medium rounded-sm backdrop-blur-sm transition-all duration-200 border border-white/10 shadow-lg group/btn hover:scale-105 active:scale-95"
          >
            <Play size={13} className="fill-white text-white translate-x-0.5" />
            <span>Watch Preview</span>
          </button>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <Badge variant="default" size="sm" className="shadow-subtle font-semibold">
            {project.category}
          </Badge>
        </div>

        {/* Featured Tag if applicable */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-accent text-white shadow-subtle">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs text-secondary">
            <span>{project.clientIndustry || 'Client Platform'}</span>
            {project.completionYear && <span>{project.completionYear}</span>}
          </div>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary tracking-tight leading-snug group-hover:text-accent transition-colors">
            <Link to={`/projects/${project.slug}`} className="focus-visible:outline-none focus-visible:underline">
              {project.title}
            </Link>
          </h3>

          <p className="text-sm text-secondary line-clamp-3 leading-relaxed mt-1">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium text-secondary bg-[#F2F2F0] px-2 py-0.5 rounded-sm"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-medium text-secondary px-1 py-0.5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Live Client Domain (if provided) */}
            {hasDomain ? (
              <a
                href={project.domain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent py-1 transition-colors"
                aria-label={`Visit live website for ${project.title}`}
              >
                <span>Visit Website</span>
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="text-xs text-neutral-400 italic">Internal Deployment</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Project Details Link */}
            <Link
              to={`/projects/${project.slug}`}
              className="text-xs font-semibold text-secondary hover:text-primary transition-colors px-2.5 py-1.5 rounded-sm hover:bg-black/5"
            >
              Details &rarr;
            </Link>

            {/* Direct WhatsApp Project Enquiry */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${project.title} on WhatsApp`}
              title="Enquire on WhatsApp"
              className="p-1.5 text-secondary hover:text-emerald-600 hover:bg-emerald-50 rounded-sm transition-colors"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
