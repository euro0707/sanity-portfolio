// components/ProjectCard.tsx
type Props = {
  title: string
  description: string
  imageUrl?: string
  githubUrl?: string
}

export const ProjectCard = ({ title, description, imageUrl, githubUrl }: Props) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
      {imageUrl && <img src={imageUrl} alt={title} className="mb-2 rounded w-full object-cover h-48" />}
      <h2 className="text-xl font-bold mb-1">{title}</h2>
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