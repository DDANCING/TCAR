"use client";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Search, Menu, User } from "lucide-react";
import Link from "next/link";
import { Shield } from "lucide-react"; // Logo
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
        scrolled
          ? "bg-tcar-black/95 backdrop-blur-md border-white/10 py-3"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo + Texto Minimalista */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
          src="/WhiteLogo.png"
          alt="Tcar Logo"
          width={100}
          height={100}
          className="object-contain"
        />
         
        </Link>

        {/* Centro: Navegação "Ferrari Style" - Invisível no Mobile */}
        {/* A Ferrari usa fonte muito pequena (text-[11px] ou text-xs) com tracking absurdo */}
        <nav className="hidden lg:flex items-center gap-10">
          {["Estoque", "Venda seu Carro", "Financiamento", "Seguros", "Universe"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:text-tcar-gold transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-tcar-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Lado Direito: Ferramentas */}
        <div className="flex items-center gap-6 text-white">
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-tcar-gold transition-colors">
            <Search className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Busca</span>
          </div>
          
          <div className="h-4 w-[1px] bg-white/20 hidden md:block" />

          {/* Botão Menu "Hambúrguer" Sofisticado */}
          <button className="flex items-center gap-2 hover:text-tcar-gold transition-colors">
            <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">Menu</span>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}