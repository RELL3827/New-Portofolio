import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Layers, 
  Wrench, 
  Sparkles, 
  Terminal, 
  CheckCircle, 
  FileCode, 
  Cpu, 
  GitBranch, 
  Layout, 
  Server, 
  Zap, 
  Palette 
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { techStackCategories } from '../data/portfolioData';

// Icon mapping helper
const iconMap = {
  Code: Code2,
  Palette: Palette,
  Zap: Zap,
  Layout: Layout,
  Sparkles: Sparkles,
  Server: Server,
  Layers: Layers,
  Database: Database,
  ArrowLeftRight: Server,
  GitBranch: GitBranch,
  Github: GithubIcon,
  Terminal: Terminal,
  Figma: Palette,
  Send: Zap
};

export default function TechStack() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="space-y-12">
      {techStackCategories.map((cat, catIdx) => (
        <div key={catIdx} className="space-y-5">
          {/* Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-white/[0.06]">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2c67ed]" />
              {cat.category}
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {cat.description}
            </span>
          </div>

          {/* Technology Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cat.skills.map((skill, sIdx) => {
              const IconComponent = iconMap[skill.icon] || Code2;
              const isHovered = hoveredSkill === `${catIdx}-${sIdx}`;

              return (
                <motion.div
                  key={sIdx}
                  onMouseEnter={() => setHoveredSkill(`${catIdx}-${sIdx}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 1.5,
                    transition: { duration: 0.2 } 
                  }}
                  className="relative p-5 rounded-2xl bg-[#060a15]/80 border border-white/[0.08] hover:border-[#2c67ed]/60 hover:bg-[#0a142c]/90 transition-all hover:shadow-[0_0_25px_rgba(44,103,237,0.3)] cursor-pointer group flex flex-col items-center text-center justify-between min-h-[140px]"
                  data-cursor="hover"
                >
                  {/* Technology Icon with Glow */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-2"
                    style={{
                      backgroundColor: `${skill.color}15`,
                      border: `1px solid ${skill.color}35`,
                      color: skill.color,
                      boxShadow: isHovered ? `0 0 20px ${skill.color}50` : 'none'
                    }}
                  >
                    <IconComponent size={24} />
                  </div>

                  {/* Technology Name */}
                  <div className="space-y-1 w-full">
                    <h4 className="text-sm font-semibold text-white font-heading group-hover:text-[#38bdf8] transition-colors">
                      {skill.name}
                    </h4>
                    <span className="inline-block text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                      {skill.tag}
                    </span>
                  </div>

                  {/* Tooltip Overlay */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#070b14] border border-[#2c67ed]/40 text-[#38bdf8] text-[10px] font-mono whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.6)] pointer-events-none z-20"
                    >
                      Proficiency: {skill.level}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
