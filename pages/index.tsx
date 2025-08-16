// pages/index.tsx
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ProjectCard } from '../components/ProjectCard'
import { getProjects, Project } from '../lib/sanity'

type Props = {
  projects: Project[]
}

const fallbackProjects = [
  {
    _id: '1',
    title: 'PriceBotX',
    slug: { current: 'pricebotx' },
    description: '副業せどり向け価格監視Bot。Keepa + Zapier + Windsurfで構成。',
    githubUrl: 'https://github.com/euro0707/-PriceBotX',
    status: 'completed' as const,
  },
  {
    _id: '2', 
    title: 'Linux Quest',
    slug: { current: 'linux-quest' },
    description: 'Claude Codeで構築した1週間で学ぶLinux学習ゲーム。',
    githubUrl: 'https://github.com/euro0707/claude-kit',
    status: 'completed' as const,
  },
  {
    _id: '3',
    title: '断捨離LINE Bot',
    slug: { current: 'line-bot' },
    description: '不要なLINEトーク履歴を抽出・分類しスプレッドシート連携で可視化。',
    githubUrl: '',
    status: 'development' as const,
  },
]

export default function Home({ projects }: Props) {
  const displayProjects = projects.length > 0 ? projects : fallbackProjects

  return (
    <>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <main className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">ポートフォリオ一覧</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description}
              image={project.image}
              githubUrl={project.githubUrl}
              status={project.status}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const projects = await getProjects()
    return {
      props: {
        projects,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.warn('Failed to fetch projects from Sanity:', error)
    return {
      props: {
        projects: [],
      },
      revalidate: 60,
    }
  }
}