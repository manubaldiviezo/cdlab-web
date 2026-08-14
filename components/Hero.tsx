import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/config";

const GREETING = "Hola CDLab, quisiera más información sobre sus servicios.";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cdlab-blue pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(174,215,49,0.5), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-cdlab-green">
            Laboratorio Clínico en Yacuiba
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Diagnóstico preciso, rápido y confiable para cuidar tu salud
          </h1>
          <p className="mt-5 max-w-xl text-lg text-blue-100">
            En CDLab combinamos precisión médica y tecnología para que recibas
            resultados confiables a tiempo, prevengas enfermedades y tomes
            decisiones informadas sobre tu salud, con un trato cercano y
            profesional.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#cotizador"
              className="inline-flex items-center justify-center rounded-full bg-cdlab-green px-7 py-3.5 text-sm font-semibold text-cdlab-blue shadow-lg transition-transform hover:scale-105"
            >
              Cotizar ahora
            </a>
            <a
              href={buildWhatsAppLink(GREETING)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-cdlab-blue"
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/hero-recepcion.png"
              alt="Recepción moderna de CDLab, laboratorio clínico en Yacuiba"
              width={2048}
              height={1152}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
