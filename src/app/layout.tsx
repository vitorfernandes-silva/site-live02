import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAGWAR Performance & Growth — Assessoria para E-commerces de Moda",
  description:
    "Unimos inteligência de dados, criativos que geram desejo e otimização de funil para escalar lojas virtuais de moda feminina sem desperdício de verba.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
