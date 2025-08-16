// components/ProjectCard.tsx
import { urlFor } from '../lib/sanity'

type Props = {
  title: string
  description: string
  image?: any
  githubUrl?: string
  status?: 'planning' | 'development' | 'completed'
}

const statusLabels = {
  planning: '構想中',
  development: '開発中',
  completed: '完成',
}

const statusColors = {
  planning: 'bg-yellow-100 text-yellow-800',
  development: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
}

export const ProjectCard = ({ title, description, image, githubUrl, status = 'planning' }: Props) => {
  const imageUrl = image ? urlFor(image).width(400).height(200).fit('fill').url() : 'https://via.placeholder.com/400x200'

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
      <img src={imageUrl} alt={title} className="mb-2 rounded w-full object-cover h-48" />
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-600 text-sm hover:underline"
        >
          GitHubを見る →
        </a>
      )}
    </div>
  )
}