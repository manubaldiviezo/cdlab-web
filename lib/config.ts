export const siteConfig = {
  name: "CDLab",
  fullName: "CDLab · Laboratorio Clínico",
  city: "Yacuiba",
  address: "Calle Comercio, entre Cochabamba y Benemérito, Yacuiba, Bolivia",
  description:
    "Servicios integrales de laboratorio clínico en Yacuiba: análisis de sangre, perfiles bioquímicos, pruebas pediátricas, hormonales, ortomoleculares y de control de salud. Diagnósticos precisos y rápidos para cuidar tu salud con tranquilidad.",
  whatsapp: {
    number: "59173445061",
    display: "+591 73445061",
  },
} as const;

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.address
)}&output=embed`;
