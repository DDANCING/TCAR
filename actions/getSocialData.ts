"use server"

import { db } from "@/lib/db"

const YOUTUBE_CHANNEL_ID = "UCZlCYjDdwkE3TvSP9e82BMQ" // ID Oficial TCAR
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const SYNC_INTERVAL_HOURS = 6

type SocialPost = {
  id: string
  platform: "YouTube" | "Instagram" | "TikTok"
  title: string
  description: string
  date: string
  url: string
  thumbnail: string
  author: string
}

/**
 * Busca os últimos 3 vídeos do YouTube usando a API oficial
 */
export async function getLatestSocialPosts(): Promise<SocialPost[]> {
  try {
    // Verificar última sincronização
    const syncLog = await db.socialSyncLog.findUnique({
      where: { platform: "YouTube" },
    })

    const now = new Date()
    const shouldSync =
      !syncLog || 
      (now.getTime() - syncLog.lastSync.getTime()) / (1000 * 60 * 60) >= SYNC_INTERVAL_HOURS

    if (shouldSync) {
      await syncYouTubePosts()
    }

    // Buscar posts do banco de dados
    const dbPosts = await db.socialPost.findMany({
      where: { platform: "YouTube" },
      orderBy: { date: "desc" },
      take: 3,
    })

    const posts: SocialPost[] = dbPosts.map((post) => ({
      id: post.id,
      platform: post.platform as "YouTube" | "Instagram" | "TikTok",
      title: post.title,
      description: post.description,
      date: post.date.toISOString(),
      url: post.url,
      thumbnail: post.thumbnail,
      author: post.author,
    }))

    if (posts.length === 0) {
      return [{
        id: "yt-fallback",
        platform: "YouTube",
        title: "TCAR IMPORTS",
        description: "Confira nosso canal oficial no YouTube.",
        date: new Date().toISOString(),
        url: "https://www.youtube.com/watch?v=qT1-W_kXezk&t=2s",
        thumbnail: "/THUMB.jpg",
        author: "@TCARIMPORTS",
      }]
    }

    return posts
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return []
  }
}

/**
 * Sincroniza os últimos 3 vídeos do YouTube usando a API v3
 */
async function syncYouTubePosts() {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error("YOUTUBE_API_KEY não configurada")
    }

    // Buscar vídeos do canal usando a API YouTube Data v3
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${YOUTUBE_API_KEY}&` +
      `channelId=${YOUTUBE_CHANNEL_ID}&` +
      `part=snippet&` +
      `order=date&` +
      `maxResults=3&` +
      `type=video`
    )

    if (!searchResponse.ok) {
      throw new Error(`YouTube API Error: ${searchResponse.statusText}`)
    }

    const searchData = await searchResponse.json()
    let postsSync = 0

    if (searchData.items && searchData.items.length > 0) {
      for (const item of searchData.items) {
        const videoId = item.id.videoId
        const snippet = item.snippet

        await db.socialPost.upsert({
          where: { postId: videoId },
          update: {
            title: snippet.title,
            description: snippet.description || "Assista ao conteúdo mais recente no nosso canal oficial.",
            date: new Date(snippet.publishedAt),
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url,
            author: "@TCARIMPORTS",
          },
          create: {
            platform: "YouTube",
            postId: videoId,
            title: snippet.title,
            description: snippet.description || "Assista ao conteúdo mais recente no nosso canal oficial.",
            date: new Date(snippet.publishedAt),
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url,
            author: "@TCARIMPORTS",
          },
        })

        postsSync++
      }
    }

    // Atualizar log de sincronização
    await db.socialSyncLog.upsert({
      where: { platform: "YouTube" },
      update: {
        lastSync: new Date(),
        status: "success",
        postsSync,
        error: null,
      },
      create: {
        platform: "YouTube",
        lastSync: new Date(),
        status: "success",
        postsSync,
      },
    })

    console.log(`✅ Sincronizados ${postsSync} vídeos do YouTube`)
  } catch (error) {
    console.error("❌ Erro ao sincronizar YouTube:", error)

    await db.socialSyncLog.upsert({
      where: { platform: "YouTube" },
      update: {
        lastSync: new Date(),
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      },
      create: {
        platform: "YouTube",
        lastSync: new Date(),
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      },
    })
  }
}

/**
 * Busca estatísticas reais do canal YouTube
 */
export async function getChannelStats() {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error("YOUTUBE_API_KEY não configurada")
    }

    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?` +
      `key=${YOUTUBE_API_KEY}&` +
      `id=${YOUTUBE_CHANNEL_ID}&` +
      `part=statistics,snippet`
    )

    if (!statsResponse.ok) {
      throw new Error(`YouTube API Error: ${statsResponse.statusText}`)
    }

    const data = await statsResponse.json()

    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics
      return {
        subscribers: parseInt(stats.subscriberCount || "0"),
        videos: parseInt(stats.videoCount || "0"),
        views: parseInt(stats.viewCount || "0"),
      }
    }

    throw new Error("Canal não encontrado")
  } catch (error) {
    console.error("Erro ao buscar estatísticas do canal:", error)
    // Fallback em caso de erro
    return {
      subscribers: 0,
      videos: 0,
      views: 0,
    }
  }
}