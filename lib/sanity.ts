import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  image?: any
  githubUrl?: string
  status: 'planning' | 'development' | 'completed'
  content?: any[]
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      image,
      githubUrl,
      status,
      content
    }
  `)
}

export async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      image,
      githubUrl,
      status,
      content
    }
  `, { slug })
}