"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Instagram, Youtube, Music2, RefreshCcw, Users } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { getLatestSocialPosts, getChannelStats } from "@/actions/getSocialData"

// --- Componente de Contador Animado ---
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return

    const totalDuration = 2000 // 2 segundos de animação
    const incrementTime = (totalDuration / end) * 100 // Acelera para números grandes

    const timer = setInterval(() => {
      // Cálculo de incremento para ser suave
      start += Math.ceil(end / 50) 
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [value])

  // Formata para 1.8M se for muito grande ou usa toLocaleString
  return (
    <span className="tabular-nums">
      {new Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 }).format(count)}
    </span>
  )
}

const Icons = {
  YouTube: <Youtube className="h-6 w-6" />,
  Instagram: <Instagram className="h-6 w-6" />,
  TikTok: <Music2 className="h-6 w-6" />,
}

export default function TcarLiveFeed() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [posts, setPosts] = React.useState<any[]>([])
  const [stats, setStats] = React.useState<{ subscribers: number } | null>(null)
  const [loading, setLoading] = React.useState(true)

  // Busca posts e estatísticas
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, statsData] = await Promise.all([
          getLatestSocialPosts(),
          getChannelStats()
        ])
        setPosts(postsData)
        setStats(statsData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (loading) {
    return <div className="h-[600px] flex items-center justify-center bg-black text-white">Carregando Feed TCAR...</div>
  }

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Cabeçalho de Status + Contador */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 gap-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Social Hub</h3>
              <span className="hidden md:flex h-6 w-px bg-gray-300" />
             
            </div>

            {/* Contador de Inscritos */}
            {stats && (
              <div className="flex items-center gap-4 bg-red-50 px-6 py-3 rounded-full border border-red-100 shadow-sm">
                <div className="bg-red-600 text-white p-2 rounded-full">
                  <Youtube className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-gray-900 leading-none">
                    +<AnimatedCounter value={stats.subscribers} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                    Inscritos no YouTube
                  </span>
                </div>
              </div>
            )}
        </div>

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {posts.map((post) => (
              <CarouselItem key={post.id} className="basis-full"> {/* basis-full garante 1 item por vez */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
                  
                  {/* Lado Esquerdo: Texto */}
                  <div className="flex flex-col space-y-8 pr-0 lg:pr-12 order-2 lg:order-1">
                    <div className="flex items-center gap-3 text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                      {Icons[post.platform as keyof typeof Icons]}
                      <span>{post.author}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-xs">
                        {format(new Date(post.date), "d 'de' MMMM", { locale: ptBR })}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95] text-gray-900 tracking-tighter line-clamp-3">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg leading-relaxed max-w-md font-medium line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="pt-4">
                      <Button asChild variant="outline" className="rounded-full border-2 border-gray-900 text-gray-900 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all px-10 py-7 text-sm font-bold tracking-widest uppercase">
                        <Link href={post.url} target="_blank">
                          VER NO {post.platform} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Lado Direito: Vídeo do YouTube */}
                  <div className="relative aspect-video w-full order-1 lg:order-2 overflow-hidden rounded-xl shadow-2xl group cursor-pointer border border-gray-100">
                    <Link href={post.url} target="_blank" className="relative block w-full h-full">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                      
                      {post.platform === 'YouTube' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-20 w-20 bg-red-600/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden xl:block">
            <CarouselPrevious className="-left-16 h-14 w-14 border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-600 transition-colors" />
            <CarouselNext className="-right-16 h-14 w-14 border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-600 transition-colors" />
          </div>
        </Carousel>

        {/* Paginação Estilo Ferrari */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-6">
          <div className="flex gap-3">
            {posts.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  index + 1 === current ? "w-16 bg-red-600 shadow-lg shadow-red-600/30" : "w-12 bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}