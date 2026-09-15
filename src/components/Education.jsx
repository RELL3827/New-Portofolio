import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
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
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-bold text-white font-heading"
          >
            Education <span className="text-[#38bdf8]">Timeline</span>
          </motion.h3>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Glowing Vertical Line */}
          <div 
            className="absolute top-2 bottom-2 left-[11px] sm:left-[19px] w-[2px]"
            style={{
              background: 'linear-gradient(to bottom, #2c67ed 0%, #38bdf8 60%, rgba(44,103,237,0.1) 100%)',
              boxShadow: '0 0 10px rgba(44, 103, 237, 0.4)'
            }}
          />

          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Glowing Node on Timeline */}
              <div 
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-115 ${
                  item.highlight
                    ? 'bg-[#030509] border-[#38bdf8] shadow-[0_0_15px_#38bdf8]'
                    : 'bg-[#030509] border-[#2c67ed]/60 shadow-[0_0_10px_rgba(44,103,237,0.4)]'
                }`}
              >
                <div 
                  className={`w-2 h-2 rounded-full ${
                    item.highlight ? 'bg-[#38bdf8] animate-pulse' : 'bg-[#2c67ed]'
                  }`} 
                />
              </div>

              {/* Education Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-[#2c67ed]/40 transition-all hover:bg-[#0a1329]/60">
                {/* Year Pill & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c67ed]/15 border border-[#2c67ed]/30 text-[#38bdf8] text-xs font-mono font-medium">
                    <Calendar size={12} />
                    <span>{item.period}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30">
                    {item.badge}
                  </span>
                </div>

                {/* Institution & Major */}
                <h4 className="text-lg sm:text-xl font-bold text-white font-heading mb-1">
                  {item.institution}
                </h4>
                <div className="text-sm font-medium text-[#38bdf8] mb-3 flex items-center gap-1.5">
                  <BookOpen size={14} />
                  <span>{item.degree}</span>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
