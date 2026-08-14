import { ShieldCheck, Award, Target, HeartHandshake, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Valor {
  icon: LucideIcon;
  label: string;
}

const valores: Valor[] = [
  { icon: ShieldCheck, label: "Confianza" },
  { icon: Award, label: "Profesionalismo" },
  { icon: Target, label: "Precisión médica" },
  { icon: HeartHandshake, label: "Empatía" },
  { icon: Users, label: "Cercanía familiar" },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-wide text-cdlab-green">
          Nosotros
        </span>
        <h2 className="mt-2 text-3xl font-bold text-cdlab-blue sm:text-4xl">
          Los valores que nos guían
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          En CDLab creemos que un buen diagnóstico empieza con un buen trato.
          Por eso, cada estudio que realizamos está guiado por estos
          principios.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {valores.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cdlab-blue text-white">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-cdlab-blue">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
