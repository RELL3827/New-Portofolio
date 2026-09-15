import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Terminal, Sparkles, Code2, MapPin, GraduationCap, Cpu } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const roles = personalData.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth Typewriter Effect
  useEffect(() => {
    const currentFullText = roles[roleIndex];
    let typingSpeed = isDeleting ? 38 : 75;

    if (!isDeleting && displayedText === currentFullText) {
      // Pause at full text
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      // Switch to next word
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentFullText.substring(0, prev.length - 1)
          : currentFullText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, roles]);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      {/* Subtle Orbital Ring Lines behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-[#2c67ed]/[0.08] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Greeting, Big Name, Animated Roles, CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#070b14]/80 border border-[#2c67ed]/30 shadow-[0_0_15px_rgba(44,103,237,0.2)] mb-6 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span className="text-slate-300 font-mono">Available for Opportunities</span>
            <span className="text-slate-600">•</span>
            <span className="text-[#38bdf8] flex items-center gap-1">
              <MapPin size={11} /> Cilegon, ID
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#38bdf8] font-mono text-sm sm:text-base font-medium tracking-wide mb-2 flex items-center gap-2"
          >
            <Sparkles size={16} className="text-[#2c67ed]" />
            {personalData.greeting}
          </motion.p>

          {/* Large Focal Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 uppercase"
            style={{
              textShadow: '0 0 30px rgba(44, 103, 237, 0.35)'
            }}
          >
            {personalData.name}
          </motion.h1>

          {/* Animated Role / Title Typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 h-10 sm:h-12 mb-6"
          >
            <span className="text-xl sm:text-3xl font-semibold bg-gradient-to-r from-[#38bdf8] via-[#2c67ed] to-blue-400 bg-clip-text text-transparent font-heading">
              {displayedText}
            </span>
            <span className="w-1 h-6 sm:h-8 bg-[#2c67ed] rounded animate-pulse" />
          </motion.div>

          {/* Short Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-light"
          >
            {personalData.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection('portfolio')}
              className="btn-primary-blue px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base flex items-center gap-2.5 group cursor-pointer"
              data-cursor="hover"
            >
              <span>View My Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="glass-button px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-200 hover:text-white flex items-center gap-2.5 cursor-pointer"
              data-cursor="hover"
            >
              <MessageSquare size={16} className="text-[#38bdf8]" />
              <span>Let's Talk</span>
            </button>
          </motion.div>

          {/* Quick Academic Affiliation Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex items-center gap-2 text-xs text-slate-400 font-mono"
          >
            <GraduationCap size={15} className="text-[#2c67ed]" />
            <span>Mahasiswa S1 Teknik Informatika — Universitas Muhammadiyah Cilegon</span>
          </motion.div>
        </div>

        {/* Right Column: Futuristic Developer HUD / Telemetry Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="w-full max-w-md glass-panel-glow rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">farel_orbit_system.sh</span>
              </div>
              <span className="text-[10px] font-mono text-[#38bdf8] bg-[#2c67ed]/15 px-2 py-0.5 rounded border border-[#2c67ed]/30">
                2026.PROD
              </span>
            </div>

            {/* Code / Developer Identity Simulation */}
            <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="text-slate-400">
                <span className="text-[#38bdf8]">const</span> developer = &#123;
              </div>
              <div className="pl-4">
                <span className="text-slate-400">name:</span>{' '}
                <span className="text-emerald-400">"{personalData.displayName}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">campus:</span>{' '}
                <span className="text-emerald-400">"Univ. Muhammadiyah Cilegon"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">major:</span>{' '}
                <span className="text-emerald-400">"{personalData.major}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">coreStack:</span> [
                <span className="text-blue-300">"React"</span>,{' '}
                <span className="text-blue-300">"Laravel"</span>,{' '}
                <span className="text-blue-300">"MySQL"</span>,{' '}
                <span className="text-blue-300">"Tailwind"</span>
                ],
              </div>
              <div className="pl-4">
                <span className="text-slate-400">passion:</span>{' '}
                <span className="text-emerald-400">"Building Scalable &amp; Aesthetic Web"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">easterEgg:</span>{' '}
                <span className="text-[#38bdf8]">"Try touching my photo below ⚡ (Blue Ranger)"</span>
              </div>
              <div className="text-slate-400">&#125;;</div>
            </div>

            {/* Telemetry Micro Status Footnote */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Cpu size={13} />
                <span>Node 26 • Latency 12ms</span>
              </div>
              <span className="text-slate-400">ID: FR-2026-UMC</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
