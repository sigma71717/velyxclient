'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Monitor, ShieldCheck, Zap, Globe, ChevronDown, HelpCircle } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// --- KOMPONENTY POMOCNICZE ---

// 1. Navbar (Lokalna wersja dla spójności skryptu)
import { Navbar } from "@/components/navbar";

// 2. Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-12 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-zinc-500 text-sm font-medium">
        <span>© {currentYear} ZyntClient. Wszelkie prawa zastrzeżone.</span>
        <div className="hidden md:block w-[1px] h-4 bg-zinc-800" />
        <div className="flex items-center gap-1">
          <span>Developed by:</span>
          <a href="#" className="text-zinc-300 hover:text-white transition-colors font-semibold">MainStudio</a>
        </div>
      </div>
    </footer>
  );
};

// 3. Licznik animowany
const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 80 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

// 4. Element FAQ
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800 w-full">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left group">
        <span className="text-xl font-semibold text-zinc-200 group-hover:text-white transition-colors">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-zinc-500"><ChevronDown size={24} /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 text-zinc-400 leading-relaxed text-lg max-w-3xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- GŁÓWNA STRONA ---

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-black text-white font-sans pt-32 px-4 flex flex-col items-center">
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center max-w-4xl">
        <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 px-6 py-3 rounded-2xl mb-16 shadow-lg shadow-white/5">
          <div className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse" />
          <p className="text-sm font-medium text-zinc-300">Osiągnij limit możliwości</p>
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent italic">
          ZyntClient
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl mb-12 font-light leading-relaxed max-w-2xl">
          Najbardziej zaawansowany klient do <span className="text-white font-semibold">Minecraft</span>. 
          Niewykrywalne moduły i design, który inspiruje do zwycięstwa.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 mb-20">
          <button className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <ShoppingCart size={20} /> Zakup subskrypcję
          </button>
          <button className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95">
            <Monitor size={20} /> Moduły klienta
          </button>
        </div>
      </section>

      {/* STATYSTYKI */}
      <section className="mt-[35vh] w-full max-w-5xl">
        <div className="text-center mb-20">
          <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Statystyki</h3>
          <div className="h-1.5 w-24 bg-zinc-800 mx-auto mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center p-10 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800/50">
            <div className="text-5xl md:text-6xl font-black mb-4 text-white tracking-tighter"><Counter value={12401} /></div>
            <span className="text-zinc-500 font-medium text-lg">Aktywnych Licencji</span>
          </div>
          <div className="flex flex-col items-center p-10 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800/50">
            <div className="text-5xl md:text-6xl font-black mb-4 text-white tracking-tighter"><Counter value={2390} /></div>
            <span className="text-zinc-500 font-medium text-lg">Użytkowników Online</span>
          </div>
          <div className="flex flex-col items-center p-10 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800/50">
            <div className="text-5xl md:text-6xl font-black mb-4 text-white tracking-tighter">24/7</div>
            <span className="text-zinc-500 font-medium text-lg">Wsparcie Techniczne</span>
          </div>
        </div>
      </section>

      {/* SERWERY POLECANE */}
      <section className="mt-[35vh] flex flex-col items-center w-full">
        <div className="text-center mb-20">
          <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Serwery polecane</h3>
          <div className="h-1.5 w-24 bg-zinc-800 mx-auto mt-6 rounded-full" />
        </div>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 px-4 text-zinc-500 font-bold text-2xl md:text-4xl">
          {["Hypixel", "RapyGG", "DonutSMP", "ClearMC"].map((srv) => (
            <span key={srv} className="hover:text-white transition-all duration-500 hover:scale-110 cursor-default hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">{srv}</span>
          ))}
        </div>
      </section>

      {/* CECHY (3 KWADRATY) */}
      <section className="mt-[40vh] grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <motion.div whileHover={{ y: -10 }} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-sm flex flex-col gap-6 group">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black transition-all duration-300"><ShieldCheck size={32} /></div>
          <h3 className="text-2xl font-bold text-white">Elite Detection Bypass</h3>
          <p className="text-zinc-400 leading-relaxed text-lg">Przełamujemy granice wykrywalności. Nasze autorskie algorytmy omijają najbardziej zaawansowane AntyCheaty <span className="text-zinc-200 font-medium">(Vulcan, Intave, Grim).</span></p>
        </motion.div>
        <motion.div whileHover={{ y: -10 }} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-sm flex flex-col gap-6 group">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black transition-all duration-300"><Zap size={32} /></div>
          <h3 className="text-2xl font-bold text-white">Zero Latency Boost</h3>
          <p className="text-zinc-400 leading-relaxed text-lg">Zyn nie obciąża Twojego sprzętu. Kod napisany w sposób ultra-wydajny zapewnia <span className="text-zinc-200 font-medium">więcej FPS</span> niż czysta gra.</p>
        </motion.div>
        <motion.div whileHover={{ y: -10 }} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-sm flex flex-col gap-6 group">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black transition-all duration-300"><Globe size={32} /></div>
          <h3 className="text-2xl font-bold text-white">Global Updates 24/7</h3>
          <p className="text-zinc-400 leading-relaxed text-lg">Nowe funkcje pojawiają się automatycznie w Twoim launcherze. Nigdy nie zostajesz <span className="text-zinc-200 font-medium">w tyle za konkurencją.</span></p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mt-[40vh] mb-40 w-full max-w-4xl px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-6"><HelpCircle size={32} /></div>
          <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tight">Masz pytania?</h3>
          <p className="text-zinc-500 mt-4 text-lg">Znajdź odpowiedzi na najczęściej zadawane pytania.</p>
        </div>
        <div className="flex flex-col">
          <FAQItem question="Jakie są dostępne metody płatności" answer="Przyjmujemy płatności za pomocą PayPal, Przelewu (Instant), BLIK oraz wszystkich kart płatniczych (Stripe)." />
          <FAQItem question="Gdzie pobiorę launcher" answer="Po zakupieniu subskrypcji otrzymasz dostęp do panelu klienta na naszym Discordzie, skąd pobierzesz zaszyfrowany launcher." />
          <FAQItem question="Czy dostanę bana na serwerze Hypixel" answer="Nasze configi są testowane codziennie. Używając ustawień 'Semi-Legit' ryzyko bana na Hypixelu wynosi praktycznie zero." />
          <FAQItem question="Czy dane są szyfrowane?" answer="Przechowujemy jedynie minimum danych (HWID, Discord ID). Wszystkie połączenia są szyfrowane metodą AES-256." />
        </div>
      </section>

      <Footer />
    </main>
  );
}