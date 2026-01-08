"use client";
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      // O container espera 1s (tempo da logo sumir) antes de desaparecer
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeInOut",
        delay: 1 // <--- O PULO DO GATO: Espera a logo terminar
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      {/* Container que engloba Logo + Efeito de Pulso */}
      {/* Adicionamos motion aqui para controlar o desaparecimento da logo */}
      <motion.div 
  className="relative w-80 h-80 rounded-full overflow-hidden"
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 2, ease: "easeInOut" }}
>
  {/* Glow */}
  <motion.div
    animate={{
      scale: [1, 1.15, 1],
      opacity: [0.4, 0.9, 0.4],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute inset-[-20%] bg-[#C6A664]/25 blur-2xl rounded-full"
  />

  {/* Vídeo */}
  <video
    src="/open.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />

  {/* Fade interno pra matar QUALQUER borda */}
  <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_30px_black]" />
</motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        // Texto também some junto com a logo
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 flex flex-col items-center"
      >
         {/* Se tiver texto de "Loading", ele ficará aqui */}
      </motion.div>
    </motion.div>
  );
}