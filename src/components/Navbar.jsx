import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Terminal, User, Briefcase, Mail, Music } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero', id: 'hero', icon: Terminal },
  { label: 'About', href: '#about', id: 'about', icon: User },
  { label: 'Portfolio', href: '#portfolio', id: 'portfolio', icon: Briefcase },
  { label: 'Contact', href: '#contact', id: 'contact', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Sync music playback state with MusicPlayer component
  useEffect(() => {
    const handleMusicChange = (e) => {
      setIsMusicPlaying(!!e.detail?.isPlaying);
    };
    window.addEventListener('music-playback-changed', handleMusicChange);
    return () => window.removeEventListener('music-playback-changed', handleMusicChange);
  }, []);

  const toggleMusic = () => {
    window.dispatchEvent(new CustomEvent('toggle-music-playback'));
  };

  // Scroll listener for background opacity and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Centered Floating Desktop & Tablet Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#070b14]/85 backdrop-blur-xl border border-[#2c67ed]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(44,103,237,0.2)]'
              : 'bg-[#070b14]/60 backdrop-blur-lg border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(44,103,237,0.1)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Brand Mark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero', 'hero')}
            className="flex items-center gap-2 pl-2 pr-3 py-1 group"
            data-cursor="hover"
          >
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-[#2c67ed] to-[#38bdf8] flex items-center justify-center text-white font-bold text-xs shadow-[0_0_12px_rgba(44,103,237,0.5)] group-hover:scale-105 transition-transform">
              FR
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            </div>
            <span className="font-heading font-semibold text-sm tracking-wide text-white group-hover:text-[#38bdf8] transition-colors hidden xs:inline-block">
              Farel.dev
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 z-10 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  data-cursor="hover"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 rounded-full bg-[#2c67ed] shadow-[0_0_16px_rgba(44,103,237,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Action Buttons: Music & Let's Connect */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMusic}
              className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                isMusicPlaying
                  ? 'text-[#38bdf8] border-[#38bdf8]/50 bg-[#2c67ed]/25 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-slate-300 border-white/10 hover:text-white hover:bg-white/10'
              }`}
              title={isMusicPlaying ? 'Pause Music (bye x into you)' : 'Play Music (bye x into you)'}
              aria-label="Toggle Music Track"
              data-cursor="hover"
            >
              <Music size={13} className={isMusicPlaying ? 'animate-pulse text-[#38bdf8]' : 'text-slate-400'} />
              <span className="hidden xs:inline-block text-[11px]">
                {isMusicPlaying ? 'Playing' : 'Soundtrack'}
              </span>
              {isMusicPlaying && (
                <span className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-2.5 bg-[#38bdf8] rounded-full animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-[#38bdf8] rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-0.5 h-2 bg-[#38bdf8] rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="hidden sm:inline-block px-3.5 py-1.5 rounded-full text-xs font-medium text-[#38bdf8] border border-[#2c67ed]/40 hover:bg-[#2c67ed]/20 transition-all hover:shadow-[0_0_15px_rgba(44,103,237,0.35)]"
              data-cursor="hover"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
            data-cursor="hover"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 p-4 rounded-2xl bg-[#070b14]/95 backdrop-blur-2xl border border-[#2c67ed]/30 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(44,103,237,0.25)] sm:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.5)]'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-[#38bdf8]'} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
              
              <div className="pt-2 mt-1 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={toggleMusic}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isMusicPlaying
                      ? 'bg-[#2c67ed]/25 border-[#38bdf8]/50 text-[#38bdf8]'
                      : 'bg-white/5 border-white/10 text-slate-200'
                  }`}
                >
                  <Music size={15} />
                  <span>{isMusicPlaying ? 'Pause bye x into you 🎵' : 'Play bye x into you 🎵'}</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact', 'contact')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2c67ed]/20 border border-[#2c67ed]/40 text-[#38bdf8] text-sm font-medium hover:bg-[#2c67ed]/30"
                >
                  <Sparkles size={14} /> Let's Talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
