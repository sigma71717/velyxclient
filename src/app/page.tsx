"use client";

import Link from "next/link";
import { useState } from "react";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="premium-card overflow-hidden mb-4 border-l-0 hover:border-l-4 hover:border-l-purple-500 transition-all duration-300">
      <button
        className="w-full text-left p-8 flex justify-between items-center hover:bg-white/[0.02] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-bold text-gray-200 tracking-tight">{q}</span>
        <svg
          className={`w-6 h-6 text-purple-500 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-8 pb-8 text-gray-400 text-sm leading-relaxed animate-premium font-medium">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
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
      <div className="bg-brand-gradient py-2.5 px-4 text-center text-[10px] uppercase font-black tracking-[0.2em] text-white shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
        <a href="https://discord.gg/zynclient" target="_blank" rel="noopener noreferrer" className="relative hover:opacity-80 transition-opacity">
          🔥 PROMOCJA WIELKANOCNA -30% Z KODEM "ZYN30" 🔥
        </a>
      </div>

      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 nav-blur border-b border-white/5 font-inter">
        <nav className="max-w-[1240px] mx-auto px-8 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center font-black text-sm text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:rotate-12 transition-transform duration-500">
              ZN
            </div>
            <span className="text-2xl font-black tracking-tighter">
              Zyn <span className="text-brand-gradient">Client</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[11px] uppercase font-black tracking-[0.15em] text-gray-500 hover:text-purple-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="btn-primary">
              Dołącz Teraz
            </Link>
          </div>

          <button
            className="md:hidden p-3 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-[#0E0E10] border-b border-white/10 p-10 space-y-8 animate-premium shadow-2xl">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className="block text-sm font-black tracking-[0.2em] text-gray-400 hover:text-purple-400 uppercase transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/pricing" className="btn-primary w-full justify-center text-center py-5" onClick={() => setMobileMenuOpen(false)}>ZAKUP SUBSKRYPCJĘ</Link>
          </div>
        )}
      </header>

      {/* ── Hero Section ── */}
      <section className="relative pt-40 pb-56 px-6 overflow-hidden bg-transparent">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />

        <div className="max-w-[1240px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] uppercase font-black tracking-[0.3em] mb-14 animate-premium shadow-2xl hover:border-purple-500/30 transition-colors cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Ponad 12,000 Klientów zaufało Zyn
          </div>

          <h1 className="text-7xl md:text-[120px] font-black tracking-tighter mb-12 leading-[0.85] animate-premium drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            Osiągnij <span className="font-script text-purple-400 px-8 inline-block -rotate-12 translate-y-[-20px] drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">Limit</span> Możliwości
          </h1>

          <p className="text-gray-400 text-xl md:text-3xl max-w-[850px] mx-auto mb-20 leading-relaxed animate-premium font-medium text-balance" style={{ animationDelay: '0.1s' }}>
            Najbardziej zaawansowany klient do Minecraft. Niewykrywalne moduły, błyskawiczne aktualizacje i design, który inspiruje do zwycięstwa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-premium" style={{ animationDelay: '0.2s' }}>
            <Link href="/pricing" className="btn-primary scale-110">
              Zakup Subskrypcję
            </Link>
            <Link href="/features" className="btn-secondary scale-110">
              Moduły Klienta
            </Link>
          </div>
        </div>
      </section>

      {/* ── Server Carousel ── */}
      <section className="py-28 border-y border-white/5 overflow-hidden bg-transparent">
        <div className="animate-carousel flex items-center gap-40 px-10">
          {[
            "DonutSMP", "MineStar", "ClearMC", "RapyGG", "Anarchia", "Hypixel",
            "DonutSMP", "MineStar", "ClearMC", "RapyGG", "Anarchia", "Hypixel"
          ].map((server, i) => (
            <span key={i} className="text-5xl font-black text-white/[0.04] whitespace-nowrap tracking-tighter uppercase italic pointer-events-none hover:text-purple-500/20 transition-colors duration-700">
              {server}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="section-spacing border-b border-white/5 bg-transparent">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-24">
          {[
            { v: "12,401", l: "Aktywnych Licencji" },
            { v: "2,390", l: "Użytkowników Online" },
            { v: "24/7", l: "Wsparcie Techniczne" }
          ].map((stat, i) => (
            <div key={i} className="text-center animate-premium" style={{ animationDelay: `${i * 0.1}s` }}>
              <h3 className="text-7xl font-black mb-5 text-brand-gradient tracking-tight drop-shadow-[0_10px_30px_rgba(168,85,247,0.4)]">{stat.v}</h3>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500">{stat.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Performance Values ── */}
      <section className="section-spacing px-6 bg-transparent relative">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            {
              t: "Elite Detection Bypass",
              d: "Przełamujemy granice wykrywalności. Nasze autorskie algorytmy omijają najbardziej zaawansowane AntyCheaty (Vulcan, Intave, Grim).",
              icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            },
            {
              t: "Zero Latency Boost",
              d: "Zyn nie obciąża Twojego sprzętu. Kod napisany w sposób ultra-wydajny zapewnia więcej FPS niż czysta gra.",
              icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            },
            {
              t: "Global Updates 24/7",
              d: "Nowe funkcje pojawiają się automatycznie w Twoim launcherze. Nigdy nie zostajesz w tyle za konkurencją.",
              icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
          ].map((val, i) => (
            <div key={i} className="premium-card p-14 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] -z-10 group-hover:bg-purple-500/10 transition-all duration-700" />
              <div className="w-20 h-20 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-brand-gradient group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-700">
                <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-purple-400 group-hover:text-white transition-colors duration-700">
                  {val.icon}
                </svg>
              </div>
              <h3 className="text-3xl font-black mb-5 tracking-tight group-hover:text-purple-400 transition-colors uppercase italic">{val.t}</h3>
              <p className="text-gray-500 leading-relaxed text-base font-medium group-hover:text-gray-400 transition-colors">
                {val.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Updates / Changelog ── */}
      <section className="section-spacing px-6 bg-transparent">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-36">
            <h2 className="text-6xl font-black mb-6 tracking-tight italic uppercase underline decoration-purple-500/50 underline-offset-8">Wersja v1.0</h2>
            <p className="text-gray-600 uppercase font-black text-[12px] tracking-[0.5em]">Pierwsze oficjalne wydanie Zyn Client</p>
          </div>

          <div className="space-y-24">
            {[
              {
                version: "Wersja 1.0.0", date: "nedługo", tag: "OFFICIAL RELEASE",
                changes: ["Oficjalne wydanie Zyn Client", "Ładne click ui oraz hud", "Dobre beypasy", "wsparcie dla wersji 1.21.4"]
              }
            ].map((update, i) => (
                  <div key={i} className="flex gap-12 md:gap-24 items-start animate-premium">
                    <div className="flex flex-col items-center pt-3">
                      <div className="w-6 h-6 rounded-full bg-brand-gradient shadow-[0_0_20px_rgba(168,85,247,0.6)] border-[4px] border-[#0E0E10]" />
                      <div className="flex-1 w-px bg-purple-500/10 my-8 shadow-[0_0_10px_purple]" />
                    </div>
                    <div className="flex-1 pb-24 border-b border-white/5 last:border-0 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-8 mb-12">
                        <h4 className="text-4xl font-black tracking-tighter uppercase italic">{update.version}</h4>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">{update.date}</span>
                        {update.tag && (
                          <span className="px-6 py-2 rounded-xl text-[10px] uppercase font-black tracking-[0.3em] bg-white text-[#0E0E10] shadow-[0_0_20px_white/20]">
                            {update.tag}
                          </span>
                        )}
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7">
                        {update.changes.map((change, j) => (
                          <li key={j} className="flex items-center gap-5 text-gray-500 text-base font-bold hover:text-purple-300 transition-colors group">
                            <span className="w-2.5 h-2.5 rounded-sm rotate-45 bg-purple-500 group-hover:scale-125 transition-transform" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section id="features" className="section-spacing px-6 bg-transparent">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-40">
            <h2 className="text-6xl font-black mb-8 tracking-tight">Potęga Kontroli</h2>
            <p className="text-gray-600 uppercase font-black text-[11px] tracking-[0.5em]">Moduły zaprojektowane do dominacji</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { cat: "OFFENSE", items: ["KillAura (Intave)", "AimAssist", "TriggerBot", "Criticals", "TPAura", "Velocity"] },
              { cat: "MOVEMENT", items: ["Fly (Vulcan)", "Speed (Grim)", "Scaffold", "Step", "NoFall", "InventoryWalk"] },
              { cat: "VISUALS", items: ["ESP (Full)", "Tracers", "XRay", "NameTags (3D)", "Chams", "Breadcrumbs"] },
              { cat: "MISC", items: ["AutoEAT", "ChestStealer", "AutoArmor", "SkinStealer", "FastPlace", "AntiBot"] }
            ].map((section) => (
              <div key={section.cat} className="animate-premium">
                <h3 className="text-xs uppercase font-black tracking-[0.5em] text-purple-500/60 mb-14 flex items-center gap-5">
                  <span className="w-10 h-px bg-purple-500/20" />
                  {section.cat}
                </h3>
                <div className="space-y-5">
                  {section.items.map((f) => (
                    <div key={f} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/50 transition-all duration-500 group hover:translate-x-2 hover:bg-purple-500/5 cursor-pointer">
                      <span className="text-[11px] uppercase font-black tracking-[0.15em] text-gray-500 group-hover:text-white transition-colors">{f}</span>
                      <div className="w-12 h-6 rounded-full bg-white/5 flex items-center px-1.5 border border-white/5 group-hover:border-purple-500/40">
                        <div className="w-4 h-4 rounded-full bg-brand-gradient shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing px-6 bg-transparent">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-[70px] font-black mb-8 tracking-tighter">MASZ <span className="text-brand-gradient italic">PYTANIA?</span></h2>
            <p className="text-gray-600 uppercase font-black text-[11px] tracking-[0.5em]">Prawdopodobnie mamy na nie odpowiedź</p>
          </div>
          <div className="space-y-6">
            <FaqItem q="Jakie są dostępne metody płatności?" a="Przyjmujemy płatności za pomocą PayPal, Przelewu (Instant), BLIK oraz wszystkich kart płatniczych (Stripe)." />
            <FaqItem q="Gdzie pobiorę launcher Zyn Client?" a="Po zakupieniu subskrypcji otrzymasz dostęp do panelu klienta na naszym Discordzie, skąd pobierzesz zaszyfrowany launcher." />
            <FaqItem q="Dostanę bana na Hypixelu?" a="Nasze configi są testowane codziennie. Używając ustawień 'Semi-Legit' ryzyko bana na Hypixelu wynosi praktycznie zero." />
            <FaqItem q="Czy moje dane są bezpieczne?" a="Przechowujemy jedynie minimum danych (HWID, Discord ID). Wszystkie połączenia są szyfrowane metodą AES-256." />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-40 px-6 border-t border-white/5 bg-transparent font-inter">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-32 font-inter">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-5 mb-12 group">
              <div className="w-16 h-16 rounded-3xl bg-brand-gradient flex items-center justify-center font-black text-sm text-white shadow-3xl group-hover:rotate-[360deg] transition-transform duration-1000">ZN</div>
              <span className="text-3xl font-black tracking-tighter">Zyn <span className="text-brand-gradient">Client</span></span>
            </Link>
            <p className="text-gray-500 text-xl max-w-sm leading-relaxed font-bold italic">
              Zapewniamy przewagę, której potrzebujesz, by stać się niepokonanym. To nie jest tylko klient, to standard.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase font-black tracking-[0.5em] text-white mb-12">Nawigacja</h4>
            <ul className="space-y-7 text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
              <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Cennik</Link></li>
              <li><Link href="/features" className="hover:text-purple-400 transition-colors">Lista Modułów</Link></li>
              <li><Link href="https://discord.gg/zynclient" className="hover:text-purple-400 transition-colors">Discord Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase font-black tracking-[0.5em] text-white mb-12">Informacje</h4>
            <ul className="space-y-7 text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
              <li><Link href="/tos" className="hover:text-purple-400 transition-colors">Regulamin</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Polityka Prywatności</Link></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors text-white/20 pointer-events-none">Status Serwerów</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[11px] uppercase font-black tracking-[0.4em] text-gray-700">
          <p>© 2026 Zyn Client Network. Wszystkie prawa zastrzeżone.</p>
          <p className="opacity-50 hover:opacity-100 transition-opacity cursor-default">Crafted with precision for the elite.</p>
        </div>
      </footer>
    </main>
  );
}
