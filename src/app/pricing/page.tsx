"use client";

import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Strona Główna", href: "/" },
    { name: "Cennik", href: "/pricing" },
    { name: "Funkcje", href: "/features" },
    { name: "Regulamin", href: "/tos" },
  ];

  return (
    <main className="min-h-screen">
      
      {/* ── Top Banner ── */}
      <div className="bg-brand-gradient py-2 px-4 text-center text-[10px] uppercase font-bold tracking-[0.15em] text-[#0E0E10] shadow-lg">
        <a href="https://discord.gg/zynclient" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
          🎉 Dołącz do naszego Discorda! Kliknij tutaj
        </a>
      </div>

      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 nav-blur border-b border-white/5 font-inter">
        <nav className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center font-black text-xs text-[#0E0E10] shadow-[0_0_20px_rgba(185,180,251,0.3)]">
              ZN
            </div>
            <span className="text-xl font-bold tracking-tight">
              Zyn <span className="text-brand-gradient">Client</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`text-xs uppercase font-bold tracking-[0.1em] transition-colors ${item.name === "Cennik" ? "text-white" : "text-gray-500 hover:text-white"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-colors">Logowanie</Link>
          </div>

           <button 
            className="md:hidden p-2 text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#0E0E10] border-b border-white/5 p-8 space-y-6 animate-premium">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className="block text-sm font-bold tracking-widest text-gray-400 hover:text-white uppercase" onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/pricing" className="btn-primary w-full justify-center" onClick={() => setMobileMenuOpen(false)}>Kup Teraz</Link>
          </div>
        )}
      </header>

      {/* ── Pricing Hero ── */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden text-center bg-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-light/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-[1240px] mx-auto animate-premium font-inter">
          <h1 className="text-6xl md:text-[90px] font-black tracking-tight mb-8 leading-tight">
            Wybierz Swoją <span className="text-brand-gradient">Subskrypcję</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-[750px] mx-auto leading-relaxed font-medium">
            Zyskaj dostęp do najbardziej zaawansowanych systemów ułatwiających rozgrywkę i ciesz się dominacją na każdym serwerze Minecraft.
          </p>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="pb-40 px-6 font-inter bg-transparent">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {[
            { 
              name: "Subskrypcja 1 Mieś.", price: "50.00 PLN", tag: null,
              features: ["Dostęp do wszystkich wersji", "Pełna niewykrywalność", "Wszystkie moduły systemu", "Dostęp na 30 dni", "Ranga na Discordzie"]
            },
            { 
              name: "Subskrypcja 3 Mieś.", price: "80.00 PLN", tag: "Najlepsza Oferta",
              features: ["Dostęp do wszystkich wersji", "Pełna niewykrywalność", "Wszystkie moduły systemu", "Dostęp na 90 dni", "Priorytetowe Wsparcie", "Ranga na Discordzie"]
            },
            { 
              name: "Subskrypcja Lifetime", price: "120.00 PLN", tag: null,
              features: ["Dostęp do wszystkich wersji", "Pełna niewykrywalność", "Wszystkie moduły systemu", "Dożywotni Dostęp", "Wsparcie 24/7", "Ranga na Discordzie"]
            }
          ].map((plan, i) => (
            <div key={i} className="premium-card p-12 flex flex-col relative group overflow-hidden">
              {plan.tag && (
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient" />
              )}
              {plan.tag && (
                <div className="absolute top-10 right-[-35px] rotate-45 bg-brand-gradient px-12 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-[#0E0E10] shadow-xl">
                  {plan.tag}
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-5 group-hover:text-brand-light transition-colors">{plan.name}</h3>
                <div className="text-5xl font-black tracking-tight text-white mb-2">{plan.price}</div>
                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Opłata jednorazowa</div>
              </div>
              
              <ul className="space-y-6 mb-12 flex-1 border-t border-white/5 pt-12">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm font-medium text-gray-400 group-hover:translate-x-1 transition-transform">
                    <span className="w-5 h-5 rounded-full bg-brand-light/10 flex items-center justify-center border border-brand-light/20 text-brand-light text-[10px]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              
              <Link href="https://discord.gg/zynclient" className="btn-primary w-full justify-center py-4 uppercase font-black tracking-[0.2em] text-[10px]">
                Rozpocznij Teraz
              </Link>
            </div>
          ))}

        </div>
      </section>

      {/* ── Payments Info ── */}
      <section className="section-spacing border-t border-white/5 bg-transparent font-inter">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
          <h2 className="text-[10px] font-black mb-16 tracking-[0.4em] uppercase text-gray-500">Dostępne Metody Płatności</h2>
          <div className="flex flex-wrap justify-center gap-20 md:gap-32 opacity-20 filter grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
            {["PAYPAL", "BLIK", "PRZELEW", "PSC", "VISA", "MASTERCARD"].map((p) => (
              <span key={p} className="text-5xl font-black italic tracking-tighter cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-24 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-700 bg-transparent font-inter">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10 px-6">
          <p>© 2024-2026 Zyn Client. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-12 font-black uppercase text-[10px] tracking-[0.2em]">
            <Link href="/" className="hover:text-white transition-colors">Strona Główna</Link>
            <Link href="/tos" className="hover:text-white transition-colors">Regulamin</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Prywatność</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
