import React, { useState, useRef, useEffect } from 'react';
import { SoftwareProject } from '../../types/software';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  AlertCircle,
  Loader2,
  Smartphone,
  Monitor,
} from 'lucide-react';
import '../../styles/software-showcase.css';

interface VideoPlaybackModalProps {
  project: SoftwareProject | null;
  onClose: () => void;
}

export const VideoPlaybackModal: React.FC<VideoPlaybackModalProps> = ({ project, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close modal and pause video on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  // Clean pause on unmount or project change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoading(true);
    setHasError(false);
  }, [project]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || project?.durationSec || 0);
    setIsLoading(false);
    // Auto-start video safely when modal opens
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay policy prevented playback, user can click play
        setIsPlaying(false);
      });
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!project) return null;

  const isPortrait = project.aspectRatio === 'portrait';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md video-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview Video: ${project.title}`}
    >
      <div
        ref={playerContainerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        className={`relative w-full bg-[#0D0E12] border border-white/10 rounded-xl overflow-hidden shadow-2xl video-modal-content flex flex-col ${
          isPortrait ? 'max-w-md' : 'max-w-5xl'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#14151C] border-b border-white/10 select-none">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="p-1 rounded bg-white/5 text-accent border border-white/10">
              {isPortrait ? <Smartphone size={15} /> : <Monitor size={15} />}
            </span>
            <div className="truncate">
              <h3 className="text-sm font-semibold text-white truncate">{project.title}</h3>
              <p className="text-[11px] text-slate-400 truncate">{project.applicationType}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div
          className={`relative w-full bg-black flex items-center justify-center select-none ${
            isPortrait ? 'aspect-[9/18] sm:max-h-[75vh]' : 'aspect-video'
          }`}
          onClick={togglePlayPause}
        >
          {/* Loading Indicator */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20 pointer-events-none">
              <Loader2 size={36} className="text-accent animate-spin mb-2" />
              <span className="text-xs text-slate-300 font-mono">Loading video stream...</span>
            </div>
          )}

          {/* Error Fallback */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900 z-20">
              <AlertCircle size={40} className="text-amber-400 mb-3" />
              <p className="text-sm font-semibold text-white mb-1">Preview Video Unavailable</p>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                The video stream could not be loaded directly. You can request a live product walkthrough via WhatsApp.
              </p>
              <button
                onClick={() => {
                  setHasError(false);
                  setIsLoading(true);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors"
              >
                <RotateCcw size={14} />
                <span>Retry Stream</span>
              </button>
            </div>
          )}

          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.poster}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => {
              setIsLoading(false);
              setIsPlaying(true);
            }}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full ${isPortrait ? 'object-contain' : 'object-cover'}`}
          />

          {/* Center Play/Pause Pulsing Overlay */}
          {!isPlaying && !isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/25">
              <div className="w-16 h-16 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-xl backdrop-blur-sm">
                <Play size={28} className="translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Floating Controls Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-4 py-3 z-30 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Timeline Progress Slider */}
            <div className="flex items-center gap-3 mb-2">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Video timeline seek"
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-white">
              {/* Left: Play/Pause, Volume, Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                </button>

                <div className="flex items-center gap-1.5 group/vol">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume control"
                    className="w-14 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <span className="font-mono text-[11px] text-slate-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right: Fullscreen */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Description */}
        <div className="p-4 bg-[#14151C] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            {project.shortDescription}
          </p>

          <a
            href={`https://wa.me/919080394828?text=${encodeURIComponent(
              `Hello INPAND Technologies, I viewed the ${project.title} (${project.applicationType}) preview video on your showcase and would like to discuss building a similar software project.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-accent hover:bg-accent/90 text-white rounded text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0"
          >
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
