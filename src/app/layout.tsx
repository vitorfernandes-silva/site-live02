import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JAGWAR Performance & Growth | E-commerces de Moda Feminina",
  description:
    "Assessoria de tráfego pago e growth especializada em e-commerces de moda feminina. Inteligência de dados, criativos de alta conversão, CRO e CRM para escalar com previsibilidade.",
  keywords: [
    "tráfego pago moda feminina",
    "growth para e-commerce de moda",
    "assessoria e-commerce moda",
    "CRO moda",
    "Meta Ads moda feminina",
    "JAGWAR Performance & Growth",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${plusJakartaSans.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#0A0A09] text-[#F5F0E8] font-sans relative">
        {/* Subtle editorial grain texture */}
        <div
          aria-hidden="true"
          className="jagwar-grain pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        />
        {children}
      </body>
    </html>
  );
}
