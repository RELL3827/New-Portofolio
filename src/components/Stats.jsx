import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { statsData } from '../data/portfolioData';
import { Activity, Compass, Cpu, Sparkles } from 'lucide-react';

function CounterItem({ targetValue, suffix, label, description, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const increment = targetValue / (duration / 25);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  const icons = [Cpu, Activity, Compass, Sparkles];
  const Icon = icons[index % icons.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative p-6 sm:p-7 rounded-2xl bg-[#060a15]/80 backdrop-blur-md border border-white/[0.08] hover:border-[#2c67ed]/40 transition-all hover:bg-[#091226]/80 group overflow-hidden"
    >
      {/* Subtle Top-Right Ambient Corner Light */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#2c67ed]/10 rounded-bl-full pointer-events-none group-hover:bg-[#2c67ed]/20 transition-all blur-xl" />

      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#2c67ed]/15 border border-[#2c67ed]/30 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform">
          <Icon size={18} />
        </div>
        <span className="text-[10px] font-mono text-slate-500">0{index + 1} // METRIC</span>
      </div>

      {/* Large Count-up Number */}
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl sm:text-5xl font-bold font-heading text-white tracking-tight">
          {count}
        </span>
        <span className="text-2xl sm:text-3xl font-bold font-heading text-[#38bdf8]">
          {suffix}
        </span>
      </div>

      {/* Label and Sub-description */}
      <h4 className="text-sm font-semibold text-slate-200 font-heading mb-1">
        {label}
      </h4>
      <p className="text-xs text-slate-400 font-light">
        {description}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Asymmetric Telemetry Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c67ed]/10 border border-[#2c67ed]/30 text-[#38bdf8] text-xs font-mono mb-2">
              <Activity size={12} />
              <span>Telemetry &amp; Growth</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Project <span className="text-[#38bdf8]">Statistics</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-sm">
            Evolusi berkelanjutan melalui coding praktis, pemecahan masalah, dan dedikasi arsitektur software.
          </p>
        </div>

        {/* Telemetry Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsData.map((stat, index) => (
            <CounterItem
              key={index}
              targetValue={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
