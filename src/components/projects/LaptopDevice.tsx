import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Project } from '../../types/project';
import { Pause, Play, RotateCcw, ExternalLink, ImageOff } from 'lucide-react';
import '../../styles/laptop-showcase.css';

interface LaptopDeviceProps {
  project: Project;
  onExternalClick?: () => void;
}

export const LaptopDevice: React.FC<LaptopDeviceProps> = ({ project, onExternalClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const scrollPosRef = useRef(0);
  const maxScrollRef = useRef(0);
  const phaseRef = useRef<'DOWN' | 'PAUSE_BOTTOM' | 'RESET' | 'PAUSE_TOP'>('PAUSE_TOP');
  const pauseTimerRef = useRef(1.2);
  const lastTimeRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const isManuallyPausedRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isManuallyPausedRef.current = isManuallyPaused;
  }, [isManuallyPaused]);

  // Measure scrollable distance
  const updateScrollDimensions = useCallback(() => {
    if (!viewportRef.current || !contentRef.current) return;
    const viewportHeight = viewportRef.current.clientHeight;
    const contentHeight = contentRef.current.scrollHeight;
    const maxScroll = Math.max(0, contentHeight - viewportHeight);
    maxScrollRef.current = maxScroll;
    setCanScroll(maxScroll > 15);
  }, []);

  // Reset scroll on project change
  useEffect(() => {
    setImageError(false);
    scrollPosRef.current = 0;
    phaseRef.current = 'PAUSE_TOP';
    pauseTimerRef.current = 1.0;
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, [project.id]);

  // Main animation ticker loop
  useEffect(() => {
    let rafId: number;

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1); // cap dt at 100ms to avoid tab jumps
      lastTimeRef.current = time;

      const isPaused = isHoveredRef.current || isManuallyPausedRef.current;

      if (!isPaused && maxScrollRef.current > 15) {
        const scrollSpeed = 42; // pixels per second for slow, readable exploration

        if (phaseRef.current === 'DOWN') {
          scrollPosRef.current += scrollSpeed * dt;
          if (scrollPosRef.current >= maxScrollRef.current) {
            scrollPosRef.current = maxScrollRef.current;
            phaseRef.current = 'PAUSE_BOTTOM';
            pauseTimerRef.current = 2.2; // Pause at footer to read
          }
        } else if (phaseRef.current === 'PAUSE_BOTTOM') {
          pauseTimerRef.current -= dt;
          if (pauseTimerRef.current <= 0) {
            phaseRef.current = 'RESET';
          }
        } else if (phaseRef.current === 'RESET') {
          // Smooth glide back to top
          const returnSpeed = Math.max(380, maxScrollRef.current / 1.6);
          scrollPosRef.current -= returnSpeed * dt;
          if (scrollPosRef.current <= 0) {
            scrollPosRef.current = 0;
            phaseRef.current = 'PAUSE_TOP';
            pauseTimerRef.current = 1.6; // Pause at top before repeating
          }
        } else if (phaseRef.current === 'PAUSE_TOP') {
          pauseTimerRef.current -= dt;
          if (pauseTimerRef.current <= 0) {
            phaseRef.current = 'DOWN';
          }
        }

        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, -${scrollPosRef.current}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      lastTimeRef.current = null;
    };
  }, []);

  // Update dimensions on window resize
  useEffect(() => {
    window.addEventListener('resize', updateScrollDimensions);
    return () => window.removeEventListener('resize', updateScrollDimensions);
  }, [updateScrollDimensions]);

  // Handle manual trackpad/mousewheel scroll when hovering
  const handleWheel = (e: React.WheelEvent) => {
    if (maxScrollRef.current <= 15) return;
    e.stopPropagation();
    scrollPosRef.current = Math.max(0, Math.min(maxScrollRef.current, scrollPosRef.current + e.deltaY * 0.8));
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, -${scrollPosRef.current}px, 0)`;
    }
  };

  const handleResetToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrollPosRef.current = 0;
    phaseRef.current = 'PAUSE_TOP';
    pauseTimerRef.current = 1.5;
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  const handleTogglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsManuallyPaused((prev) => !prev);
  };

  const isPaused = isHovered || isManuallyPaused;

  return (
    <div className="relative w-full max-w-2xl mx-auto py-2">
      {/* Laptop Lid & Screen */}
      <div className="laptop-lid">
        <div className="laptop-bezel">
          {/* Integrated Webcam Bar */}
          <div className="laptop-camera-bar">
            <div className="laptop-camera-lens" title="HD Webcam & Sensor" />
          </div>

          {/* Screen Display Viewport (Strictly Clipped with aspect-16/10) */}
          <div
            ref={viewportRef}
            className="laptop-screen-viewport group cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onWheel={handleWheel}
            aria-label={`${project.title} live preview screen`}
          >
            {/* Screen Glass Glare Sheen */}
            <div className="laptop-screen-glare" />

            {/* Scrolling Screenshot Content */}
            <div
              ref={contentRef}
              className="w-full will-change-transform transition-transform ease-linear"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {imageError ? (
                <div className="w-full aspect-[16/10] bg-[#14151a] flex flex-col items-center justify-center p-6 text-center text-slate-400">
                  <ImageOff size={40} className="text-slate-500 mb-3" />
                  <p className="font-semibold text-sm text-slate-200">{project.title}</p>
                  <p className="text-xs text-slate-400 mt-1">Live website preview active</p>
                </div>
              ) : (
                <picture>
                  {/* High performance optimized WebP */}
                  <source srcSet={`/images/projects/${project.slug}.webp`} type="image/webp" />
                  <img
                    ref={imageRef}
                    src={project.fullScreenshot || project.thumbnail}
                    alt={`${project.title} full website capture`}
                    className="w-full h-auto block select-none pointer-events-none"
                    loading="eager"
                    decoding="async"
                    onLoad={() => {
                      updateScrollDimensions();
                    }}
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                </picture>
              )}
            </div>

            {/* Status Overlay: Auto-scroll indicator & Quick Action Controls */}
            {canScroll && (
              <div
                className={`absolute bottom-3 right-3 z-30 flex items-center gap-1.5 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full text-[11px] font-medium text-white border border-white/10 shadow-lg">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  <span>{isPaused ? 'Paused' : 'Auto-scrolling'}</span>

                  <button
                    onClick={handleTogglePlayPause}
                    aria-label={isManuallyPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                    className="p-1 hover:text-accent transition-colors ml-0.5 rounded-full hover:bg-white/10"
                    title={isManuallyPaused ? 'Resume scroll' : 'Pause scroll'}
                  >
                    {isManuallyPaused ? <Play size={10} /> : <Pause size={10} />}
                  </button>

                  <button
                    onClick={handleResetToTop}
                    aria-label="Scroll back to top"
                    className="p-1 hover:text-accent transition-colors rounded-full hover:bg-white/10"
                    title="Return to top"
                  >
                    <RotateCcw size={10} />
                  </button>
                </div>
              </div>
            )}

            {/* Visit Live Website Shortcut pill in top-left */}
            <div className="absolute top-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <a
                href={project.domain}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onExternalClick}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 hover:bg-black backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10 shadow-lg transition-transform hover:scale-105"
              >
                <span>Visit Live Site</span>
                <ExternalLink size={12} className="text-accent" />
              </a>
            </div>

            {/* Hint overlay on initial load / hover */}
            {isHovered && canScroll && (
              <div className="absolute top-3 right-3 z-30 pointer-events-none text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                Scroll with mouse wheel or trackpad
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Laptop Base (Tapered Deck / Keyboard Lip) */}
      <div className="laptop-deck">
        <div className="laptop-notch" />
      </div>

      {/* Realistic Ambient Contact Shadow */}
      <div className="laptop-desk-shadow" />
    </div>
  );
};
