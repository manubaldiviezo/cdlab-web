"use client";

import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { ServicioItem } from "@/lib/servicios";
import { siteConfig } from "@/lib/config";

export interface CotizacionPDFProps {
  nombre: string;
  telefono: string;
  comentario?: string;
  items: ServicioItem[];
  total: number;
  hasNullPriced: boolean;
  fecha: Date;
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#054171",
    paddingBottom: 12,
    marginBottom: 16,
  },
  logo: { width: 90, height: 60, marginRight: 12 },
  headerText: { flex: 1 },
  brand: { fontSize: 14, fontWeight: 700, color: "#054171" },
  contactLine: { fontSize: 9, color: "#444", marginTop: 2 },
  title: { fontSize: 16, fontWeight: 700, color: "#054171", marginBottom: 2 },
  emissionDate: { fontSize: 9, color: "#666", marginBottom: 16 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#054171",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  patientBox: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f4f7fa",
    borderRadius: 4,
  },
  patientRow: { flexDirection: "row", marginBottom: 2 },
  patientLabel: { width: 90, fontWeight: 700 },
  table: { marginBottom: 8 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#054171",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableHeaderCell: { color: "#ffffff", fontWeight: 700, fontSize: 9 },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  cellItem: { flex: 3 },
  cellCategoria: { flex: 2, color: "#555555" },
  cellPrecio: { flex: 1, textAlign: "right" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  totalLabel: { fontWeight: 700, marginRight: 8 },
  totalValue: { fontWeight: 700, color: "#054171" },
  note: { fontSize: 8, color: "#666666", marginTop: 4 },
  footnote: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    fontSize: 8,
    color: "#666666",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 32,
    right: 32,
    fontSize: 8,
    color: "#999999",
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
  },
});

function formatFecha(fecha: Date) {
  return fecha.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function CotizacionPDF({
  nombre,
  telefono,
  comentario,
  items,
  total,
  hasNullPriced,
  fecha,
}: CotizacionPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Image src="/images/logo-cdlab.png" style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.brand}>CDLab · Laboratorio Clínico</Text>
            <Text style={styles.contactLine}>{siteConfig.address}</Text>
            <Text style={styles.contactLine}>WhatsApp: {siteConfig.whatsapp.display}</Text>
          </View>
        </View>

        <Text style={styles.title}>Cotización Preliminar</Text>
        <Text style={styles.emissionDate}>Fecha de emisión: {formatFecha(fecha)}</Text>

        <Text style={styles.sectionLabel}>Datos del paciente</Text>
        <View style={styles.patientBox}>
          <View style={styles.patientRow}>
            <Text style={styles.patientLabel}>Nombre:</Text>
            <Text>{nombre}</Text>
          </View>
          <View style={styles.patientRow}>
            <Text style={styles.patientLabel}>Teléfono:</Text>
            <Text>{telefono}</Text>
          </View>
          {comentario ? (
            <View style={styles.patientRow}>
              <Text style={styles.patientLabel}>Comentario:</Text>
              <Text>{comentario}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.sectionLabel}>Estudios seleccionados</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.cellItem]}>Estudio</Text>
            <Text style={[styles.tableHeaderCell, styles.cellCategoria]}>Categoría</Text>
            <Text style={[styles.tableHeaderCell, styles.cellPrecio]}>Precio</Text>
          </View>
          {items.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.cellItem}>{item.nombre}</Text>
              <Text style={styles.cellCategoria}>{item.categoria}</Text>
              <Text style={styles.cellPrecio}>
                {item.precio !== null ? `Bs ${item.precio}` : "A confirmar"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total confirmado:</Text>
          <Text style={styles.totalValue}>Bs {total}</Text>
        </View>
        {hasNullPriced ? (
          <Text style={[styles.note, { textAlign: "right" }]}>
            + ítems a confirmar por WhatsApp
          </Text>
        ) : null}

        <Text style={styles.footnote}>
          Cotización válida por 7 días desde la fecha de emisión. Los ítems &quot;a
          confirmar&quot; se cotizan según indicación médica; te contactaremos por
          WhatsApp con el precio final. Este documento no reemplaza una orden médica.
        </Text>

        <Text style={styles.footer}>
          {siteConfig.address} · WhatsApp {siteConfig.whatsapp.display}
        </Text>
      </Page>
    </Document>
  );
}
