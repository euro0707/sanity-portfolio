import { ReactNode } from 'react'
import { TerminalHeader } from './TerminalHeader'
import { MouseGradient } from '../effects/MouseGradient'

interface TerminalLayoutProps {
  children: ReactNode
  className?: string
}

export const TerminalLayout = ({ children, className = '' }: TerminalLayoutProps) => {
  return (
    <div className={`min-h-screen bg-terminal-bg relative ${className}`}>
      <MouseGradient />
      <div className="relative z-10">
        <TerminalHeader />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}