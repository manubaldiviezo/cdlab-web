import { MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { siteConfig, buildWhatsAppLink, mapsEmbedSrc } from "@/lib/config";

export default function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-24 bg-cdlab-blue py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-cdlab-green">
            Contacto
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Te esperamos en CDLab
          </h2>
          <p className="mt-3 text-blue-100">
            Escribinos por WhatsApp o visitanos en nuestra sede en Yacuiba.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-5">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-cdlab-green" />
              <div>
                <p className="font-semibold text-white">Dirección</p>
                <p className="text-sm text-blue-100">{siteConfig.address}</p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("Hola CDLab, quisiera más información.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-cdlab-green" />
              <div>
                <p className="font-semibold text-white">WhatsApp</p>
                <p className="text-sm text-blue-100">{siteConfig.whatsapp.display}</p>
              </div>
            </a>

            <a
              href={`tel:+${siteConfig.whatsapp.number}`}
              className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-cdlab-green" />
              <div>
                <p className="font-semibold text-white">Llamanos</p>
                <p className="text-sm text-blue-100">{siteConfig.whatsapp.display}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-5">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-cdlab-green" />
              <div>
                <p className="font-semibold text-white">Horarios de atención</p>
                <p className="text-sm text-blue-100">Consultanos por WhatsApp</p>
              </div>
            </div>
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-2xl shadow-xl">
            <iframe
              src={mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de CDLab en Yacuiba"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
