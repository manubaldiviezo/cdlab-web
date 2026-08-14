"use client";

import { useMemo, useState } from "react";
import { Loader2, Download, MessageCircle } from "lucide-react";
import { servicios, ordenCategorias, descripcionCategoria } from "@/lib/servicios";
import { buildWhatsAppLink } from "@/lib/config";

function slugify(text: string): string {
  const base = text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
  return base || "paciente";
}

interface FormErrors {
  nombre?: string;
  telefono?: string;
  items?: string;
}

export default function Cotizador() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const selectedItems = useMemo(
    () => servicios.filter((s) => selected[s.id]),
    [selected]
  );
  const total = useMemo(
    () => selectedItems.reduce((sum, s) => sum + (s.precio ?? 0), 0),
    [selectedItems]
  );
  const hasNullPriced = selectedItems.some((s) => s.precio === null);
  const hasPriced = selectedItems.some((s) => s.precio !== null);

  function toggleItem(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!nombre.trim()) next.nombre = "Ingresá tu nombre completo.";
    if (!telefono.trim()) next.telefono = "Ingresá tu teléfono o WhatsApp.";
    if (selectedItems.length === 0) next.items = "Seleccioná al menos un estudio.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function buildResumen(): string {
    const lineas = [
      "Hola CDLab, quiero cotizar los siguientes estudios:",
      "",
      `Paciente: ${nombre}`,
      `Teléfono: ${telefono}`,
    ];
    if (comentario.trim()) lineas.push(`Comentario: ${comentario.trim()}`);
    lineas.push("", "Estudios seleccionados:");
    selectedItems.forEach((item) => {
      lineas.push(
        `- ${item.nombre}: ${item.precio !== null ? `Bs ${item.precio}` : "A confirmar"}`
      );
    });
    lineas.push("");
    if (hasPriced) lineas.push(`Total confirmado: Bs ${total}`);
    if (hasNullPriced) lineas.push("+ ítems a confirmar por WhatsApp");
    return lineas.join("\n");
  }

  function handleWhatsApp() {
    if (!validate()) return;
    const url = buildWhatsAppLink(buildResumen());
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleDownloadPdf() {
    if (!validate()) return;
    setIsGeneratingPdf(true);
    try {
      const [{ pdf }, { default: CotizacionPDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/CotizacionPDF"),
      ]);
      const blob = await pdf(
        <CotizacionPDF
          nombre={nombre}
          telefono={telefono}
          comentario={comentario}
          items={selectedItems}
          total={total}
          hasNullPriced={hasNullPriced}
          fecha={new Date()}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cotizacion-cdlab-${slugify(nombre)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el PDF de la cotización", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <section id="cotizador" className="scroll-mt-24 bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-cdlab-green">
            Cotizador interactivo
          </span>
          <h2 className="mt-2 text-3xl font-bold text-cdlab-blue sm:text-4xl">
            Armá tu cotización en segundos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Elegí los estudios que necesitás, completá tus datos y descargá tu
            cotización en PDF o envianosla directo por WhatsApp.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {ordenCategorias.map((categoria) => {
                const items = servicios.filter((s) => s.categoria === categoria);
                if (items.length === 0) return null;
                return (
                  <div
                    key={categoria}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="mb-1 font-semibold text-cdlab-blue">{categoria}</h3>
                    <p className="mb-3 text-sm text-slate-500">
                      {descripcionCategoria[categoria]}
                    </p>
                    <ul className="divide-y divide-slate-100">
                      {items.map((item) => {
                        const checked = !!selected[item.id];
                        return (
                          <li key={item.id}>
                            <label className="flex cursor-pointer items-start gap-3 py-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleItem(item.id)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-cdlab-blue focus:ring-cdlab-blue"
                              />
                              <span className="flex-1">
                                <span className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-medium text-slate-800">
                                    {item.nombre}
                                  </span>
                                  {item.precio !== null ? (
                                    <span className="rounded-full bg-cdlab-green/15 px-3 py-1 text-xs font-semibold text-cdlab-blue">
                                      Bs {item.precio}
                                    </span>
                                  ) : (
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                      A confirmar
                                    </span>
                                  )}
                                </span>
                                <span className="mt-0.5 block text-sm text-slate-500">
                                  {item.descripcion}
                                </span>
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            {errors.items ? (
              <p className="mt-3 text-sm font-medium text-red-600">{errors.items}</p>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-cdlab-blue">Tu cotización</h3>

              <div className="mb-5 rounded-xl bg-slate-50 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-slate-500">Total (ítems con precio)</span>
                  <span className="text-2xl font-bold text-cdlab-blue">Bs {total}</span>
                </div>
                {hasNullPriced ? (
                  <p className="mt-1 text-xs text-slate-500">
                    + ítems a confirmar por WhatsApp
                  </p>
                ) : null}
                {selectedItems.length === 0 ? (
                  <p className="mt-1 text-xs text-slate-400">
                    Todavía no seleccionaste estudios.
                  </p>
                ) : null}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-slate-700">
                    Nombre completo *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-cdlab-blue focus:outline-none focus:ring-1 focus:ring-cdlab-blue"
                    placeholder="Ej: María Pérez"
                  />
                  {errors.nombre ? (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.nombre}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-slate-700">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-cdlab-blue focus:outline-none focus:ring-1 focus:ring-cdlab-blue"
                    placeholder="Ej: 7XXXXXXX"
                  />
                  {errors.telefono ? (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.telefono}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="comentario" className="mb-1 block text-sm font-medium text-slate-700">
                    Comentario (opcional)
                  </label>
                  <textarea
                    id="comentario"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-cdlab-blue focus:outline-none focus:ring-1 focus:ring-cdlab-blue"
                    placeholder="Contanos algo más si lo necesitás"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-cdlab-blue px-5 py-3 text-sm font-semibold text-cdlab-blue transition-colors hover:bg-cdlab-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Descargar cotización en PDF
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-cdlab-green px-5 py-3 text-sm font-semibold text-cdlab-blue transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
