import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ExternalLink, Globe, ImageOff } from 'lucide-react';
import { Project } from '../../types/project';
import { Badge } from '../common/Badge';
import { generateProjectWhatsAppLink, isValidUrl } from '../../lib/config';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasValidDomain = isValidUrl(project.domain);
  const whatsappLink = generateProjectWhatsAppLink(project.title);

  return (
    <article className="group bg-surface-card rounded-md border border-border hover:border-border-strong hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Visual Screenshot Header */}
      <div className="relative aspect-[16/10] bg-[#ECECE9] overflow-hidden border-b border-border">
        {!imageError ? (
          <Link
            to={`/projects/${project.slug}`}
            className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img
              src={project.thumbnail}
              alt={`Website screenshot of ${project.title}`}
              loading={priority ? 'eager' : 'lazy'}
              width={640}
              height={400}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </Link>
        ) : (
          /* Clean placeholder fallback if screenshot is missing or fails to load */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F3F3F1]">
            <ImageOff size={32} className="text-secondary/60 mb-2" />
            <span className="font-heading font-semibold text-sm text-primary">{project.title}</span>
            <span className="text-[11px] text-secondary mt-1">Screenshot preview</span>
          </div>
        )}

        {/* Business Category Pill Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <Badge variant="default" size="sm" className="shadow-subtle font-semibold bg-white/95 backdrop-blur-sm text-primary">
            {project.category}
          </Badge>
        </div>

        {/* Website Type Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold tracking-wider uppercase bg-primary text-white shadow-subtle">
            {project.websiteType}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs text-secondary">
            <span className="font-medium text-accent">{project.category}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary/80 bg-[#F2F2F0] px-2 py-0.5 rounded-sm">
              {project.websiteType}
            </span>
          </div>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary tracking-tight leading-snug group-hover:text-accent transition-colors">
            <Link to={`/projects/${project.slug}`} className="focus-visible:outline-none focus-visible:underline">
              {project.title}
            </Link>
          </h3>

          <p className="text-sm text-secondary line-clamp-3 leading-relaxed mt-1">
            {project.shortDescription}
          </p>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
          {/* Live External Website Link */}
          {hasValidDomain ? (
            <a
              href={project.domain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link"
              aria-label={`Visit live website for ${project.title}`}
            >
              <Globe size={13} className="shrink-0" />
              <span>Visit Live Website</span>
              <ExternalLink size={13} className="shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-xs text-secondary italic">Client Production Delivery</span>
          )}

          <div className="flex items-center gap-1.5">
            <Link
              to={`/projects/${project.slug}`}
              className="text-xs font-semibold text-secondary hover:text-primary transition-colors px-2.5 py-1.5 rounded-sm hover:bg-black/5"
            >
              View Details &rarr;
            </Link>

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
