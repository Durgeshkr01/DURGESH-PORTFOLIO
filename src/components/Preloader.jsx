import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          if (!completedRef.current) {
            completedRef.current = true
            setTimeout(() => onComplete(), 800)
          }
          return 100
        }
        return prev + 2
      })
    }, 40)
    return () => clearInterval(interval)
  }, [onComplete])

  const name = "DURGESH KUMAR"

  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="preloader-bg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="preloader-shape"
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="preloader-content">
        <div className="preloader-name">
          {name.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.6, 0.01, 0.05, 0.95],
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="preloader-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Creative Developer & Visual Storyteller
        </motion.p>

        <div className="preloader-bar-wrap">
          <motion.div
            className="preloader-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <motion.span
          className="preloader-percent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  )
}

export default Preloader
