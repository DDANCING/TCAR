"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock, ArrowUpRight, Navigation } from "lucide-react"

export default function StoreMap() {
  // Configuração de animação para os itens da lista
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <section className="bg-neutral-950 relative py-24 md:py-32 overflow-hidden">
      
      {/* Background Decorativo (Grid Sutil) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Glow Vermelho/Dourado no canto para ambientação */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- Cabeçalho --- */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold pl-1">
                Localização
              </span>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mt-4">
                TCAR <span className="text-primary inline-block">HQ</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 max-w-md text-sm md:text-base border-l border-white/10 pl-6 py-2">
              Venha tomar um café conosco e conhecer nosso showroom. 
              O destino final para quem busca exclusividade.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Coluna de Informações (Esquerda) --- */}
          <motion.div 
            className="lg:col-span-4 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Bloco Endereço */}
            <motion.div variants={itemVariants} className="group border-t border-white/10 pt-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Endereço
                </h3>
                <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-neutral-400 font-light leading-relaxed mt-4">
                Rua Serra de Bragança, 1212<br />
                Tatuapé, São Paulo - SP<br />
                <span className="text-neutral-600 text-sm">CEP 03318-000</span>
              </p>
            </motion.div>

            {/* Bloco Contato */}
            <motion.div variants={itemVariants} className="group border-t border-white/10 pt-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" /> Contato
                </h3>
                <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-primary transition-colors" />
              </div>
              <a href="tel:+551199999999" className="block text-2xl text-white font-mono hover:text-primary transition-colors mt-4">
                +55 (11) 9999-9999
              </a>
              <p className="text-neutral-500 text-sm mt-1">Atendimento exclusivo</p>
            </motion.div>

            {/* Bloco Horário */}
            <motion.div variants={itemVariants} className="group border-t border-white/10 pt-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Funcionamento
                </h3>
              </div>
              <ul className="space-y-2 mt-4 text-neutral-400 font-light">
                <li className="flex justify-between">
                  <span>Segunda - Sexta</span>
                  <span className="text-white">10h — 19h</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábado</span>
                  <span className="text-white">10h — 18h</span>
                </li>
              </ul>
            </motion.div>

            {/* Botão CTA Waze/Maps */}
            <motion.div variants={itemVariants} className="pt-4">
              <button className="w-full group relative flex items-center justify-center gap-3 bg-white text-black py-4 px-6 font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all">
                <Navigation className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                Traçar Rota
                <div className="absolute bottom-0 left-0 h-1 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </motion.div>
          </motion.div>

          {/* --- O Mapa (Direita) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            // CORREÇÃO: Aumentei a altura base para 600px e lg para 750px.
            // Adicionei rounded-2xl e overflow-hidden para um acabamento melhor.
            className="lg:col-span-8 relative h-[600px] lg:h-[750px] w-full group rounded-2xl overflow-hidden z-20"
          >
            {/* Moldura do Mapa */}
            <div className="absolute inset-0 border border-white/10 bg-neutral-900 h-full w-full">
              
              {/* Overlay Gradient para integrar o mapa ao fundo escuro */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-0 bg-neutral-950/20 z-10 pointer-events-none mix-blend-overlay" />

              {/* IFRAME com Filtro CSS para Dark Mode */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.584988629567!2d-46.56578982375685!3d-23.54743706107474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5e8dd79275ad%3A0x4a18776840787e9e!2sR.%20Serra%20de%20Bragan%C3%A7a%2C%201212%20-%20Tatuap%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003318-000!5e0!3m2!1spt-BR!2sbr!4v1709664000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // Garanti que o iframe ocupe 100% da altura e largura do contêiner pai
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-500 w-full h-full"
              />

              {/* Pin Customizado Central (Estético) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="relative">
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0" />
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-white relative shadow-[0_0_20px_rgba(255,0,0,0.5)]" />
                  {/* Tooltip no mapa */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded whitespace-nowrap border border-white/10">
                    TCAR SHOWROOM
                  </div>
                </div>
              </div>
            </div>

            {/* Efeito decorativo atrás do mapa */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent blur-md -z-10 opacity-50" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}