import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import SpaceBackground from './components/SpaceBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#030509] text-slate-100 font-sans selection:bg-[#2c67ed]/30 selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0 h-screen overflow-hidden pointer-events-none' : 'opacity-100'}`}>
        {/* Interactive Space Starfield & Ambient Glow Canvas */}
      <SpaceBackground />

      {/* Smooth Trailing Blue Cursor with Spider-Sense mode */}
      <CustomCursor />

      {/* Floating Centered Glass Pill Navbar */}
      <Navbar />

      {/* Floating Aesthetic Music Player (bye x into you) */}
      <MusicPlayer />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col gap-8 md:gap-12">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Stats />
        <Portfolio />
        <Contact />
      </main>

      {/* Minimalist Futuristic Footer */}
      <Footer />
      </div>
    </div>
  );
}
