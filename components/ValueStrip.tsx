import { MessageCircle, HeartHandshake, Building2, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueProp {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: ValueProp[] = [
  {
    icon: MessageCircle,
    title: "Resultados por WhatsApp",
    description: "Recibí tus resultados directo en tu celular, sin filas ni esperas.",
  },
  {
    icon: HeartHandshake,
    title: "Atención cercana",
    description: "Un trato profesional, cálido y humano en cada visita.",
  },
  {
    icon: Building2,
    title: "Ambiente moderno",
    description: "Instalaciones modernas y cómodas, pensadas para tu bienestar.",
  },
  {
    icon: MapPin,
    title: "Ubicación estratégica en Yacuiba",
    description: "Fácil de encontrar, en pleno centro de la ciudad.",
  },
];

export default function ValueStrip() {
  return (
    <section className="border-b border-slate-100 bg-white py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cdlab-blue/10 text-cdlab-blue">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-cdlab-blue">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
