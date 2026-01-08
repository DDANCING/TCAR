"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Linkedin, ArrowUpRight } from "lucide-react"

const footerSections = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#" },
      { label: "Veículos", href: "#vehicles" },
      { label: "Serviços", href: "#services" },
      { label: "Sobre", href: "#about" },
    ]
  },
  {
    title: "Suporte",
    links: [
      { label: "Contato", href: "#contact" },
      { label: "Financiamento", href: "#financing" },
      { label: "Garantia", href: "#warranty" },
      { label: "FAQ", href: "#faq" },
    ]
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre TCAR", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Carreiras", href: "#careers" },
      { label: "Política de Privacidade", href: "#privacy" },
    ]
  },
]

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/tcar", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/tcar", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/tcar", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/tcar", label: "LinkedIn" },
]

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Seção Principal */}
        <div className="py-16 md:py-20 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">
            
            {/* Brand & Info */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/60">
                  TCAR
                </span>{" "}
                Imports
              </h3>
              
              <p className="text-neutral-400 text-sm leading-relaxed mb-8 max-w-xs">
                Excelência em movimento. Oferecemos a melhor experiência em compra, venda e consultoria automotiva premium.
              </p>

              {/* Informações de Contato */}
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Endereço */}
                <motion.a 
                  href="https://maps.google.com/?q=Rua+Serra+de+Bragança+1212+Tatuapé+São+Paulo"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="flex gap-3 group hover:text-primary transition-colors"
                >
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-white">Endereço</p>
                    <p className="text-neutral-500 group-hover:text-primary/80">
                      Rua Serra de Bragança, 1212<br />
                      Tatuapé, São Paulo - SP, 03318-000
                    </p>
                  </div>
                </motion.a>

                {/* Telefone */}
                <motion.a 
                  href="tel:+551199999999"
                  variants={itemVariants}
                  className="flex gap-3 group hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-white">Telefone</p>
                    <p className="text-neutral-500 group-hover:text-primary/80">
                      +55 (11) 9999-9999
                    </p>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a 
                  href="mailto:contato@tcar.com.br"
                  variants={itemVariants}
                  className="flex gap-3 group hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-neutral-500 group-hover:text-primary/80">
                      contato@tcar.com.br
                    </p>
                  </div>
                </motion.a>

                {/* CNPJ */}
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-3 pt-2"
                >
                  <div className="text-sm">
                    <p className="font-semibold text-white">CNPJ</p>
                    <p className="text-neutral-500">
                      00.000.000/0000-00
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Links Rápidos */}
            {footerSections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <motion.li 
                      key={linkIdx}
                      whileHover={{ x: 4 }}
                    >
                      <a 
                        href={link.href}
                        className="text-neutral-400 hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Redes Sociais e Copyright */}
        <div className="py-12 border-b border-white/10">
          <motion.div 
            className="flex flex-col md:flex-row md:items-center justify-between gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Redes Sociais */}
            <motion.div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400 uppercase tracking-wide">Siga-nos</span>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Newsletter (opcional) */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-neutral-400 uppercase tracking-wide">Novidades</span>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded text-white placeholder:text-neutral-600 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                />
                <button className="px-4 py-2 bg-primary text-black font-semibold rounded hover:bg-primary/90 transition-colors text-sm">
                  Inscrever
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-500 text-sm">
            © 2025 <span className="text-primary font-semibold">TCAR Imports</span>. Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center md:justify-end gap-6 text-xs text-neutral-600">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <span className="text-neutral-700">•</span>
            <a href="#terms" className="hover:text-primary transition-colors">
              Termos de Serviço
            </a>
            <span className="text-neutral-700">•</span>
            <a href="#cookies" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
