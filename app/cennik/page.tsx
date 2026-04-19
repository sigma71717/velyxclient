'use client';

import React from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CheckCircle2, ShoppingCart, Clock, ShieldCheck, Infinity } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

const PricingCard = ({ title, price, description, features, icon: Icon, popular = false }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`relative bg-zinc-900/40 border ${popular ? 'border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]' : 'border-zinc-800'} p-8 rounded-[2.5rem] backdrop-blur-sm flex flex-col h-full group`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap z-10">
        Najlepsza Oferta
      </div>
    )}

    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
      <Icon size={30} />
    </div>

    <h3 className="text-xl font-bold text-zinc-400 mb-1">{title}</h3>
    <div className="flex flex-col mb-2">
      <span className="text-4xl font-black text-white italic">{price}</span>
      <span className="text-zinc-500 text-xs font-medium mt-1">{description}</span>
    </div>

    <div className="h-[1px] w-full bg-zinc-800 my-6" />

    <div className="space-y-4 mb-8 flex-grow">
      {features.map((feature: string, i: number) => (
        <div key={i} className="flex items-center gap-3 text-zinc-300">
          <CheckCircle2 size={18} className="text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" />
          <span className="text-sm font-medium">{feature}</span>
        </div>
      ))}
    </div>

    {/* Zmieniono button na Link do Discorda */}
    <Link 
      href="https://discord.gg/8GtSEw2A5A" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
        popular 
          ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
          : 'bg-zinc-800 text-white hover:bg-zinc-700'
      }`}
    >
      <ShoppingCart size={18} />
      Rozpocznij Teraz
    </Link>
  </motion.div>
);

export default function PricingPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white font-sans pt-32 px-4 flex flex-col items-center">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center text-center max-w-4xl mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 px-6 py-3 rounded-2xl mb-12 shadow-lg shadow-white/5"
        >
          <div className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse" />
          <p className="text-sm font-medium text-zinc-300 italic">Zainwestuj w swoje umiejętności</p>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent italic">
          Wybierz Swoją Subskrypcję
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          Zyskaj dostęp do najbardziej zaawansowanych systemów ułatwiających rozgrywkę i ciesz się dominacją na każdym serwerze Minecraft.
        </p>
      </section>

      {/* --- PRICING GRID --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-40">
        
        <PricingCard 
          title="Subskrypcja 1 Mieś."
          price="50.00 PLN"
          description="Opłata jednorazowa"
          icon={Clock}
          features={[
            "Dostęp do wszystkich wersji",
            "Pełna niewykrywalność",
            "Wszystkie moduły systemu",
            "Dostęp na 30 dni",
            "Ranga na Discordzie"
          ]}
        />

        <PricingCard 
          title="Subskrypcja 3 Mieś."
          price="80.00 PLN"
          description="Opłata jednorazowa"
          icon={ShieldCheck}
          popular={true}
          features={[
            "Dostęp do wszystkich wersji",
            "Pełna niewykrywalność",
            "Wszystkie moduły systemu",
            "Dostęp na 90 dni",
            "Priorytetowe Wsparcie",
            "Ranga na Discordzie"
          ]}
        />

        <PricingCard 
          title="Subskrypcja Lifetime"
          price="120.00 PLN"
          description="Opłata jednorazowa"
          icon={Infinity}
          features={[
            "Dostęp do wszystkich wersji",
            "Pełna niewykrywalność",
            "Wszystkie moduły systemu",
            "Dożywotni Dostęp",
            "Wsparcie 24/7",
            "Ranga na Discordzie"
          ]}
        />
      </section>

      <Footer />
    </main>
  );
}