"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { JagwarLogo } from "./JagwarLogo";

const NAV_LINKS = [
  { label: "Método", href: "#metodo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Diagnóstico", href: "#diagnostico" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 border-b border-[rgba(239,228,212,0.15)] ${
        scrolled
          ? "bg-[#0A0A09]/95 backdrop-blur-md"
          : "bg-[#0A0A09]/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Left: Brand Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleAnchorClick(e, "#inicio")}
          aria-label="JAGWAR Performance & Growth — Início"
          className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C48F56]"
        >
          <JagwarLogo size="sm" />
        </a>

        {/* Center: Desktop Navigation */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_LINKS.map((item, idx) => (
            <React.Fragment key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="px-4 py-2 text-xs font-display font-normal uppercase tracking-[0.2em] text-[#A39B8F] transition-colors duration-200 hover:text-[#F5F0E8]"
              >
                {item.label}
              </a>
              {idx < NAV_LINKS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="h-3 w-px bg-[rgba(239,228,212,0.15)]"
                />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right: Desktop CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#diagnostico"
            onClick={(e) => handleAnchorClick(e, "#diagnostico")}
            className="hidden sm:inline-flex items-center justify-center rounded-sm border border-[#C48F56] px-5 py-2.5 text-xs font-display font-medium uppercase tracking-[0.14em] text-[#EFE4D4] transition-all duration-200 hover:bg-[#C48F56] hover:text-[#0A0A09]"
          >
            Agendar Diagnóstico
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[rgba(239,228,212,0.15)] text-[#F5F0E8] transition-colors hover:border-[#C48F56] hover:text-[#C48F56] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#0A0A09] ${
          mobileOpen
            ? "max-h-[420px] opacity-100 border-t border-b border-[rgba(239,228,212,0.15)]"
            : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <nav
          aria-label="Menu mobile"
          className="mx-auto flex max-w-[1200px] flex-col px-5 py-6 sm:px-8"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className="border-b border-[rgba(239,228,212,0.1)] py-4 text-xs font-display uppercase tracking-[0.22em] text-[#F5F0E8] transition-colors hover:text-[#C48F56]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#diagnostico"
            onClick={(e) => handleAnchorClick(e, "#diagnostico")}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-sm bg-[#C48F56] px-6 text-xs font-display font-semibold uppercase tracking-[0.14em] text-[#0A0A09] transition-colors hover:bg-[#D4A16A]"
          >
            Agendar Diagnóstico
          </a>
        </nav>
      </div>
    </header>
  );
}
