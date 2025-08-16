import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ckiaur1u',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '', // トークンが必要
  apiVersion: '2023-05-03',
})

const projects = [
  {
    _type: 'project',
    title: 'PriceBotX',
    slug: {
      _type: 'slug',
      current: 'pricebotx'
    },
    description: '副業せどり向け価格監視Bot。Keepa + Zapier + Windsurfで構成。',
    githubUrl: 'https://github.com/euro0707/-PriceBotX',
    status: 'completed',
  },
  {
    _type: 'project',
    title: 'Linux Quest',
    slug: {
      _type: 'slug',
      current: 'linux-quest'
    },
    description: 'Claude Codeで構築した1週間で学ぶLinux学習ゲーム。',
    githubUrl: 'https://github.com/euro0707/claude-kit',
    status: 'completed',
  },
  {
    _type: 'project',
    title: '断捨離LINE Bot',
    slug: {
      _type: 'slug',
      current: 'line-bot'
    },
    description: '不要なLINEトーク履歴を抽出・分類しスプレッドシート連携で可視化。',
    githubUrl: '',
    status: 'development',
  },
]

async function importData() {
  try {
    for (const project of projects) {
      const result = await client.create(project)
      console.log(`Created project: ${result.title}`)
    }
    console.log('All projects imported successfully!')
  } catch (error) {
    console.error('Error importing data:', error)
  }
}

importData()