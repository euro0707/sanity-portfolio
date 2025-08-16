import { motion } from 'framer-motion'
import { urlFor } from '../../lib/sanity'

interface ProjectTerminalCardProps {
  title: string
  description: string
  image?: any
  githubUrl?: string
  status?: 'planning' | 'development' | 'completed'
  index?: number
}

const statusIcons = {
  planning: '📝',
  development: '🚧',
  completed: '✅',
}

const statusColors = {
  planning: 'text-yellow-400',
  development: 'text-blue-400',
  completed: 'text-terminal-accent',
}

export const ProjectTerminalCard = ({ 
  title, 
  description, 
  image, 
  githubUrl, 
  status = 'planning',
  index = 0
}: ProjectTerminalCardProps) => {
  const imageUrl = image ? urlFor(image).width(400).height(200).fit('fill').url() : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-terminal-secondary border border-terminal-border rounded-lg p-6 group hover:border-terminal-accent transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Project Image */}
        {imageUrl && (
          <div className="rounded overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Project Details */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-terminal-text font-semibold text-xl">
              {title}
            </h3>
            <span className={`text-sm ${statusColors[status]}`}>
              {statusIcons[status]}
            </span>
          </div>
          
          <p className="text-terminal-muted text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded ${statusColors[status]} bg-opacity-20`}>
              {status}
            </span>
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-terminal-accent hover:text-terminal-text transition-colors text-sm"
              >
                GitHub →
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}