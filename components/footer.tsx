'use client';

import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-12 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-zinc-500 text-sm font-medium">
        <div className="flex items-center gap-3">
          <span>© {currentYear} ZyntClient. Wszelkie prawa zastrzeżone.</span>
        </div>
        <div className="hidden md:block w-[1px] h-4 bg-zinc-800" />
        <div className="flex items-center gap-1">
          <span>Developed by:</span>
          <a href="#" className="text-zinc-300 hover:text-white transition-colors font-semibold">
            MainStudio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;