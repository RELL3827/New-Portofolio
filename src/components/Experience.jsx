import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Code, CheckCircle2, Sparkles, Filter, Building2, Laptop } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  const [filter, setFilter] = useState('all'); // 'all' | 'industry' | 'tech'

  const filteredExperiences = experienceData.filter((exp) => {
    if (filter === 'all') return true;
    return exp.category === filter;
  });

  return (
    <section id="experience" className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Sub-header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c67ed]/10 border border-[#2c67ed]/30 text-[#38bdf8] text-xs font-mono mb-3"
          >
            <Briefcase size={14} />
            <span>Practical &amp; Professional Background</span>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-bold text-white font-heading mb-3"
          >
            Work &amp; Project <span className="text-[#38bdf8]">Experience</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-400 text-sm max-w-lg mx-auto font-light"
          >
            Rekam jejak pengalaman nyata mulai dari operasional industri &amp; F&B, logistik, penyusunan SOP, hingga rekayasa perangkat lunak web modern.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'all'
                ? 'bg-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.5)]'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
            }`}
            data-cursor="hover"
          >
            <Filter size={12} />
            <span>Semua ({experienceData.length})</span>
          </button>

          <button
            onClick={() => setFilter('industry')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'industry'
                ? 'bg-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.5)]'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
            }`}
            data-cursor="hover"
          >
            <Building2 size={12} />
            <span>Pengalaman Industri &amp; F&B (CV)</span>
          </button>

          <button
            onClick={() => setFilter('tech')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'tech'
                ? 'bg-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.5)]'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
            }`}
            data-cursor="hover"
          >
            <Laptop size={12} />
            <span>Web &amp; Software Dev</span>
          </button>
        </div>

        {/* Experience List */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.position + exp.company}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-[#2c67ed]/40 transition-all hover:bg-[#0a1329]/70 group"
              >
                {/* Top Row: Period, Role & Category */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#2c67ed]/15 text-[#38bdf8] border border-[#2c67ed]/30">
                        {exp.categoryLabel}
                      </span>
                      {exp.duration && (
                        <span className="text-[11px] font-mono text-slate-400">
                          • {exp.duration}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-[#38bdf8] transition-colors">
                      {exp.position}
                    </h4>
                    <p className="text-sm font-medium text-slate-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1 rounded-full bg-[#2c67ed]/10 border border-[#2c67ed]/25 text-[#38bdf8] text-xs font-mono">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 font-light">
                  {exp.description}
                </p>

                {/* Technologies / Skill tags */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
                    <Code size={12} /> Skills:
                  </span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium text-slate-300 bg-white/[0.04] border border-white/10 group-hover:border-[#2c67ed]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
