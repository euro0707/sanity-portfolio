// pages/index.tsx
import Head from 'next/head'
import { ProjectCard } from '../components/ProjectCard'

const dummyProjects = [
  {
    title: 'PriceBotX',
    description: '副業せどり向け価格監視Bot。Keepa + Zapier + Windsurfで構成。',
    imageUrl: 'https://via.placeholder.com/400x200',
    githubUrl: 'https://github.com/euro0707/-PriceBotX',
  },
  {
    title: 'Linux Quest',
    description: 'Claude Codeで構築した1週間で学ぶLinux学習ゲーム。',
    imageUrl: 'https://via.placeholder.com/400x200',
    githubUrl: 'https://github.com/euro0707/claude-kit',
  },
  {
    title: '断捨離LINE Bot',
    description: '不要なLINEトーク履歴を抽出・分類しスプレッドシート連携で可視化。',
    imageUrl: 'https://via.placeholder.com/400x200',
    githubUrl: '',
  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <main className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">ポートフォリオ一覧</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummyProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </main>
    </>
  )
}