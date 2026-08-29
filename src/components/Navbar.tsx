import React, { useState, useEffect } from 'react';
import { ChocolateTheme } from '../types';

interface NavbarProps {
  theme: ChocolateTheme;
}

export const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Light Themes: White, Pistachio -> Dark Brown (#2A1810)
  // Dark Themes: Dark, Silk -> White (#FFFFFF)
  const isLightTheme = theme === 'white' || theme === 'pista';
  const textColor = isLightTheme ? 'text-[#2A1810]' : 'text-white';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${
        isScrolled ? 'py-5' : 'py-8'
      }`}
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex items-center justify-between">
        <span
          className={`font-serif font-bold text-xl md:text-2xl tracking-[0.2em] transition-colors duration-200 pointer-events-auto select-none ${textColor}`}
        >
          CHÂTEAU
        </span>
      </div>
    </header>
  );
};
