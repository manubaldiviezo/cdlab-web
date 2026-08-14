import {
  FlaskConical,
  Droplets,
  Activity,
  Baby,
  Leaf,
  HeartPulse,
  Check,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  servicios,
  ordenCategorias,
  descripcionCategoria,
  PAQUETE_DESTACADO_ID,
  type Categoria,
} from "@/lib/servicios";
import { buildWhatsAppLink } from "@/lib/config";

const iconMap: Record<Categoria, LucideIcon> = {
  "Control de salud general": HeartPulse,
  Bioquímica: FlaskConical,
  Hematología: Droplets,
  Hormonal: Activity,
  Pediátrico: Baby,
  Ortomolecular: Leaf,
};

const paquete = servicios.find((s) => s.id === PAQUETE_DESTACADO_ID);
const paqueteTexto = paquete?.precio != null ? `Bs ${paquete.precio}` : "Precio a confirmar";

export default function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-cdlab-green">
            Servicios
          </span>
          <h2 className="mt-2 text-3xl font-bold text-cdlab-blue sm:text-4xl">
            Análisis clínicos integrales
          </h2>
          <p className="mt-3 text-slate-600">
            Cubrimos las principales áreas del diagnóstico clínico con la misma
            precisión y calidez en cada estudio.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ordenCategorias.map((categoria) => {
            const Icon = iconMap[categoria];
            return (
              <div
                key={categoria}
                className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cdlab-blue text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-cdlab-blue">{categoria}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-500">
                  {descripcionCategoria[categoria]}
                </p>
                <a
                  href="#cotizador"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cdlab-blue hover:text-cdlab-green"
                >
                  Cotizalo <span aria-hidden="true">→</span>
                </a>
              </div>
            );
          })}
        </div>

        {paquete ? (
          <div className="mt-10 overflow-hidden rounded-3xl bg-cdlab-blue">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-5 lg:items-center lg:p-12">
              <div className="lg:col-span-3">
                <span className="inline-block rounded-full bg-cdlab-green px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-cdlab-blue">
                  Promoción destacada
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  {paquete.nombre}
                </h3>
                <p className="mt-2 text-blue-100">{paquete.descripcion}</p>
                {paquete.incluye ? (
                  <ul className="mt-5 space-y-2">
                    {paquete.incluye.map((inc) => (
                      <li key={inc} className="flex items-center gap-2 text-sm text-white">
                        <Check className="h-4 w-4 flex-shrink-0 text-cdlab-green" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ul className="mt-5 grid gap-2 text-sm text-blue-100 sm:grid-cols-2">
                  <li>Diagnóstico preventivo accesible</li>
                  <li>Atención médica + laboratorio en un solo lugar</li>
                  <li>Ambiente cómodo</li>
                  <li>Entrega rápida</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-6 text-center shadow-xl lg:col-span-2">
                <p className="text-sm font-medium text-slate-500">Precio del paquete</p>
                <p className="mt-1 text-5xl font-extrabold text-cdlab-blue">{paqueteTexto}</p>
                <a
                  href={buildWhatsAppLink(
                    `Hola CDLab, quiero reservar el ${paquete.nombre} (${paqueteTexto}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cdlab-green px-6 py-3 text-sm font-semibold text-cdlab-blue transition-transform hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" />
                  Reservar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
