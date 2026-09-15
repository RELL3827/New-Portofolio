import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] z-10 bg-[#030509]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Year */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="relative w-8 h-8 rounded-full border border-[#2c67ed]/40 flex items-center justify-center">
            {/* Tiny Orbiting Dot */}
            <div 
              className="absolute inset-0 rounded-full border border-dashed border-[#38bdf8]/40"
              style={{ animation: 'spiderWebRotate 12s linear infinite' }}
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[#2c67ed] shadow-[0_0_8px_#2c67ed]" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-200">
              © 2026 Farel Rizky Pratama
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Universitas Muhammadiyah Cilegon • S1 Teknik Informatika
            </p>
          </div>
        </div>

        {/* Center: Built with Stack Info */}
        <p className="text-xs text-slate-400 font-mono text-center">
          Built with <span className="text-slate-200">React</span>, <span className="text-[#38bdf8]">Tailwind CSS</span> &amp; <span className="text-[#2c67ed]">Framer Motion</span>.
        </p>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="glass-button p-2.5 rounded-full text-slate-400 hover:text-white hover:border-[#2c67ed]/50 transition-all flex items-center justify-center cursor-pointer"
          data-cursor="hover"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
