// pages/index.tsx
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TerminalLayout } from '../components/terminal/TerminalLayout'
import { TypingAnimation } from '../components/terminal/TypingAnimation'
import { ProjectTerminalCard } from '../components/terminal/ProjectTerminalCard'
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
        <title>Tetsuya Hino - Developer Portfolio</title>
        <meta name="description" content="Full Stack Developer specializing in React, Node.js, and modern web technologies" />
      </Head>
      
      <TerminalLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-16"
          >
            <h1 className="text-5xl font-bold text-terminal-text">
              Tetsuya Hino
            </h1>
            <p className="text-xl text-terminal-accent">
              Full Stack Developer
            </p>
            <p className="text-terminal-muted max-w-2xl mx-auto leading-relaxed">
              Passionate about building innovative web applications with modern technologies.
              Specializing in React, Node.js, and scalable development practices.
            </p>
          </motion.div>

          {/* Projects Section */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl font-semibold text-terminal-text text-center"
            >
              Featured Projects
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {displayProjects.map((project, index) => (
                <ProjectTerminalCard
                  key={project._id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  githubUrl={project.githubUrl}
                  status={project.status}
                  index={index}
                />
              ))}
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center space-y-4 py-16"
          >
            <h3 className="text-2xl font-semibold text-terminal-text">
              Let's Connect
            </h3>
            <div className="flex justify-center gap-8 text-terminal-muted">
              <span>📧 contact@tetsuya.dev</span>
              <span>📍 Tokyo, Japan</span>
              <span>💼 Available for projects</span>
            </div>
          </motion.div>
        </div>
      </TerminalLayout>
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