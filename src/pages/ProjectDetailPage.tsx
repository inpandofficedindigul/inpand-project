import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Play, MessageCircle, Mail, Check, Globe, HelpCircle } from 'lucide-react';
import { getProjectBySlug, getRelatedProjects } from '../data/projects';
import { generateProjectWhatsAppLink, generateProjectEmailLink, isValidUrl } from '../lib/config';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { VideoModal } from '../components/common/VideoModal';
import { SEOHead } from '../components/common/SEOHead';
import { ProjectCard } from '../components/projects/ProjectCard';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Missing Project Route Handling (Section 8)
  if (!project) {
    return (
      <div className="py-20 md:py-28">
        <SEOHead title="Project Not Found — Digital Showcase" />
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-6 shadow-subtle text-accent">
            <HelpCircle size={26} />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Project Index Notice
          </span>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary tracking-tight mb-4">
            Project Not Found
          </h1>

          <p className="text-secondary text-sm sm:text-base leading-relaxed mb-8">
            The requested project ({slug ? `"${slug}"` : 'record'}) is not currently published in the INPAND Technologies digital showcase, or may be undergoing asset review and verification.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button to="/projects" variant="primary" size="md" icon={<ArrowLeft size={16} />} iconPosition="left">
              View Published Projects
            </Button>
            <Button to="/contact" variant="secondary" size="md">
              Discuss Custom Requirement
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedProjects = getRelatedProjects(project.slug, project.category, 2);
  const hasVideo = Boolean(project.previewVideo && project.previewVideo.trim().length > 0);
  const hasValidDomain = isValidUrl(project.domain);
  const whatsappUrl = generateProjectWhatsAppLink(project.title);
  const emailUrl = generateProjectEmailLink(project.title, project.category);
  const allScreenshots = [
    project.thumbnail,
    ...(project.screenshots || []),
  ].filter(Boolean);

  return (
    <article className="py-10 md:py-16">
      <SEOHead
        title={project.title}
        description={project.shortDescription}
        image={project.thumbnail}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-secondary hover:text-primary transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </Link>

          <Badge variant="accent" size="sm">
            {project.category}
          </Badge>
        </div>

        {/* Project Header Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-start">
          <div className="lg:col-span-8">
            {project.completionYear && (
              <span className="text-xs text-secondary font-mono block mb-2">
                Delivered &bull; {project.completionYear}
              </span>
            )}

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-secondary leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Project Enquiry Box */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-md border border-border shadow-subtle flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary pb-2 border-b border-border">
              Discuss a Similar Project
            </span>
            
            <p className="text-xs text-secondary leading-relaxed">
              Interested in developing a solution with comparable architecture and requirements? Contact our engineering team:
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              <Button
                href={whatsappUrl}
                target="_blank"
                variant="accent"
                size="md"
                className="w-full justify-center"
                icon={<MessageCircle size={16} />}
              >
                Discuss on WhatsApp
              </Button>

              <Button
                href={emailUrl}
                variant="secondary"
                size="md"
                className="w-full justify-center"
                icon={<Mail size={16} />}
              >
                Discuss via Email
              </Button>
            </div>

            {/* Visit Live Website (Rendered ONLY if verified domain exists) */}
            {hasValidDomain && (
              <div className="pt-3 border-t border-border">
                <a
                  href={project.domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-primary hover:text-accent bg-[#F7F7F5] hover:bg-[#EFEFEA] rounded-sm transition-colors border border-border"
                >
                  <Globe size={14} />
                  <span>Visit Client Website</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main Screenshot Showcase */}
        <div className="mb-14 rounded-lg overflow-hidden border border-border bg-white shadow-card relative group">
          <div className="relative aspect-[16/9] w-full bg-[#18181A] overflow-hidden">
            <img
              src={selectedGalleryImg || project.thumbnail}
              alt={`Main screenshot of ${project.title}`}
              fetchPriority="high"
              className="w-full h-full object-cover object-top transition-all duration-300"
            />

            {/* Video Preview Action (Shown ONLY when a real video asset exists) */}
            {hasVideo && (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 px-5 py-2.5 bg-black/85 hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-sm backdrop-blur-md transition-all duration-200 border border-white/20 shadow-xl group-hover:scale-105"
              >
                <Play size={16} className="fill-white" />
                <span>Watch Preview Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Additional Screenshots (Shown ONLY if available) */}
        {allScreenshots.length > 1 && (
          <div className="mb-14">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-secondary mb-4">
              Project Screen Gallery
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allScreenshots.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGalleryImg(img)}
                  className={`relative aspect-[16/10] rounded-sm overflow-hidden border transition-all ${
                    (selectedGalleryImg || project.thumbnail) === img
                      ? 'border-accent ring-2 ring-accent/30'
                      : 'border-border hover:border-border-strong opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Screenshot view ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Overview & Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 pt-8 border-t border-border">
          <div className="lg:col-span-8 flex flex-col gap-10">
            {project.overview && (
              <div>
                <h2 className="font-heading font-bold text-2xl text-primary mb-4">
                  Project Overview
                </h2>
                <p className="text-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.overview}
                </p>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-xl text-primary mb-4">
                  Key Capabilities Delivered
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white rounded-sm border border-border text-sm text-primary"
                    >
                      <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-md border border-border flex flex-col gap-5">
              <h3 className="font-heading font-bold text-base text-primary pb-3 border-b border-border">
                Project Details
              </h3>

              <div className="flex flex-col gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-secondary block text-xs mb-1">Category</span>
                  <span className="font-semibold text-primary">{project.category}</span>
                </div>

                {project.completionYear && (
                  <div>
                    <span className="text-secondary block text-xs mb-1">Delivery</span>
                    <span className="font-semibold text-primary">{project.completionYear}</span>
                  </div>
                )}

                <div>
                  <span className="text-secondary block text-xs mb-1">Deployment Status</span>
                  {hasValidDomain ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live in Production
                    </span>
                  ) : (
                    <span className="text-secondary font-medium">Delivered to Client</span>
                  )}
                </div>
              </div>

              {/* Technologies Used if verified */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <span className="text-secondary block text-xs mb-2.5 font-medium">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-primary bg-[#F4F4F2] px-2.5 py-1 rounded-sm border border-border/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-16 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
                  More in Category
                </span>
                <h3 className="font-heading font-bold text-2xl text-primary">
                  Related Projects
                </h3>
              </div>

              <Link
                to="/projects"
                className="text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                View Full Showcase &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Video Modal (Rendered ONLY if preview video exists) */}
      {hasVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoSrc={project.previewVideo!}
          projectTitle={project.title}
        />
      )}
    </article>
  );
};
