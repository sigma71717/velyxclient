'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, Tag } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isAway, setIsAway] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // --- LOGIKA WYCHYLANIA (TILT) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsAway(true);
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 10) {
        setIsAway(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 perspective-[1000px]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isAway ? 45 : rotateX,
          rotateY: isAway ? -20 : rotateY,
        }}
        animate={isAway ? { 
          y: -200, 
          x: 150, 
          rotateZ: 20,
          opacity: 0, 
          scale: 0.5 
        } : { 
          y: 0, 
          x: 0, 
          rotateZ: 0,
          opacity: 1, 
          scale: 1 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 px-6 py-2.5 rounded-xl flex items-center gap-10 shadow-2xl shadow-black/50 cursor-crosshair will-change-transform"
      >
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
          <span className="text-white font-bold text-lg tracking-tight">ZyntClient</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Przycisk Strona główna */}
          <Link href="/">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${pathname === '/' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>
              <Home size={16} className={pathname === '/' ? 'text-zinc-400' : 'text-zinc-500'} />
              Strona główna
            </div>
          </Link>

          {/* Przycisk Cennik */}
          <Link href="/cennik">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${pathname === '/cennik' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>
              <Tag size={16} className={pathname === '/cennik' ? 'text-zinc-400' : 'text-zinc-500'} />
              Cennik
            </div>
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;