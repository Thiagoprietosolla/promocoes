import type { Metadata } from "next";
import { Rajdhani, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Radar de Promoções - Jogos de PC",
  description:
    "Acompanhe os menores preços em jogos de PC: Instant Gaming, Steam, Epic Games e GOG, atualizados todos os dias.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-bg text-text`}
      >
        {children}
      </body>
    </html>
  );
}
