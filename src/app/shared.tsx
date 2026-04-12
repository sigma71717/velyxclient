"use client";

import Link from "next/link";
import { useState } from "react";

export function SharedLayout({ title, subtitle, children, currentPath }: { title: string, subtitle: string, children: React.ReactNode, currentPath: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "Strona Główna", href: "/" },
    { name: "Cennik", href: "/pricing" },
    { name: "Funkcje", href: "/features" },
    { name: "Regulamin", href: "/tos" },
  ];

  return (
    <main className="min-h-screen">
      <div className="bg-brand-gradient py-2.5 px-4 text-center text-[10px] uppercase font-black tracking-[0.2em] text-white shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
        <a href="https://discord.gg/zynclient" target="_blank" rel="noopener noreferrer" className="relative hover:opacity-80 transition-opacity">🔥 PROMOCJA WIELKANOCNA -30% Z KODEM "ZYN30" 🔥</a>
      </div>
      
      <header className="sticky top-0 z-50 nav-blur border-b border-white/5 font-inter">
        <nav className="max-w-[1240px] mx-auto px-8 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <img 
              src="/favicon.ico" 
              alt="Zynt Logo" 
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-500"
            />
            <span className="text-2xl font-black tracking-tighter">
              Zynt
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className={`text-[11px] uppercase font-black tracking-[0.15em] transition-colors ${item.href === currentPath ? "text-purple-400" : "text-gray-500 hover:text-white"}`}>{item.name}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="btn-primary">Kup Teraz</Link>
          </div>
          <button className="md:hidden p-3 text-gray-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-[#0E0E10] border-b border-white/10 p-10 space-y-8 animate-premium">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className="block text-sm font-black tracking-widest text-gray-400 hover:text-purple-400 uppercase" onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/pricing" className="btn-primary w-full justify-center" onClick={() => setMobileMenuOpen(false)}>ZAKUP SUBSKRYPCJĘ</Link>
          </div>
        )}
      </header>
      
      <section className="relative pt-40 pb-32 px-6 overflow-hidden text-center bg-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10" />
        <div className="max-w-[1240px] mx-auto animate-premium font-inter">
          <h1 className="text-7xl md:text-[100px] font-black tracking-tighter mb-10 leading-tight">
             {title}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-[850px] mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>
      </section>
      
      <div className="pb-48 px-6 font-inter bg-transparent">
        <div className="max-w-[1240px] mx-auto">
          {children}
        </div>
      </div>
      
      <footer className="py-32 border-t border-white/5 text-center text-[11px] font-black uppercase tracking-[0.4em] text-gray-700 bg-transparent font-inter">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 px-8">
          <p>© 2026 Zyns Network. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-14 tracking-[0.2em]">
            <Link href="/" className="hover:text-purple-400 transition-colors">Start</Link>
            <Link href="/tos" className="hover:text-purple-400 transition-colors">Regulamin</Link>
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">Polityka</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ─── Features Page ───
export function FeaturesContent() {
  const categories = [
    { title: "OFFENSE", desc: "Zapanuj nad polem bitwy.", modules: ["KillAura (Vulcan)", "AimAssist", "Reach", "Criticals", "Velocity", "TriggerBot"] },
    { title: "MOVEMENT", desc: "Szybkość to przewaga.", modules: ["Flight (Intave)", "Speed (Grim)", "Scaffold", "Sprint", "Step", "NoFall"] },
    { title: "VISUALS", desc: "Wszystko pod kontrolą.", modules: ["ESP (Premium)", "Tracers", "XRay (Safe)", "NameTags", "Chams", "Tracers"] },
    { title: "UTILITIES", desc: "Automatyzacja gry.", modules: ["AutoEAT", "ChestStealer", "FastPlace", "AntiBot", "AutoArmor", "InvWalk"] }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      {categories.map((cat, i) => (
        <div key={i} className="premium-card p-14 group">
          <h2 className="text-4xl font-black mb-8 tracking-tighter text-brand-gradient italic group-hover:scale-105 transition-transform origin-left">
             {cat.title}
          </h2>
          <p className="text-gray-500 mb-12 text-lg font-medium">{cat.desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cat.modules.map(m => (
              <div key={m} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex justify-between items-center group/item hover:bg-purple-500/5 hover:border-purple-500/30 transition-all duration-300">
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover/item:text-white transition-colors">{m}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gradient shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ToS Content ───
export function ToSContent() {
  return (
    <div className="premium-card p-16 text-left space-y-16 max-w-[1000px] mx-auto border-t-4 border-t-purple-500">
      <div>
        <h2 className="text-3xl font-black text-white mb-8 italic tracking-tight">§1 Postanowienia Ogólne</h2>
        <p className="text-gray-400 leading-relaxed text-lg font-medium">Zyn Client to niezależne oprogramowanie. Akceptujesz zasady korzystając z usług.</p>
      </div>
      <div>
        <h2 className="text-3xl font-black text-white mb-8 italic tracking-tight">§2 Licencja i Zakup</h2>
        <p className="text-gray-400 leading-relaxed text-lg font-medium">Otrzymujesz licencję na użytkowanie oprogramowania. Brak możliwości zwrotu po otrzymaniu dostępu.</p>
      </div>
      <div className="text-[11px] font-black uppercase text-gray-700 tracking-[0.5em] pt-14 text-center border-t border-white/5">Ostatnia Aktualizacja: 12 Kwietnia 2026</div>
    </div>
  );
}

// ─── Privacy Content ───
export function PrivacyContent() {
  return (
    <div className="premium-card p-16 text-left space-y-16 max-w-[1000px] mx-auto border-t-4 border-t-purple-500">
       <div>
        <h2 className="text-3xl font-black text-white mb-8 italic tracking-tight">Twoja Prywatność</h2>
        <p className="text-gray-400 leading-relaxed text-lg font-medium">Przechowujemy jedynie niezbędne dane: HWID (skrót sprzętowy), login oraz ID Discord w celu weryfikacji aktywnej subskrypcji.</p>
      </div>
      <div>
        <h2 className="text-3xl font-black text-white mb-8 italic tracking-tight">Przechowywanie Danych</h2>
        <p className="text-gray-400 leading-relaxed text-lg font-medium">Dane są szyfrowane (AES-256) i nigdy nie przekazywane osobom trzecim. Możesz poprosić o ich usunięcie w każdym momencie przez Support.</p>
      </div>
    </div>
  );
}
