import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChocolateCollection, ChocolateTheme } from './types';
import { Navbar } from './components/Navbar';
import { ChocolateSection } from './components/ChocolateSection';

const GRADIENTS: Record<ChocolateTheme, string> = {
  white: 'radial-gradient(circle at center, #FFF8EC 0%, #F4E8D0 45%, #B89D6A 100%)',
  dark: 'radial-gradient(circle at center, #6B4423 0%, #2A1810 50%, #080403 100%)',
  silk: 'radial-gradient(circle at center, #3B82F6 0%, #172554 45%, #020617 100%)',
  pista: 'radial-gradient(circle at center, #CDE8B5 0%, #567A36 45%, #13200B 100%)',
};

const COLLECTIONS: ChocolateCollection[] = [
  {
    id: 'white',
    type: 'white',
    watermark: 'WHITE',
    subtitle: 'Velvet Sweetness.\nPure Indulgence.',
    description:
      'Creamy white chocolate crafted with\nMadagascar vanilla and silky cocoa butter.\n\nSmooth, delicate, and irresistibly luxurious.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop',
    particleColors: ['#B89D6A', '#FFF8EC', '#F4E8D0', '#D4AF37'],
  },
  {
    id: 'dark',
    type: 'dark',
    watermark: 'DARK',
    subtitle: 'Bold. Intense.\nUnforgettable.',
    description:
      'Rich cocoa notes unfold into layers\nof depth and sophistication.\n\nCrafted for true chocolate connoisseurs.',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1200&auto=format&fit=crop',
    particleColors: ['#6B4423', '#2A1810', '#8B5A2B', '#D2691E'],
  },
  {
    id: 'silk',
    type: 'silk',
    watermark: 'SILK',
    subtitle: 'Wrapped In Elegance.\nCrafted For Desire.',
    description:
      'A luxurious milk chocolate experience\nwith velvety texture and unforgettable richness.\n\nThe definition of modern indulgence.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop',
    particleColors: ['#3B82F6', '#60A5FA', '#93C5FD', '#E0F2FE'],
  },
  {
    id: 'pista',
    type: 'pista',
    watermark: 'PISTA',
    subtitle: 'A Taste Of Luxury Nature.',
    description:
      'Premium roasted pistachios meet\nsmooth artisan chocolate in perfect harmony.\n\nNutty, creamy, and remarkably refined.',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=1200&auto=format&fit=crop',
    particleColors: ['#CDE8B5', '#567A36', '#84CC16', '#A3E635'],
  },
];

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ChocolateTheme>('white');

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
      {/* 3.2 Dynamic Global Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            className="w-full h-full"
            style={{ background: GRADIENTS[currentTheme] }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* 5.1 Dynamic Navbar */}
      <Navbar theme={currentTheme} />

      {/* Main Snap Container */}
      <main className="relative z-10 w-full">
        {COLLECTIONS.map((collection) => (
          <ChocolateSection
            key={collection.id}
            data={collection}
            onActive={setCurrentTheme}
          />
        ))}
      </main>
    </div>
  );
}
