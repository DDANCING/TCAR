"use client"

import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Banknote, 
  Car, 
  RefreshCw, 
  Wrench, 
  Gem 
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Mock Data ---
const services = [
  {
    icon: Car,
    title: "Venda e Compra",
    description: "Avaliação precisa e justa do seu veículo. Processo transparente e seguro para quem vende e para quem compra.",
  },
  {
    icon: Banknote,
    title: "Financiamento Premium",
    description: "Parcerias com as principais instituições financeiras para oferecer as taxas mais competitivas do mercado.",
  },
  {
    icon: RefreshCw,
    title: "Troca com Troco",
    description: "Aceitamos seu veículo na troca com a melhor avaliação do mercado e flexibilidade na negociação.",
  },
  {
    icon: ShieldCheck,
    title: "Blindagem e Segurança",
    description: "Consultoria completa para blindagem de veículos com as certificadoras mais renomadas do país.",
  },
  {
    icon: Wrench,
    title: "Revisão e Garantia",
    description: "Todos os veículos passam por um rigoroso processo de inspeção de 150 itens antes de entrarem no showroom.",
  },
  {
    icon: Gem,
    title: "Estética Automotiva",
    description: "Serviços de detalhamento, vitrificação e proteção de pintura para manter seu carro sempre impecável.",
  },
]

// Variáveis de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } as const,
}

export default function Services() {
  return (
    <section className="bg-white text-foreground py-24 md:py-32 overflow-hidden relative">
      
      {/* Elemento Decorativo de Fundo (Linhas sutis para dar profundidade técnica) */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-foreground/5 bg-foreground/[0.02] -skew-x-12 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- Cabeçalho da Seção --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="h-px w-12 bg-primary"></span>
              <span className="text-primary font-mono text-sm tracking-[0.25em] uppercase font-bold">
                Nossos Diferenciais
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-foreground leading-relaxed"
            >
              Excelência <br />
              <span className="text-primary inline-block">
                Em Movimento
              </span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-md font-light border-l-2 border-primary/20 pl-6"
          >
            Não vendemos apenas carros. Entregamos uma experiência completa de propriedade, cuidando de cada etapa para você.
          </motion.p>
        </div>

        {/* --- Grid de Serviços --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group relative bg-white border border-foreground/10 hover:border-primary/50 transition-colors duration-500 p-8 h-full flex flex-col justify-between"
            >
              {/* Efeito Hover Fundo Sutil */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500 -z-10" />

              <div>
                {/* Cabeçalho do Card: Ícone e Número */}
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-foreground/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <service.icon strokeWidth={1.5} className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-4xl font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors select-none">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Linha inferior decorativa que cresce no hover */}
              <div className="w-full bg-foreground/10 h-px mt-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-full bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}