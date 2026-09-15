import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor
 * Ultra-lightweight, aesthetic, lag-free cursor.
 * Features a minimalist pinpoint dot with a soft ambient halo ring.
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpiderHover, setIsSpiderHover] = useState(false);

  // Fast, responsive springs for ultra-smooth aesthetic feel
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Snappy, lightweight spring physics (high damping, no sluggish rubber-banding)
  const springX = useSpring(rawX, { damping: 30, stiffness: 450, mass: 0.2 });
  const springY = useSpring(rawY, { damping: 30, stiffness: 450, mass: 0.2 });

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const spiderTarget = target.closest('[data-cursor-spider]');
      const clickableTarget = target.closest('a, button, input, textarea, [role="button"], [data-cursor="hover"]');

      setIsSpiderHover(!!spiderTarget);
      setIsHovered(!!clickableTarget && !spiderTarget);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, rawX, rawY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Aesthetic Outer Halo Ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isSpiderHover ? 1.8 : isHovered ? 1.5 : 1,
          borderColor: isSpiderHover 
            ? 'rgba(56, 189, 248, 0.85)' 
            : isHovered 
            ? 'rgba(56, 189, 248, 0.65)' 
            : 'rgba(44, 103, 237, 0.35)',
          backgroundColor: isSpiderHover
            ? 'rgba(44, 103, 237, 0.15)'
            : isHovered
            ? 'rgba(56, 189, 248, 0.08)'
            : 'rgba(44, 103, 237, 0.03)',
          boxShadow: isSpiderHover 
            ? '0 0 20px rgba(56, 189, 248, 0.6), inset 0 0 10px rgba(44, 103, 237, 0.4)' 
            : 'none'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        className="w-7 h-7 rounded-full border border-solid backdrop-blur-[0.5px]"
      />

      {/* Pinpoint Precision Center Dot */}
      <motion.div
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isSpiderHover ? 1.3 : isHovered ? 0.7 : 1,
          backgroundColor: '#38bdf8',
          boxShadow: isSpiderHover 
            ? '0 0 12px #38bdf8' 
            : '0 0 8px rgba(56, 189, 248, 0.8)'
        }}
        className="w-1.5 h-1.5 rounded-full"
      />
    </div>
  );
}
