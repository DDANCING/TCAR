"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "react-aria-components";
import ProductCard, { CarProduct } from "./product-card";

// Adicionei URLs de vídeo fictícios (mp4) para o exemplo funcionar.
// Em produção, substitua por seus vídeos locais ou CDN.
const cars = [
  {
    id: 1,
    brand: "FERRARI",
    model: "CALIFORNIA T",
    year: "2017",
    price: "R$ 2.249.900",
    image: "/FerrariCalifornaT.jpeg",
    video: "/FerrariCaliforniaT.mp4", // Exemplo genérico
    category: "Supercars",
  },
  {
    id: 2,
    brand: "LAMBORGHINI",
    model: "URUS 4.0 V8 TURBO",
    year: "2019",
    price: "R$ 2.349.900",
   image: "/URUS.jpg",
    video: "/URUS.mp4",
    category: "SUV/Supercars",
  },
  {
    id: 3,
    brand: "BMW",
    model: "320I 2.0 16V TURBO",
    year: "2020",
    price: "R$ 1.150.000",
    image: "/BMW.jpg",
    video: "/BMW.mp4",
    category: "Armored",
    armored: true,
  }
];

// Transformar dados dos carros para o formato CarProduct
const productCards: CarProduct[] = cars.map((car) => ({
  id: String(car.id),
  name: `${car.brand} ${car.model}`,
  brand: car.brand,
  model: car.model,
  price: parseInt(car.price.replace(/\D/g, "")),
  images: [{ url: car.image }],
  year: parseInt(car.year),
  mileage: Math.floor(Math.random() * 50000) + 5000, // Simulado
  fuel: "Gasolina",
  transmission: "Automática",
  condition: "Seminovo" as const,
  armored: car.armored || false,
  engine: "V8 Turbo",
  doors: 2,
  cylinders: 8,
  color: { name: "Preto", value: "#000000" },
  description: `${car.model} ${car.year} em excelente estado. ${car.category}. Veículo revisado com garantia.`,
}));

// Componente Individual do Carro para gerenciar o estado do vídeo e animação isoladamente
const CarSection = ({ car, index }: { car: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  
  // Hook para saber se o elemento está na tela (para disparar a "cortina")
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[85vh] border-b border-white/10 overflow-hidden group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. MÁSCARA/CORTINA DE REVELAÇÃO (A animação de "arrastar") */}
      <motion.div
        initial={{ x: "0%" }}
        animate={isInView ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} // Curva Bezier estilo Apple/Ferrari
        className="absolute inset-0 z-20 bg-tcar-black pointer-events-none"
      />

      {/* 2. BACKGROUND MEDIA (Imagem e Vídeo) */}
      <div className="absolute inset-0 w-full h-full">
        {/* Imagem Estática */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
           <Image
            src={car.image}
            alt={car.model}
            fill
            className="object-cover"
            priority={index === 0} // Carrega o primeiro mais rápido
          />
        </div>

        {/* Vídeo (Aparece no Hover) */}
        <video
          ref={videoRef}
          src={car.video}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Overlay Escuro Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
      </div>

      {/* 3. CONTEÚDO DE TEXTO */}
      <div className="absolute inset-0 z-30 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full max-w-[1400px]">
        
        <div className="overflow-hidden">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-tcar-gold text-xs font-bold tracking-[0.3em] uppercase">{car.brand}</span>
                    <div className="h-[1px] w-12 bg-tcar-gold/50" />
                </div>

                <h2 className="text-5xl md:text-8xl font-serif text-white uppercase italic tracking-tighter mb-6 mix-blend-overlay">
                {car.model}
                </h2>

                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-gray-300 text-lg font-light tracking-wide">
                        {car.year} <span className="mx-2 text-tcar-gold">•</span> {car.category}
                    </p>
                    {car.armored && (
                        <div className="flex items-center gap-2 text-tcar-gold">
                            <ShieldCheck size={18} />
                            <span className="text-xs uppercase tracking-widest font-bold">Blindagem Nível III-A</span>
                        </div>
                    )}
                </div>

                {/* Botão de ação que reage ao hover do card */}
                <div className="flex items-center gap-4 group/btn">
                    <span className="text-white text-sm uppercase tracking-widest border-b border-white pb-1 group-hover/btn:border-tcar-gold group-hover/btn:text-tcar-gold transition-colors">
                        Explorar Veículo
                    </span>
                    <ArrowRight className="text-white group-hover/btn:text-tcar-gold group-hover/btn:translate-x-2 transition-all" size={16} />
                </div>
            </motion.div>
        </div>

        {/* Preço posicionado no canto ou de forma estilosa */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 right-6 md:right-12 text-right"
        >
            <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Valor do Investimento</p>
            <p className="text-2xl md:text-3xl font-serif text-white">{car.price}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default function FerrariGrid() {
  return (
    <section className="bg-tcar-black w-full min-h-screen flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {cars.map((car, index) => (
          <CarSection key={car.id} car={car} index={index} />
        ))}
      </div>

      {/* --- Footer CTA com Product Cards (Redesign Premium) --- */}
      <footer className="relative bg-neutral-950 pt-32 pb-24 overflow-hidden">
        
        {/* Elemento de Fundo (Glow sutil) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          
          {/* Cabeçalho do Footer Refinado */}
          <div className="mb-20 flex flex-col items-center text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
            >
              Showroom Tcar
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic mb-6"
            >
              Coleção <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">Exclusiva</span>
            </motion.h2>

            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="h-1 w-24 bg-primary mb-8"
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed font-light"
            >
              Performance, luxo e exclusividade. Selecionamos os veículos mais desejados do mundo automotivo, revisados com rigor técnico absoluto.
            </motion.p>
          </div>

          {/* Grid de Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {productCards.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }} // Efeito cascata
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Product Card com wrapper para efeito de hover adicional do container */}
                <div className="group relative">
                    <ProductCard product={product} />
                    {/* Sombra colorida sutil atrás do card no hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Secundário Minimalista */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <button className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white transition-all duration-300 bg-transparent border border-white/20 rounded-full hover:border-primary hover:bg-primary/10">
              <span className="mr-3 uppercase tracking-widest text-sm">Ver Estoque Completo</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-primary group-hover:text-primary-foreground" />
              
              {/* Efeito de brilho no botão */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            </button>
          </motion.div>

        </div>
      </footer>
    </section>
  );
}