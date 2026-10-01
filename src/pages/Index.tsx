import { useEffect } from "react";
import { scrollToId } from "@/lib/scroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Centauro from "@/components/Centauro";
import Services from "@/components/Services";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import Book from "@/components/Book";
import Stories from "@/components/Stories";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      window.setTimeout(() => scrollToId(id), 150);
    }
  }, []);
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* 2: Red neuronal interactiva + scrollytelling del Creativo Centauro */}
      <Centauro />
      {/* 3: Pieza audiovisual SEO/GEO + tarjetas de servicios */}
      <Services />
      {/* 4: Sobre Paula */}
      <About />
      <Stats />
      <Portfolio />
      <Book />
      <Stories />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
