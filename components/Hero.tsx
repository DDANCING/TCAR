"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-tcar-black via-transparent to-transparent z-10" />
        {/* Placeholder video - Substituir pelo vídeo do showroom Tcar */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 text-center max-w-4xl px-4 mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4"
        >
          Beyond The Standard
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          A EXCELÊNCIA <br /> É UMA ESCOLHA.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-tcar-silver text-sm md:text-lg max-w-2xl mx-auto mb-10 font-light"
        >
          O maior acervo de superesportivos e blindados do Brasil. Onde sonhos se tornam realidade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="group relative px-8 py-4 bg-transparent border border-primary/30 overflow-hidden text-white font-sans text-xs font-bold uppercase tracking-widest hover:border-primary transition-colors duration-300">
            <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">Explorar a Coleção</span>
            <div className="absolute inset-0 h-full w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}