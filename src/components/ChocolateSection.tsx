import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChocolateCollection, ChocolateTheme } from '../types';
import { ParticleSystem } from './ParticleSystem';

interface ChocolateSectionProps {
  data: ChocolateCollection;
  onActive: (theme: ChocolateTheme) => void;
}

export const ChocolateSection: React.FC<ChocolateSectionProps> = ({ data, onActive }) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
  });

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (inView) {
      onActive(data.type);
    }
  }, [inView, data.type, onActive]);

  // 3D Parallax Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isLightTheme = data.type === 'white' || data.type === 'pista';
  const textColor = isLightTheme ? 'text-[#2A1810]' : 'text-white';
  const watermarkColor = isLightTheme ? 'text-[#2A1810]' : 'text-white';

  return (
    <section
      ref={(el) => {
        inViewRef(el);
        sectionRef.current = el;
      }}
      id={data.id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100dvh] snap-start flex items-center justify-center overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Background Particles System */}
      <ParticleSystem colors={data.particleColors} />

      {/* Layer 1: Massive Background Text Watermark */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 ${watermarkColor}`}
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 0.08, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{
          duration: 1.5,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span className="font-serif font-black text-[35vw] md:text-[25vw] leading-none tracking-[-0.08em] uppercase whitespace-nowrap">
          {data.watermark}
        </span>
      </motion.div>

      {/* Rigid Split Layout Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 max-w-[1400px] w-full h-full mx-auto px-6 md:px-12">
        
        {/* Layer 2: Left Side - Chocolate Product Image */}
        <div className="w-full md:w-1/2 h-full flex items-end justify-center md:justify-start">
          <motion.div
            className="relative flex items-end justify-center w-full h-full transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              rotateX,
              rotateY,
            }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          >
            {/* Nested Infinite Floating Div */}
            <motion.div
              className="flex items-end justify-center"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src={data.image}
                alt={data.watermark}
                className="h-[70vh] md:h-[100vh] w-auto max-w-none object-contain drop-shadow-2xl translate-y-12 md:translate-y-28 select-none pointer-events-none"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Layer 3: Right Side - Typography Content Block */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center pb-24 md:pb-0 z-20">
          <motion.div
            className={`flex flex-col items-start space-y-6 ${textColor}`}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-lg whitespace-pre-line">
              {data.subtitle}
            </h2>
            <p className="font-sans font-light text-base md:text-lg leading-relaxed drop-shadow-md opacity-90 whitespace-pre-line max-w-lg">
              {data.description}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
