import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MessageCircle, Mail, Globe, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { getProjectBySlug, getRelatedProjects } from '../data/projects';
import { generateProjectWhatsAppLink, generateProjectEmailLink, isValidUrl } from '../lib/config';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { ProjectCard } from '../components/projects/ProjectCard';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [showFullHeight, setShowFullHeight] = useState(false);

  // Missing Project Route Handling
  if (!project) {
    return (
      <div className="py-20 md:py-28">
        <SEOHead title="Project Not Found — INPAND Portfolio" noindex={true} />
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-6 shadow-subtle text-accent">
            <HelpCircle size={26} />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Portfolio Notice
          </span>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary tracking-tight mb-4">
            Project Not Found
          </h1>

          <p className="text-secondary text-sm sm:text-base leading-relaxed mb-8">
            The requested project ({slug ? `"${slug}"` : 'record'}) is not listed in our portfolio directory.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button to="/projects" variant="primary" size="md" icon={<ArrowLeft size={16} />} iconPosition="left">
              Back to Portfolio
            </Button>
            <Button to="/contact" variant="secondary" size="md">
              Contact INPAND
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedProjects = getRelatedProjects(project.slug, project.category, 2);
  const hasValidDomain = isValidUrl(project.domain);
  const whatsappUrl = generateProjectWhatsAppLink(project.title);
  const emailUrl = generateProjectEmailLink(project.title, project.category);
  const displayImage = project.fullScreenshot || project.thumbnail;

  return (
    <article className="py-10 md:py-16">
      <SEOHead
        title={`${project.title} - ${project.category} Portfolio | INPAND Technologies`}
        exactTitle={true}
        description={`${project.shortDescription} Delivered by INPAND Technologies.`}
        image={project.thumbnail}
        path={`/projects/${project.slug}`}
        type="article"
        keywords={[
          project.title,
          project.category,
          project.websiteType,
          'INPAND Technologies',
          'Client Portfolio',
          'Web Development',
        ]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Projects', url: '/projects' },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
        structuredData={{
          '@type': 'CreativeWork',
          '@id': `https://portfolio.inpand.com/projects/${project.slug}#creativework`,
          name: project.title,
          description: project.overview || project.shortDescription,
          url: `https://portfolio.inpand.com/projects/${project.slug}`,
          image: `https://portfolio.inpand.com${project.thumbnail}`,
          genre: project.category,
          creator: {
            '@type': 'Organization',
            '@id': 'https://portfolio.inpand.com/#organization',
            name: 'INPAND Technologies',
            url: 'https://portfolio.inpand.com/',
          },
          keywords: [project.category, project.websiteType, ...(project.technologies || [])].join(', '),
        }}
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

          <div className="flex items-center gap-2">
            <Badge variant="accent" size="sm">
              {project.category}
            </Badge>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary bg-[#F2F2F0] px-2 py-0.5 rounded-sm">
              {project.websiteType}
            </span>
          </div>
        </div>

        {/* Project Header Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs text-secondary mb-3">
              <span className="font-semibold text-accent uppercase tracking-wider">{project.category}</span>
              <span>&bull;</span>
              <span>{project.websiteType}</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-secondary leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Quick Enquiries / Live Website Action Box */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-md border border-border shadow-subtle flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary pb-2 border-b border-border">
              Website Information
            </span>

            {/* Visit Live Website CTA (Section 4 & 5) */}
            {hasValidDomain && (
              <div>
                <a
                  href={project.domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-sm transition-colors shadow-subtle group"
                >
                  <Globe size={16} />
                  <span>Visit Live Website</span>
                  <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="mt-2.5 text-center">
                  <a
                    href={project.domain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-secondary hover:text-accent font-mono truncate block"
                  >
                    {project.domain}
                  </a>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-border flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-secondary">
                Discuss a similar digital project:
              </span>

              <Button
                href={whatsappUrl}
                target="_blank"
                variant="secondary"
                size="md"
                className="w-full justify-center"
                icon={<MessageCircle size={16} />}
              >
                Enquire via WhatsApp
              </Button>

              <Button
                href={emailUrl}
                variant="outline"
                size="md"
                className="w-full justify-center"
                icon={<Mail size={16} />}
              >
                Enquire via Email
              </Button>
            </div>
          </div>
        </div>

        {/* Large Actual Screenshot Showcase (Section 4) */}
        <div className="mb-14 rounded-lg overflow-hidden border border-border bg-white shadow-card">
          {/* Top Bar with Browser Style Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#F4F4F2] border-b border-border text-xs text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="ml-3 font-mono text-[11px] text-primary truncate max-w-xs sm:max-w-md">
                {project.domain}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFullHeight(!showFullHeight)}
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
              >
                <ImageIcon size={13} />
                <span>{showFullHeight ? 'Compact View' : 'Full Page View'}</span>
              </button>

              {hasValidDomain && (
                <a
                  href={project.domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:text-accent inline-flex items-center gap-1"
                >
                  <span>Open Site</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Screenshot Container */}
          <div
            className={`w-full bg-[#FAFAFA] transition-all duration-300 ${
              showFullHeight
                ? 'h-auto'
                : 'max-h-[640px] md:max-h-[720px] overflow-y-auto'
            }`}
          >
            <img
              src={displayImage}
              alt={`Full website screenshot of ${project.title}`}
              fetchPriority="high"
              width={1440}
              height={900}
              className="w-full h-auto object-top"
            />
          </div>

          <div className="p-3 bg-[#F4F4F2] border-t border-border flex items-center justify-between text-xs text-secondary">
            <span>Actual Client Website Screenshot</span>
            <button
              onClick={() => setShowFullHeight(!showFullHeight)}
              className="text-accent font-semibold hover:underline"
            >
              {showFullHeight ? 'Scroll to Top' : 'Expand Full Height Screenshot'}
            </button>
          </div>
        </div>

        {/* Project Classification & Metadata Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 pt-8 border-t border-border">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="font-heading font-bold text-2xl text-primary">
              About This Project
            </h2>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              {project.shortDescription}
            </p>

            <div className="p-6 bg-white rounded-md border border-border flex flex-col gap-3">
              <h3 className="font-heading font-bold text-base text-primary">
                Website Classification
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                This project was engineered and deployed as a <strong>{project.websiteType}</strong> website within the <strong>{project.category}</strong> domain, customized to deliver an effective digital user journey.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-md border border-border flex flex-col gap-4">
            <h3 className="font-heading font-bold text-base text-primary pb-3 border-b border-border">
              Project Summary
            </h3>

            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-secondary block text-xs mb-0.5">Project Name</span>
                <span className="font-semibold text-primary">{project.title}</span>
              </div>

              <div>
                <span className="text-secondary block text-xs mb-0.5">Business Category</span>
                <span className="font-semibold text-primary">{project.category}</span>
              </div>

              <div>
                <span className="text-secondary block text-xs mb-0.5">Website Classification</span>
                <span className="font-semibold text-primary">{project.websiteType}</span>
              </div>

              <div>
                <span className="text-secondary block text-xs mb-0.5">Live Production URL</span>
                {hasValidDomain ? (
                  <a
                    href={project.domain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-accent hover:underline break-all text-xs inline-flex items-center gap-1"
                  >
                    <span>{project.domain}</span>
                    <ExternalLink size={12} className="shrink-0" />
                  </a>
                ) : (
                  <span className="text-secondary">Delivered</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-16 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
                  More From Our Portfolio
                </span>
                <h3 className="font-heading font-bold text-2xl text-primary">
                  Related Projects
                </h3>
              </div>

              <Link
                to="/projects"
                className="text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                View All 13 Projects &rarr;
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
    </article>
  );
};
