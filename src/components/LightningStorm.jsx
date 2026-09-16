import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

function buildSeededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildBolt(seed, [top, bottom]) {
  const rand = buildSeededRng(seed);
  const trunk = [];
  const segments = 6;
  let x = 8 + rand() * 84;
  const stepY = (bottom - top) / segments;
  const maxDrift = 7 + rand() * 10;
  let y = top;

  for (let i = 0; i <= segments; i++) {
    if (i > 0) {
      x += (rand() - 0.5) * 2 * maxDrift * (0.5 + (i / segments) * 1.5);
      x = Math.min(95, Math.max(5, x));
    }
    y = top + i * stepY;
    trunk.push([x, y]);
  }

  let d = trunk
    .map((p, i) => (i === 0 ? `M ${p[0].toFixed(2)} ${p[1].toFixed(2)}` : `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`))
    .join(' ');

  const branches = 1 + Math.floor(rand() * 2);
  for (let b = 0; b < branches; b++) {
    const idx = 2 + Math.floor(rand() * (segments - 3));
    const [bx, by] = trunk[idx];
    const len = 8 + rand() * 20;
    const angle = (rand() - 0.6) * Math.PI * 0.8 + (rand() > 0.5 ? Math.PI : 0);
    let ex = bx + Math.cos(angle) * len;
    let ey = by + Math.sin(angle) * len;
    if (ey < top) ey = by + 4;
    ex = Math.min(98, Math.max(2, ex));
    d += ` M ${bx.toFixed(2)} ${by.toFixed(2)} L ${ex.toFixed(2)} ${ey.toFixed(2)}`;
  }

  return { d, big: rand() > 0.6 };
}

function buildFrame(frameIndex, boltsPerFrame) {
  const rand = buildSeededRng(104729 + frameIndex * 38833);
  const items = [];
  for (let i = 0; i < boltsPerFrame; i++) {
    const top = -(rand() * 14);
    const bottom = 88 + rand() * 12;
    const bolt = buildBolt(7919 + frameIndex * 9091 + i * 131, [top, bottom]);
    items.push(bolt);
  }
  return items;
}

const FLASH_KEYFRAMES = [0, 0.1, 0, 0.02, 0.3, 0, 0.05, 0.18, 0, 0.5, 0, 0.07, 0, 0.25, 0, 0, 0.12, 0, 0.4, 0];

export default function LightningStorm({ frames = 4, boltsPerFrame = 5, flash = true }) {
  const layers = useMemo(
    () =>
      Array.from({ length: frames }, (_, i) => ({
        id: i,
        bolts: buildFrame(i, boltsPerFrame),
        opacities: i % 2 === 0
          ? [0, 1, 0, 0, 0.65, 0, 1, 0, 0.3, 0]
          : [0, 0.7, 0, 1, 0, 0, 0.9, 0, 1, 0],
        duration: 2.3 + (i % 3) * 0.45,
        delay: i * 0.28,
      })),
    [frames, boltsPerFrame]
  );

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      aria-hidden
    >
      {flash && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-sky-200/40 via-[#38bdf8]/25 to-transparent mix-blend-screen"
          animate={{ opacity: FLASH_KEYFRAMES }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {layers.map((layer) => (
        <motion.div
          key={layer.id}
          className="absolute inset-0"
          style={{ willChange: 'opacity', filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.35))' }}
          animate={{ opacity: layer.opacities }}
          transition={{
            duration: layer.duration,
            delay: layer.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id={`bolt-glow-${layer.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {layer.bolts.map((b, j) => (
              <g key={j}>
                <path
                  d={b.d}
                  fill="none"
                  stroke={b.big ? '#bae6fd' : '#7dd3fc'}
                  strokeWidth="1.1"
                  vectorEffect="non-scaling-stroke"
                  filter={`url(#bolt-glow-${layer.id})`}
                />
                <path
                  d={b.d}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}