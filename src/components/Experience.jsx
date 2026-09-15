import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Code, CheckCircle, Sparkles } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Sub-header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c67ed]/10 border border-[#2c67ed]/30 text-[#38bdf8] text-xs font-mono mb-3"
          >
            <Briefcase size={14} />
            <span>Practical Background</span>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-bold text-white font-heading"
          >
            Work &amp; Project <span className="text-[#38bdf8]">Experience</span>
          </motion.h3>
        </div>

        {/* Experience List */}
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-[#2c67ed]/40 transition-all hover:bg-[#0a1329]/60 group"
            >
              {/* Top Row: Period & Role */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
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

              {/* Technologies Used */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
                  <Code size={12} /> Stack:
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
        </div>
      </div>
    </section>
  );
}
