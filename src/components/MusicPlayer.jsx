import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Repeat,
  RotateCcw,
  RotateCw,
  ChevronUp,
  ChevronDown,
  Sparkles,
  SkipForward,
  SkipBack,
} from 'lucide-react';


const TRACKS = [
  {
    title: 'bye x into you',
    artist: 'Ariana Grande • Altare Remix',
    src: '/audio/bye-x-into-you.mp3',
    cover: '/audio/bye-x-into-you-cover.jpg',
  },
  {
    title: 'Animals x Starboy',
    artist: 'Maroon 5 x The Weeknd',
    src: '/audio/animals-x-starboy.mp3',
    cover: '/audio/bye-x-into-you-cover.jpg', // Default cover if missing
  }
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const track = TRACKS[currentTrackIndex];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(244.42);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  }, []);

  const handlePrevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  }, []);

  // Initialize and persist audio instance
  useEffect(() => {
    let audio = audioRef.current;
    
    // Create audio instance if it doesn't exist
    if (!audio) {
      audio = new Audio(track.src);
      audioRef.current = audio;
    } 
    // If audio exists but track changed, update src and play
    else if (!audio.src.endsWith(track.src)) {
      const wasPlaying = !audio.paused;
      audio.pause();
      audio.src = track.src;
      audio.load();
      if (wasPlaying || isPlaying) {
        audio.play().catch(() => setIsPlaying(false));
      }
    }
    
    audio.preload = 'auto';
    audio.loop = isLooping;
    audio.volume = isMuted ? 0 : volume;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => {
      if (audio.paused) setIsPlaying(false);
    };
    const onTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime);
      }
    };
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.warn('Auto-loop resume:', err));
      } else {
        handleNextTrack();
      }
    };
    const onError = (e) => {
      console.warn('Audio playback error, attempting recover:', e);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [isLooping, isSeeking, track.src, handleNextTrack, isMuted, volume, isPlaying]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Synchronize audio loop property
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  // Synchronize audio volume and mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Automatic Autoplay: attempts immediate play on load, fallback to first user gesture
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let hasStarted = false;

    const triggerPlay = () => {
      if (hasStarted || !audio) return;
      audio
        .play()
        .then(() => {
          hasStarted = true;
          setIsPlaying(true);
          setShowPrompt(false);
          cleanup();
        })
        .catch((err) => {
          // Autoplay prevented by browser security policy; listeners will catch first gesture
          console.debug('Awaiting user gesture for autoplay:', err.message);
        });
    };

    const onUserInteraction = () => {
      triggerPlay();
    };

    const cleanup = () => {
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
    };

    // Attempt direct autoplay immediately on page load
    triggerPlay();

    // Fallback: Trigger immediately on the user's very first interaction (click, scroll, touch)
    window.addEventListener('click', onUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onUserInteraction, { once: true, passive: true });
    window.addEventListener('scroll', onUserInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onUserInteraction, { once: true, passive: true });
    window.addEventListener('pointerdown', onUserInteraction, { once: true, passive: true });

    return () => {
      cleanup();
    };
  }, []);

  // Handle visibility change (tab switch / background tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!document.hidden && audio && isPlaying && audio.paused) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

  // External trigger synchronization (e.g. Navbar button)
  useEffect(() => {
    const handleToggle = () => {
      togglePlay();
    };
    window.addEventListener('toggle-music-playback', handleToggle);
    return () => window.removeEventListener('toggle-music-playback', handleToggle);
  }, []);

  // Broadcast state changes to navbar or other components
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('music-playback-changed', {
        detail: { isPlaying },
      })
    );
  }, [isPlaying]);

  // Robust play/pause toggle relying directly on DOM audio state
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    } else {
      audio
        .play()
        .then(() => {
          setShowPrompt(false);
        })
        .catch((err) => {
          console.warn('Audio play request failed or was interrupted:', err);
        });
    }
  }, []);

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleSeekEnd = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setIsSeeking(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      const targetTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Initial First-Visit Hint / Notification Bubble */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto mb-3 px-3.5 py-2 rounded-2xl bg-[#070b14]/90 backdrop-blur-xl border border-[#2c67ed]/40 text-xs text-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(44,103,237,0.25)] flex items-center gap-2 cursor-pointer hover:border-[#38bdf8]/60 transition-all"
            onClick={togglePlay}
            data-cursor="hover"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2c67ed]"></span>
            </span>
            <span className="font-medium text-slate-100">
              Play soundtrack: <span className="text-[#38bdf8] font-semibold">{track.title}</span> 🎵
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(false);
              }}
              className="ml-1 text-slate-400 hover:text-white text-xs px-1"
              aria-label="Dismiss prompt"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Player Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto mb-3 w-[300px] sm:w-[330px] rounded-3xl bg-[#070b14]/95 backdrop-blur-2xl border border-[#2c67ed]/35 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(44,103,237,0.25)] overflow-hidden relative"
          >
            {/* Ambient Glows */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#2c67ed]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#a855f7]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2c67ed]/20 border border-[#2c67ed]/40 text-[10px] font-medium tracking-wide text-[#38bdf8] uppercase">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#10b981] animate-pulse' : 'bg-slate-500'}`} />
                  Soundtrack
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Minimize Player"
                data-cursor="hover"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Album Art & Vinyl Disc Animation */}
            <div className="relative flex items-center justify-center my-2 py-2">
              <div className="relative flex items-center">
                {/* Vinyl Disc that slides out when playing */}
                <motion.div
                  animate={{
                    x: isPlaying ? 32 : 0,
                    rotate: isPlaying ? 360 : 0,
                  }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeOut' },
                    rotate: { duration: 5, ease: 'linear', repeat: Infinity },
                  }}
                  className="w-28 h-28 rounded-full bg-[#0d1117] border-2 border-[#1e293b] flex items-center justify-center shadow-xl overflow-hidden relative"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, #1e293b 2px, transparent 3px), repeating-radial-gradient(circle, #0a0f1d 0, #0a0f1d 3px, #161f36 4px, #0a0f1d 5px)',
                  }}
                >
                  {/* Vinyl Center Hole & Label */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2c67ed] to-[#38bdf8] flex items-center justify-center border-2 border-[#070b14] shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#070b14]" />
                  </div>
                </motion.div>

                {/* Album Cover Sleeve */}
                <div
                  className="relative z-10 w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(44,103,237,0.3)] group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  data-cursor="hover"
                >
                  <img
                    src={track.cover}
                    alt={`${track.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-[#2c67ed]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Song Information */}
            <div className="text-center mt-3">
              <h4 className="font-heading font-bold text-sm tracking-wide text-white flex items-center justify-center gap-1.5">
                <span>{track.title}</span>
                <Sparkles size={13} className="text-[#38bdf8]" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{track.artist}</p>
            </div>

            {/* Seek Timeline */}
            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
              <div className="relative flex items-center group">
                <input
                  type="range"
                  min="0"
                  max={duration || 244}
                  step="0.5"
                  value={currentTime}
                  onMouseDown={handleSeekStart}
                  onTouchStart={handleSeekStart}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekEnd}
                  onTouchEnd={handleSeekEnd}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#38bdf8] focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #38bdf8 0%, #2c67ed ${progressPercent}%, #1e293b ${progressPercent}%, #1e293b 100%)`,
                  }}
                  data-cursor="hover"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1 px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls Row */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
              {/* Loop Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLooping(!isLooping);
                }}
                className={`p-2 rounded-xl transition-all ${
                  isLooping
                    ? 'text-[#38bdf8] bg-[#2c67ed]/20 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                title={isLooping ? 'Looping Enabled (Auto-repeat)' : 'Looping Disabled'}
                data-cursor="hover"
              >
                <Repeat size={15} />
              </button>

              {/* Previous Track */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevTrack();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                title="Previous Track"
                data-cursor="hover"
              >
                <SkipBack size={15} />
              </button>

              {/* Play / Pause Circular Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#2c67ed] to-[#38bdf8] text-white flex items-center justify-center shadow-[0_0_20px_rgba(44,103,237,0.6)] hover:shadow-[0_0_28px_rgba(56,189,248,0.8)] transition-shadow"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                data-cursor="hover"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </motion.button>

              {/* Next Track */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextTrack();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                title="Next Track"
                data-cursor="hover"
              >
                <SkipForward size={15} />
              </button>

              {/* Volume & Mute Control */}
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    isMuted
                      ? 'text-rose-400 bg-rose-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  data-cursor="hover"
                >
                  {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-12 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                  aria-label="Volume Slider"
                  data-cursor="hover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Floating Capsule / Pill Bar (Always visible) */}
      <motion.div
        layout
        className="pointer-events-auto flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#070b14]/85 backdrop-blur-xl border border-[#2c67ed]/35 shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_20px_rgba(44,103,237,0.25)] hover:border-[#38bdf8]/50 transition-all cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
        data-cursor="hover"
      >
        {/* Mini Spinning Vinyl Disc Thumbnail */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/20 shadow-md">
          <motion.img
            src={track.cover}
            alt="Track Artwork"
            className="w-full h-full object-cover"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 4,
              ease: 'linear',
              repeat: isPlaying ? Infinity : 0,
            }}
          />
          {/* Center Spindle Hole */}
          <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[#070b14] border border-[#38bdf8]/60" />
        </div>

        {/* Animated Equalizer Waveform & Title */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-medium text-xs text-slate-100 group-hover:text-[#38bdf8] transition-colors max-w-[110px] sm:max-w-[130px] truncate">
              {track.title}
            </span>
          </div>

          {/* Dynamic Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3 mt-0.5">
            {[0, 1, 2, 3].map((barIndex) => (
              <motion.span
                key={barIndex}
                className="w-0.5 rounded-full bg-gradient-to-t from-[#2c67ed] to-[#38bdf8]"
                animate={
                  isPlaying
                    ? {
                        height: [
                          '3px',
                          `${barIndex === 0 ? 11 : barIndex === 1 ? 13 : barIndex === 2 ? 8 : 12}px`,
                          '3px',
                        ],
                      }
                    : { height: '3px' }
                }
                transition={
                  isPlaying
                    ? {
                        duration: 0.6 + barIndex * 0.15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : { duration: 0.2 }
                }
              />
            ))}
            <span className="text-[9px] text-slate-400 ml-1.5 font-mono">
              {isPlaying ? formatTime(currentTime) : track.artist.split('•')[0].trim()}
            </span>
          </div>
        </div>

        {/* Quick Play/Pause Button in Pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="p-1.5 rounded-full bg-[#2c67ed]/30 hover:bg-[#2c67ed] text-white border border-[#2c67ed]/40 shadow-[0_0_10px_rgba(44,103,237,0.4)] transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          data-cursor="hover"
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>

        {/* Expand/Collapse Chevron Indicator */}
        <div className="text-slate-400 group-hover:text-white transition-colors pl-0.5">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </motion.div>
    </div>
  );
}
