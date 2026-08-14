import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueStrip from "@/components/ValueStrip";
import Servicios from "@/components/Servicios";
import PorQueElegirnos from "@/components/PorQueElegirnos";
import Nosotros from "@/components/Nosotros";
import Cotizador from "@/components/Cotizador";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueStrip />
        <Servicios />
        <PorQueElegirnos />
        <Nosotros />
        <Cotizador />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
