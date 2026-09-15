import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Layers, Sparkles, Code2 } from 'lucide-react';
import Projects from './Projects';
import TechStack from './TechStack';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'tech'

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c67ed]/10 border border-[#2c67ed]/30 text-[#38bdf8] text-xs font-mono mb-3"
          >
            <Sparkles size={12} />
            <span>02 // Portfolio Hub</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading mb-4"
          >
            Selected <span className="text-[#38bdf8]">Work</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl font-light mb-8"
          >
            Showcase proyek web terkurasi, sistem informasi, dan teknologi yang telah dibangun dengan standar industri modern.
          </motion.p>

          {/* Sub-navigation / Tab Switcher */}
          <div className="inline-flex p-1 rounded-full bg-[#070b14]/80 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setActiveTab('projects')}
              className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'projects' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              data-cursor="hover"
            >
              {activeTab === 'projects' && (
                <motion.div
                  layoutId="portfolioActiveTab"
                  className="absolute inset-0 rounded-full bg-[#2c67ed] shadow-[0_0_18px_rgba(44,103,237,0.5)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase size={14} />
                <span>Projects Showcase</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'tech' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              data-cursor="hover"
            >
              {activeTab === 'tech' && (
                <motion.div
                  layoutId="portfolioActiveTab"
                  className="absolute inset-0 rounded-full bg-[#2c67ed] shadow-[0_0_18px_rgba(44,103,237,0.5)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Layers size={14} />
                <span>Tech Stack</span>
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <motion.div
              key="projects-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Projects />
            </motion.div>
          ) : (
            <motion.div
              key="tech-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <TechStack />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
