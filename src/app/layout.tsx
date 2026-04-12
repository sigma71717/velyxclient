import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zyn Client | Undetectable Performance",
  description: "Zyn Client is the most advanced, undetectable and optimized client for Minecraft. Dominate every server with our premium modules.",
  keywords: ["Zyn Client", "Minecraft Client", "Cheats", "Hacks", "Undetectable", "Optimized", "Ventura Clone"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        {children}
      </body>
    </html>
  );
}
