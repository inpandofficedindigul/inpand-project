import React from 'react';
import { SoftwareProject } from '../../types/software';
import { Play, Clock, Monitor, Smartphone, MessageCircle, CheckCircle2 } from 'lucide-react';
import '../../styles/software-showcase.css';

interface SoftwareCardProps {
  project: SoftwareProject;
  onPlayVideo: (project: SoftwareProject) => void;
}

export const SoftwareCard: React.FC<SoftwareCardProps> = ({ project, onPlayVideo }) => {
  const isPortrait = project.aspectRatio === 'portrait';
  const whatsappUrl = `https://wa.me/919080394828?text=${encodeURIComponent(
    `Hello INPAND Technologies, I saw ${project.title} (${project.applicationType}) on your showcase and would like to enquire about developing a similar application.`
  )}`;

  return (
    <div className="bg-white rounded-lg border border-border p-5 sm:p-6 shadow-subtle hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Device Frame & Video Poster Preview */}
        <div className="mb-5 overflow-hidden flex items-center justify-center bg-[#F7F7F5] rounded-md p-4 sm:p-6 border border-border/80">
          {isPortrait ? (
            /* Portrait Mobile Mockup Frame */
            <div
              className="phone-mockup-frame cursor-pointer relative"
              onClick={() => onPlayVideo(project)}
            >
              {/* Notch */}
              <div className="phone-notch-bar">
                <div className="phone-speaker-slot" />
                <div className="phone-camera-dot" />
              </div>

              {/* Poster Image */}
              <div className="relative aspect-[9/19] w-full bg-[#101115]">
                <picture>
                  <source srcSet={project.poster} type="image/webp" />
                  <img
                    src={project.posterJpg || project.poster}
                    alt={`${project.title} app preview poster`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={280}
                    height={590}
                  />
                </picture>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 text-white font-mono text-[11px] backdrop-blur-xs shadow-md border border-white/10 z-10">
                  <Clock size={11} className="text-accent" />
                  <span>{project.duration}</span>
                </span>

                {/* Centered Play Button */}
                <div className="video-play-badge">
                  <Play size={22} className="translate-x-0.5" />
                </div>
              </div>
            </div>
          ) : (
            /* Landscape Desktop Mockup Frame */
            <div
              className="desktop-mockup-frame cursor-pointer relative w-full"
              onClick={() => onPlayVideo(project)}
            >
              {/* Window Header */}
              <div className="desktop-window-bar">
                <div className="window-dot window-dot-red" />
                <div className="window-dot window-dot-yellow" />
                <div className="window-dot window-dot-green" />
                <span className="text-[10px] text-slate-400 font-mono ml-2 truncate">
                  {project.title} — Desktop ERP
                </span>
              </div>

              {/* Poster Image */}
              <div className="relative aspect-[16/9] w-full bg-[#101115]">
                <picture>
                  <source srcSet={project.poster} type="image/webp" />
                  <img
                    src={project.posterJpg || project.poster}
                    alt={`${project.title} software preview poster`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                </picture>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 text-white font-mono text-[11px] backdrop-blur-xs shadow-md border border-white/10 z-10">
                  <Clock size={11} className="text-accent" />
                  <span>{project.duration}</span>
                </span>

                {/* Centered Play Button */}
                <div className="video-play-badge">
                  <Play size={22} className="translate-x-0.5" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category & Platform Badge Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs text-[11px] font-bold uppercase tracking-wider bg-[#F0F0EE] border border-border text-secondary">
            {isPortrait ? <Smartphone size={12} className="text-accent" /> : <Monitor size={12} className="text-accent" />}
            <span>{project.category}</span>
          </span>

          <span className="text-[11px] font-mono text-secondary">
            {project.platform}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-primary tracking-tight mb-2">
          {project.title}
        </h3>

        {/* Application Type */}
        <p className="text-xs font-semibold text-accent mb-3">
          {project.applicationType}
        </p>

        {/* Short Description */}
        <p className="text-secondary text-sm leading-relaxed mb-5">
          {project.shortDescription}
        </p>

        {/* Core Features List */}
        <div className="mb-6 space-y-1.5 pt-3 border-t border-border/80">
          {project.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-secondary">
              <CheckCircle2 size={13} className="text-accent flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={() => onPlayVideo(project)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white text-xs font-semibold rounded-sm shadow-subtle transition-all active:scale-98"
        >
          <Play size={14} className="fill-white" />
          <span>Play Preview ({project.duration})</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-slate-50 border border-border text-primary text-xs font-semibold rounded-sm shadow-subtle transition-colors"
          title="Discuss project on WhatsApp"
        >
          <MessageCircle size={14} className="text-emerald-600" />
          <span>Enquire</span>
        </a>
      </div>
    </div>
  );
};

