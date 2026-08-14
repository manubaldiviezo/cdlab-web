"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/config";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#cotizador", label: "Cotizador" },
  { href: "#contacto", label: "Contacto" },
];

const GREETING = "Hola CDLab, quisiera más información sobre sus servicios.";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSection(href: string) {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cdlab-blue py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-lg bg-white px-2 py-1.5 shadow-sm"
          aria-label="Ir al inicio"
        >
          <Image
            src="/images/logo-cdlab.png"
            alt="CDLab · Laboratorio Clínico"
            width={1536}
            height={1024}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-sm font-semibold text-white transition-colors hover:text-cdlab-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={buildWhatsAppLink(GREETING)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-cdlab-green px-5 py-2.5 text-sm font-semibold text-cdlab-blue transition-transform hover:scale-105 md:inline-flex"
        >
          Escribinos por WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-white md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`overflow-hidden bg-cdlab-blue transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink(GREETING)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-cdlab-green px-5 py-3 text-sm font-semibold text-cdlab-blue"
          >
            Escribinos por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
