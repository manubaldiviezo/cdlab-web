import Image from "next/image";
import { siteConfig, buildWhatsAppLink } from "@/lib/config";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#cotizador", label: "Cotizador" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#03335c] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <Image
              src="/images/logo-cdlab.png"
              alt="CDLab · Laboratorio Clínico"
              width={2659}
              height={1051}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-blue-100">{siteConfig.address}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-blue-100 hover:text-cdlab-green"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={buildWhatsAppLink("Hola CDLab, quisiera más información.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cdlab-green px-5 py-2.5 text-sm font-semibold text-cdlab-blue transition-transform hover:scale-105"
          >
            WhatsApp: {siteConfig.whatsapp.display}
          </a>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-blue-200">
          © {year} CDLab · Laboratorio Clínico. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
