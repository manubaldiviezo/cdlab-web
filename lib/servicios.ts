export type Categoria =
  | "Control de salud general"
  | "Bioquímica"
  | "Hematología"
  | "Hormonal"
  | "Pediátrico"
  | "Ortomolecular";

export interface ServicioItem {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  precio: number | null;
  incluye?: string[];
}

export const PAQUETE_DESTACADO_ID = "perfil-cardiaco";

export const ordenCategorias: Categoria[] = [
  "Control de salud general",
  "Bioquímica",
  "Hematología",
  "Hormonal",
  "Pediátrico",
  "Ortomolecular",
];

export const descripcionCategoria: Record<Categoria, string> = {
  "Control de salud general": "Chequeos periódicos para prevenir y cuidar a tu familia.",
  "Bioquímica": "Perfiles bioquímicos generales para el control de tu salud.",
  "Hematología": "Análisis de sangre para un diagnóstico completo.",
  "Hormonal": "Pruebas hormonales para el seguimiento de tu bienestar.",
  "Pediátrico": "Análisis pensados para el cuidado de los más chicos.",
  "Ortomolecular": "Evaluaciones nutricionales y metabólicas avanzadas.",
};

export const servicios: ServicioItem[] = [
  {
    id: PAQUETE_DESTACADO_ID,
    nombre: "Paquete Perfil Cardíaco / Preventivo",
    descripcion:
      "Consulta médica completa + análisis de laboratorio esenciales, en un solo lugar.",
    categoria: "Control de salud general",
    precio: 150,
    incluye: ["Consulta médica completa", "Glucosa", "Triglicéridos", "Perfil lipídico"],
  },
  {
    id: "bioquimica-general",
    nombre: "Perfil bioquímico general",
    descripcion: descripcionCategoria["Bioquímica"],
    categoria: "Bioquímica",
    precio: null,
  },
  {
    id: "hematologia-general",
    nombre: "Hemograma / análisis de sangre general",
    descripcion: descripcionCategoria["Hematología"],
    categoria: "Hematología",
    precio: null,
  },
  {
    id: "hormonal-general",
    nombre: "Perfil hormonal",
    descripcion: descripcionCategoria["Hormonal"],
    categoria: "Hormonal",
    precio: null,
  },
  {
    id: "pediatrico-general",
    nombre: "Chequeo pediátrico",
    descripcion: descripcionCategoria["Pediátrico"],
    categoria: "Pediátrico",
    precio: null,
  },
  {
    id: "ortomolecular-general",
    nombre: "Evaluación ortomolecular",
    descripcion: descripcionCategoria["Ortomolecular"],
    categoria: "Ortomolecular",
    precio: null,
  },
];
