import Image from "next/image";
import { CheckCircle2, XCircle, Frown, Smile } from "lucide-react";

const antes = [
  "Esperas largas y tenés que volver en persona a buscar tus resultados en papel.",
  "Atención fría e impersonal, sin claridad sobre cómo prepararte para un análisis o cómo leer tus resultados.",
];

const conCdlab = [
  "Resultados por WhatsApp, directo a tu celular.",
  "Próximamente: un portal web donde vas a poder ver tus resultados, y tu médico va a poder emitir y gestionar órdenes digitales.",
  "Atención humana: máxima precisión médica junto a un trato cercano, empático y familiar.",
];

export default function PorQueElegirnos() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-cdlab-green">
            Por qué elegirnos
          </span>
          <h2 className="mt-2 text-3xl font-bold text-cdlab-blue sm:text-4xl">
            Una forma distinta de cuidar tu salud
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/lab-analisis.png"
              alt="Análisis clínico realizado en el laboratorio de CDLab"
              width={2048}
              height={1536}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-500">
                <Frown className="h-5 w-5" />
                El laboratorio de siempre
              </h3>
              <ul className="space-y-3">
                {antes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-500">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-cdlab-green bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-cdlab-blue">
                <Smile className="h-5 w-5 text-cdlab-green" />
                Con CDLab
              </h3>
              <ul className="space-y-3">
                {conCdlab.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cdlab-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
