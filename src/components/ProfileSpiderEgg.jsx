import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, Shield } from 'lucide-react';

/**
 * // Power Ranger Biru Easter Egg
 * Exact architecture as seen on modern reference portfolios (ekawahyu-portofolio.vercel.app):
 * 1. Fully transparent cutout portrait (/profile.png) with zero white background.
 * 2. Transparent matching Power Ranger Biru suit (/powerranger.png) aligned 100% straight and level with zero tilt.
 * 3. Dynamic cursor-touch reveal driven by Framer Motion useSpring & useMotionTemplate:
 *    radial-gradient(circle 140px at ${smoothX}px ${smoothY}px, black 55%, transparent 100%)
 * 4. Merges organically with dark space background and subtle cyan/blue ambient nebula.
 */
export default function ProfileSpiderEgg({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef(null);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Spring physics for buttery-smooth dynamic reveal
  const springConfig = { damping: 25, stiffness: 280, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic radial mask following the cursor touch point
  const dynamicMask = useMotionTemplate`radial-gradient(circle 140px at ${smoothX}px ${smoothY}px, black 55%, transparent 100%)`;

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback((e) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(-1000);
    mouseY.set(-1000);
  }, [mouseX, mouseY]);

  // Touch screen mobile support
  const handleTouchMove = useCallback((e) => {
    if (!e.touches[0]) return;
    setIsTouch(true);
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX.set(touch.clientX - rect.left);
    mouseY.set(touch.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsHovered(false);
      mouseX.set(-1000);
      mouseY.set(-1000);
    }, 400);
  }, [mouseX, mouseY]);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Power Ranger Morphin Grid Badge when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-12 z-30 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070b14]/90 border border-[#2c67ed]/80 shadow-[0_0_25px_rgba(44,103,237,0.7)] text-cyan-200 text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap backdrop-blur-md"
          >
            <Zap size={14} className="text-[#38bdf8] animate-bounce" />
            <span>Morphin Grid // Blue Ranger Active</span>
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group flex justify-center items-center">
        {/* Soft Ambient Radial Cosmic Glow behind the transparent body */}
        <div 
          className="absolute -inset-16 pointer-events-none transition-all duration-700"
          style={{
            background: isHovered 
              ? 'radial-gradient(circle at center, rgba(44,103,237,0.4) 0%, rgba(56,189,248,0.2) 40%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(44,103,237,0.25) 0%, rgba(56,189,248,0.1) 45%, transparent 75%)',
            filter: 'blur(35px)'
          }}
        />

        {/* Outer subtle orbital ring */}
        <div 
          className={`absolute -inset-6 sm:-inset-10 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${
            isHovered 
              ? 'border-[#38bdf8]/50 rotate-45 scale-102' 
              : 'border-[#2c67ed]/20 rotate-0 scale-100'
          }`}
          style={{ animation: isHovered ? 'spiderWebRotate 18s linear infinite' : 'spiderWebRotate 40s linear infinite' }}
        />

        {/* Bottom fade mask so the transparent cutout torso merges into the space background */}
        <div 
          className="relative z-10"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)'
          }}
        >
          {/* Interactive Photo Stage */}
          <div
            ref={containerRef}
            data-cursor-spider="true"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-[310px] h-[330px] sm:w-[400px] sm:h-[420px] lg:w-[470px] lg:h-[490px] relative cursor-none"
          >
            {/* 1. Base Cutout Portrait (Transparent / Tanpa Background Putih) */}
            <img
              src="/profile.png"
              alt="Farel Rizky Pratama - Universitas Muhammadiyah Cilegon"
              className="absolute inset-0 w-full h-full object-contain object-bottom transition-all duration-500 pointer-events-none drop-shadow-[0_15px_35px_rgba(44,103,237,0.3)]"
              loading="eager"
            />

            {/* 2. Periodic Morphin Grid Breathing Hint when idle */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              animate={{ opacity: isHovered ? 0 : [0, 0.4, 0.4, 0] }}
              transition={{
                opacity: isHovered
                  ? { duration: 0.25 }
                  : { repeat: Infinity, duration: 4.5, repeatDelay: 2.5, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }
              }}
            >
              <img
                src="/powerranger.png"
                alt="Power Ranger Biru Hint"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_0_35px_rgba(44,103,237,0.5)]"
              />
            </motion.div>

            {/* 3. Dynamic Cursor-Touch Reveal (Power Ranger Biru materializes where cursor touches) */}
            {/* Power Ranger Biru Easter Egg */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                WebkitMaskImage: dynamicMask,
                maskImage: dynamicMask,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat'
              }}
            >
              <img
                src="/powerranger.png"
                alt="Power Ranger Biru Touch Reveal"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_0_45px_rgba(44,103,237,0.9)]"
              />
            </motion.div>

            {/* 4. Sleek Reticle Center Pinpoint following cursor */}
            <motion.div
              className="absolute w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-difference"
              style={{
                left: smoothX,
                top: smoothY,
                x: '-50%',
                y: '-50%',
                opacity: isHovered ? 1 : 0,
                background: 'white',
                boxShadow: '0 0 10px rgba(56,189,248,0.9)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Helper Caption under the transparent cutout */}
      <div className="text-center mt-3 z-20">
        <p className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
          <Sparkles size={11} className={isHovered ? 'text-[#38bdf8]' : 'text-[#2c67ed]'} />
          <span>
            {isHovered 
              ? 'Morphin Grid active: menyentuh wajah memunculkan Power Ranger Biru' 
              : 'Sentuh / usap foto untuk mengungkap Power Ranger Biru'}
          </span>
        </p>
      </div>
    </div>
  );
}
