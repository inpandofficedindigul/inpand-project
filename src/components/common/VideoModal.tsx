import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { useScrollLock } from '../../hooks/useScrollLock';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  projectTitle: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  projectTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Prevent background scrolling while modal is open
  useScrollLock(isOpen);

  // Handle close and clean video state
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  }, [onClose]);

  // Keyboard navigation: Escape, Space, M, F
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Reset & autoplay when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      setIsLoading(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser autoplay policy might require user click or mute
            setIsPlaying(false);
          });
      }
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview video for ${projectTitle}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-5xl bg-[#0F0F10] rounded-lg overflow-hidden shadow-2xl border border-white/10 flex flex-col group select-none"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#171718] border-b border-white/10 text-white z-20">
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="text-xs sm:text-sm font-medium tracking-wide text-neutral-200 truncate">
              {projectTitle} — Video Preview
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close preview modal"
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            className="w-full h-full object-contain"
          />

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
              <div className="w-10 h-10 border-2 border-white/20 border-t-accent rounded-full animate-spin" />
            </div>
          )}

          {/* Big Center Play Button when paused */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-200">
                <Play size={28} className="translate-x-0.5 fill-white text-white" />
              </div>
            </div>
          )}

          {/* Bottom Custom Overlay Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-5 flex flex-col gap-2 transition-opacity duration-300 z-10 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Progress scrubber */}
            <div className="flex items-center gap-3 w-full">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek video position"
                className="w-full h-1 bg-white/25 rounded-lg appearance-none cursor-pointer accent-accent focus:outline-none"
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between text-white text-xs sm:text-sm pt-1">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-1 hover:text-accent transition-colors"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  aria-label="Replay video"
                  className="p-1 hover:text-accent transition-colors hidden sm:block"
                  title="Replay"
                >
                  <RotateCcw size={16} />
                </button>

                {/* Volume control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-1 hover:text-accent transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume slider"
                    className="w-16 h-1 bg-white/25 rounded-lg appearance-none cursor-pointer accent-accent hidden sm:block"
                  />
                </div>

                <div className="text-neutral-400 text-xs tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-400 hidden md:inline">
                  Press Space to pause &bull; Esc to close
                </span>
                <button
                  onClick={toggleFullscreen}
                  aria-label="Toggle Fullscreen"
                  className="p-1 hover:text-accent transition-colors"
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

