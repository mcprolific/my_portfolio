import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Typewritter = ({ words, delay = 0.8, pauseTime = 100 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const currentWord = words[currentWordIndex]

  useEffect(() => {
    let typingInterval

    if (!isDeleting && displayedText.length < currentWord.length) {
      typingInterval = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1))
      }, delay * 1000)
    } else if (isDeleting && displayedText.length > 0) {
      typingInterval = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1))
      }, delay * 1000)
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      typingInterval = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false)
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }

    return () => clearTimeout(typingInterval)
  }, [displayedText, isDeleting, currentWord, delay, pauseTime, words])

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <AnimatePresence>
        {displayedText.split(' ').map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="blinking-cursor">|</span>

      {/* Style definition for blinking cursor */}
      <style jsx>{`
        .blinking-cursor {
          display: inline-block;
          margin-left: 2px;
          font-weight: 300;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  )
}

export default Typewritter;
