export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  author: string
  category: string
  tags: string[]
  image?: string
}

export const blogPosts: any[] = []
