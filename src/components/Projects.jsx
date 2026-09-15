import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, Maximize2, X, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData } from '../data/portfolioData';

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="space-y-16">
        {projectsData.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-3xl bg-[#060a15]/70 border border-white/[0.08] hover:border-[#2c67ed]/40 transition-all hover:bg-[#080e20]/80 group relative overflow-hidden`}
            >
              {/* Background Subtle Accent Glow */}
              <div 
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#2c67ed]/10 blur-3xl pointer-events-none group-hover:bg-[#2c67ed]/20 transition-all duration-700" 
              />

              {/* Project Image Preview Column (Asymmetric Alternating) */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div 
                  className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#2c67ed]/50 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                  onClick={() => setSelectedImage(project)}
                  data-cursor="hover"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} Preview - ${project.subtitle}`}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Hover Overlay with Zoom Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030509]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-[#070b14]/80 px-3 py-1.5 rounded-full border border-white/15">
                      <Maximize2 size={13} className="text-[#38bdf8]" /> Click to Inspect UI
                    </span>
                    <span className="text-xs font-mono text-[#38bdf8] bg-[#2c67ed]/25 px-2.5 py-1 rounded-full border border-[#2c67ed]/40">
                      {project.metrics}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Details Narrative Column */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-center text-left`}>
                {/* Category & Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-[#38bdf8] bg-[#2c67ed]/15 border border-[#2c67ed]/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles size={11} /> Featured
                    </span>
                  )}
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-1 group-hover:text-[#38bdf8] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-slate-400 mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: Live Demo & GitHub */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-200 hover:text-white flex items-center gap-2"
                    data-cursor="hover"
                    aria-label={`Source Code for ${project.title}`}
                  >
                    <GithubIcon size={15} />
                    <span>Source Code</span>
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-blue px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2"
                    data-cursor="hover"
                    aria-label={`Live Demo for ${project.title}`}
                  >
                    <span>Live Preview</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Modal Image Inspector */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden bg-[#070b14] border border-[#2c67ed]/40 shadow-[0_0_50px_rgba(44,103,237,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="p-4 bg-[#080e1e] border-b border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-heading font-bold text-base sm:text-lg">
                    {selectedImage.title}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    {selectedImage.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Inspector"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image */}
              <div className="p-4 sm:p-6 flex justify-center bg-[#030509]">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full max-h-[75vh] object-contain rounded-xl border border-white/10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
