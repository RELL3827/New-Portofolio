import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LightningStorm from './LightningStorm';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds loading
    const intervalTime = 30; // update every 30ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Ease-out effect for the counter
      const p = currentStep / totalSteps;
      const easeOut = 1 - Math.pow(1 - p, 3);
      
      const newProgress = Math.min(Math.round(easeOut * 100), 100);
      setProgress(newProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // Slight delay at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030509] overflow-hidden"
    >
      <LightningStorm frames={4} boltsPerFrame={5} flash />

      <div className="relative flex flex-col items-center justify-center w-full max-w-md p-8">
        {/* Background ambient glow syncing with progress */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] -z-10"
          animate={{
            width: `${150 + progress * 2}px`,
            height: `${150 + progress * 2}px`,
            backgroundColor: `rgba(44, 103, 237, ${0.1 + (progress / 100) * 0.2})`
          }}
        />

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 text-center"
        >
          <motion.h2
            className="text-slate-100 text-2xl sm:text-3xl font-bold tracking-tight"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background:
                'linear-gradient(90deg, #e2e8f0 0%, #38bdf8 25%, #7dd3fc 50%, #38bdf8 75%, #e2e8f0 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <motion.span
              className="inline-block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background:
                  'linear-gradient(90deg, #e2e8f0 0%, #38bdf8 30%, #ffffff 50%, #38bdf8 70%, #e2e8f0 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welcome to My Portfolio Website
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Realistic Lightning SVG */}
        <motion.div
          className="relative w-56 h-80 flex items-center justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
        >
          <motion.svg 
            viewBox="0 0 100 260" 
            className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            animate={{ 
              opacity: [0.6, 1, 0.4, 1, 0.7, 1, 0.3, 1]
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear"
            }}
          >
            <defs>
              <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur1" />
                <feGaussianBlur stdDeviation="6" result="blur2" />
                <feGaussianBlur stdDeviation="12" result="blur3" />
                <feMerge>
                  <feMergeNode in="blur3" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Minor Branches */}
            <motion.path 
              d="M 50,0 L 25,40 L 40,55 L 10,95 M 50,0 L 75,35 L 60,65 L 85,100 M 40,55 L 20,70 M 60,110 L 80,140"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              filter="url(#lightning-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: progress / 100,
                opacity: (progress / 100) * 0.6
              }}
              transition={{ duration: 0.1 }}
            />

            {/* Main Trunk Core */}
            <motion.path 
              d="M 50,0 L 35,45 L 60,55 L 30,115 L 65,125 L 25,185 L 55,195 L 20,250"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lightning-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1 }}
            />
            
            {/* Pure white inner core for extreme brightness */}
            <motion.path 
              d="M 50,0 L 35,45 L 60,55 L 30,115 L 65,125 L 25,185 L 55,195 L 20,250"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1 }}
            />
          </motion.svg>
        </motion.div>

        {/* Loading Progress Text & Bar */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-[#38bdf8] font-mono text-5xl sm:text-6xl font-bold tracking-tighter drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
            {progress}<span className="text-2xl sm:text-3xl text-slate-400">%</span>
          </div>
          <div className="text-slate-400 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase mt-1">
            {progress === 100 ? 'System Ready' : 'Initializing'}
          </div>
          
          {/* Futuristic Progress Bar */}
          <div className="w-64 h-1 bg-slate-800/80 rounded-full mt-5 overflow-hidden border border-slate-700/50 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2c67ed] via-[#38bdf8] to-[#ffffff]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Scanning energy pulse */}
            <motion.div
              className="absolute top-0 w-8 h-full bg-white/50 blur-[2px]"
              animate={{ 
                x: ['-200%', '300%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ left: `${Math.max(0, progress - 10)}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
