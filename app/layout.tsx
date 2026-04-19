// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZyntClient - Osiągnij Limit Możliwości",
  description: "Najbardziej zaawansowany klient do Minecraft. Niewykrywalne moduły, błyskawiczne aktualizacje i design, który inspiruje do zwycięstwa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Zmieniono bg-violet-50 na bg-black, aby pasowało do mrocznego stylu klienta */}
      <body className="min-h-full flex flex-col bg-black selection:bg-white/10 selection:text-white">
        
        {/* Kontener główny dla stron */}
        {children}
        
      </body>
    </html>
  );
}