"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Heart, 
  Gauge, // Para Quilometragem
  Calendar, // Para Ano
  Fuel, // Para Combustível
  Settings2, // Para Transmissão/Motor
  ShieldCheck, // Para Blindado
  CarFront // Para Portas/Modelo
} from "lucide-react"
import { isMobile as detectMobile } from "react-device-detect"

import { cn } from "@/lib/utils" // Assumindo que você tem isso configurado
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  containerVariants,
  contentVariants,
  favoriteVariants,
  overlayVariants,
} from "@/lib/animations" // Assumindo suas animações existentes

// --- Interfaces ---

export interface CarProduct {
  id: string
  name: string
  brand: string
  model: string
  price: number
  originalPrice?: number
  images: { url: string }[]
  year: number
  mileage: number
  fuel: string
  transmission: string
  condition: "Novo" | "Seminovo" | "Usado"
  armored: boolean
  engine: string
  doors: number
  cylinders: number
  color: { name: string; value: string }
  description?: string
  isOnlyRental?: boolean
  rentalValue?: number
}

interface ProductCardProps {
  product: CarProduct
  size?: number
  initialInWishlist?: boolean
}

// --- Constantes ---
const DEFAULT_CARD_WIDTH = 320 
const DEFAULT_IMAGE_HEIGHT = 220 // Levemente ajustado para carros

const ProductCard: React.FC<ProductCardProps> = ({ 
  initialInWishlist = false, 
  product, 
  size = 1 
}) => {
  const [isFavorite, setIsFavorite] = useState(initialInWishlist)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Formatação de moeda BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0, // Carros geralmente não usam centavos na vitrine
    }).format(value)
  }

  // Formatação de Quilometragem
  const formatMileage = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value) + " km"
  }

  // Lógica de Preço
  const isOnlyRental = product.isOnlyRental === true
  const hasRentalValue = product.rentalValue !== undefined && product.rentalValue > 0
  const displayPrice = isOnlyRental 
    ? (hasRentalValue ? product.rentalValue! : 0)
    : product.price

  useEffect(() => {
    setIsClient(true)
    setIsMobile(detectMobile)
  }, [])

  const imageUrl = product.images[0]?.url ?? "/placeholder.svg"
  
  // Dimensões
  const cardWidth = DEFAULT_CARD_WIDTH * size
  const imageHeight = DEFAULT_IMAGE_HEIGHT * size

  const cardStyle = {
    // No mobile, removemos a largura fixa para ser responsivo (width: 100%)
    width: isMobile ? '100%' : `${cardWidth}px`,
    fontSize: `${size}em`,
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }, // Zoom mais suave para carros
  }

  return (
    <motion.div
      initial="rest"
      whileHover={isMobile ? "rest" : "hover"} // Desativa hover effect no mobile
      animate="rest"
      variants={containerVariants}
      style={cardStyle}
      className={cn(
        "relative rounded-2xl border border-border/40 bg-card text-card-foreground overflow-hidden",
        "shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group flex flex-col",
        isMobile ? "w-full max-w-md mx-auto" : "" // Centraliza no mobile
      )}
    >
      {/* Link de navegação (cobre o card todo no mobile para facilitar o toque) */}
      <Link
          href={`/estoque/${product.id}`}
          className="absolute inset-0 z-10"
          aria-label={`Ver detalhes de ${product.name}`}
      >
          <span className="sr-only">Ver detalhes</span>
      </Link>

      {/* --- Área da Imagem --- */}
      <div className="relative overflow-hidden shrink-0">
        {/* Badge de Condição / Ano */}
        <div className="absolute top-3 left-3 z-20 flex gap-2">
            <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-0 font-semibold">
                {product.year}
            </Badge>
            {product.armored && (
                <Badge className="bg-slate-700 text-white border-0 flex items-center gap-1">
                    <ShieldCheck size={12} /> Blindado
                </Badge>
            )}
        </div>

        <motion.div variants={imageVariants} className="bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            width={DEFAULT_CARD_WIDTH} // Usamos valores base, o CSS controla o tamanho final
            height={DEFAULT_IMAGE_HEIGHT}
            className="w-full object-cover"
            style={{
              height: `${imageHeight}px`,
            }}
          />
        </motion.div>

        {/* Botão de Favorito (z-index alto para ficar acima do Link) */}
        <motion.button
          variants={favoriteVariants}
          onClick={(e) => {
            e.preventDefault() // Previne navegar ao clicar no coração
            setIsFavorite(!isFavorite)
          }}
          className={cn(
            "absolute top-3 right-3 z-30 p-2 rounded-full backdrop-blur-md border border-white/20 transition-colors",
            isFavorite
              ? "bg-white text-red-500"
              : "bg-black/30 text-white hover:bg-black/50"
          )}
        >
          <Heart
            className={cn("w-5 h-5", isFavorite && "fill-current")}
          />
        </motion.button>
      </div>

      {/* --- Conteúdo Principal (Sempre Visível) --- */}
      <div className="p-5 flex flex-col gap-3 bg-card h-full justify-between relative z-20">
        <div>
            {/* Título e Modelo */}
            <div className="mb-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {product.brand}
                </span>
                <h3 className="text-lg font-bold leading-tight line-clamp-2" title={product.name}>
                    {product.model} <span className="font-normal text-muted-foreground text-sm block mt-1">{product.engine} {product.condition}</span>
                </h3>
            </div>

            {/* Grid de Especificações (Crucial para mobile e desktop) */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-3 my-2 border-t border-b border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Gauge className="w-4 h-4 text-primary" />
                    <span>{formatMileage(product.mileage)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Settings2 className="w-4 h-4 text-primary" />
                    <span className="truncate">{product.transmission}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Fuel className="w-4 h-4 text-primary" />
                    <span>{product.fuel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CarFront className="w-4 h-4 text-primary" />
                    <span>{product.doors} portas</span>
                </div>
            </div>
        </div>

        {/* Preço */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Valor à vista</p>
            <span className="text-2xl font-bold text-primary">
                {formatCurrency(displayPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* --- Overlay (Apenas Desktop Hover) --- */}
      {/* Escondemos no mobile pois hover não funciona bem e cobre a info principal */}
      {!isMobile && (
        <motion.div
            variants={overlayVariants}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl flex flex-col justify-center px-6 text-center z-20"
        >
            <motion.div variants={contentVariants} className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
                        style={{ backgroundColor: product.color.value }} 
                        title={product.color.name}
                    />
                    <p className="text-sm font-medium">{product.color.name}</p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                    {product.description || "Veículo em excelente estado de conservação, revisado e com garantia."}
                </p>

                <div className="pt-2 w-full space-y-2">
                    <Link
                        href={`/estoque/${product.id}`}
                        className={cn(buttonVariants({ variant: "default" }), "w-full")}
                    >
                        Ver Detalhes
                    </Link>
                    <button className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                        Simular Financiamento
                    </button>
                </div>
            </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProductCard