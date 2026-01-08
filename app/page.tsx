"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarGrid from "@/components/CarGrid";
import Services from "@/components/Services";
import StoreMap from "@/components/StoreMap";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import TcarLiveFeed from "@/components/live-feed";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o tempo de carregamento dos assets pesados (vídeos, fontes)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 segundos de "Show" da marca

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-tcar-black min-h-screen selection:bg-tcar-gold selection:text-black">
      {/* Gerenciador de Animação de Entrada/Saída */}
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          
          <main>
            <Hero />
            
            {/* Elemento de Transição Suave (Gradient Fade) */}
            <div className="relative z-10 -mt-24 h-24 bg-gradient-to-b from-transparent to-tcar-black pointer-events-none" />
            <TcarLiveFeed/>
            <CarGrid />
            <Services />
            <StoreMap />
          </main>

          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}