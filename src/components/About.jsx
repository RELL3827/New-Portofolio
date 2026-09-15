import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Compass, Briefcase, GraduationCap, CheckCircle2, Sparkles, Calendar } from 'lucide-react';
import ProfileSpiderEgg from './ProfileSpiderEgg';
import { personalData } from '../data/portfolioData';

export default function About() {
  const metadataItems = [
    { label: 'Full Name', value: personalData.displayName, icon: User },
    { label: 'Birth Date', value: personalData.birthDate, icon: Calendar },
    { label: 'Campus', value: personalData.institution, icon: GraduationCap },
    { label: 'Major', value: personalData.major, icon: Compass },
    { label: 'Location', value: personalData.location, icon: MapPin },
    { label: 'Focus Area', value: personalData.focus, icon: CheckCircle2 },
    { label: 'Experience', value: personalData.experiencePeriod, icon: Briefcase },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c67ed]/10 border border-[#2c67ed]/30 text-[#38bdf8] text-xs font-mono font-medium uppercase tracking-wider mb-3"
          >
            <Sparkles size={12} />
            <span>01 // Developer Identity</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading"
          >
            About <span className="text-[#38bdf8]">Me</span>
          </motion.h2>
        </div>

        {/* Editorial Layout: Left Photo with Easter Egg, Right Bio & Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Portrait with Spider-Man Easter Egg */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <ProfileSpiderEgg />
          </motion.div>

          {/* Right Column: Bio Narrative & Elegant Metadata */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 font-heading leading-snug">
              Membangun Solusi Digital dengan <span className="text-[#38bdf8]">Presisi</span>, Clean Code &amp; Eksplorasi Tanpa Batas.
            </h3>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
              {personalData.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Elegant Minimalist Metadata Grid (Not a boring standard table) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metadataItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-[#070b14]/70 border border-white/[0.07] hover:border-[#2c67ed]/40 transition-all hover:bg-[#0c1630]/60 group"
                  >
                    <div className="flex items-center gap-2.5 text-slate-400 text-xs font-mono mb-1">
                      <Icon size={14} className="text-[#38bdf8] group-hover:text-[#2c67ed] transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    <div className="text-sm font-medium text-white group-hover:text-slate-100 transition-colors">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
