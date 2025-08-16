import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
  showCursor?: boolean
  className?: string
}

export const TypingAnimation = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  onComplete, 
  showCursor = true,
  className = ''
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true)

  useEffect(() => {
    const startTyping = () => {
      setIsTyping(true)
      let currentIndex = 0
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          if (onComplete) {
            onComplete()
          }
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }

    const delayTimeout = setTimeout(startTyping, delay)
    return () => clearTimeout(delayTimeout)
  }, [text, speed, delay, onComplete])

  return (
    <span className={className}>
      {displayText}
    </span>
  )
}