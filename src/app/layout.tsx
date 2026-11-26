import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAGWAR Performance & Growth — Assessoria para E-commerces de Moda",
  description:
    "Atraímos seus clientes para suas plataformas e otimizamos a jornada de compra de ponta a ponta para comprovar o ROI.",
  icons: {
    icon: "/images/logos-jagwar/favicon.png",
    shortcut: "/images/logos-jagwar/favicon.png",
    apple: "/images/logos-jagwar/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
