import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParticleSystemProps {
  colors: string[];
}

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ colors }) => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px to 6px
      x: Math.random() * 100, // 0vw to 100vw
      y: Math.random() * 100, // 0vh to 100vh
      duration: Math.random() * 15 + 15, // 15s to 30s
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [colors]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
