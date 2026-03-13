import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedinIn, FaDownload, FaWhatsapp } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi'
import ParticleCanvas from './ParticleCanvas'

const roles = [
  'Full Stack Developer',
  'Video Editor',
  'Creative Coder',
  'Visual Storyteller',
  'UI/UX Enthusiast',
]

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 40)
      } else {
        setDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  const socials = [
    { icon: <FaGithub />, href: 'https://github.com/Durgeshkr01', label: 'GitHub' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/dp.visualdiary?igsh=bHhwamptNHpqOW9i', label: 'Instagram' },
    { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/durgesh-kumar-4709a12a5', label: 'LinkedIn' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/919939128165', label: 'WhatsApp' },
  ]

  return (
    <section id="hero" className="hero">
      <ParticleCanvas />

      <div className="hero-shapes">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`floating-shape shape-${i}`}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-greeting"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="greeting-line" />
          Hello, I&apos;m
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
        >
          {'DURGESH'.split('').map((l, i) => (
            <motion.span
              key={i}
              className="hero-letter"
              whileHover={{ y: -10, color: '#00f0ff', transition: { duration: 0.2 } }}
            >
              {l}
            </motion.span>
          ))}
          <br />
          {'KUMAR'.split('').map((l, i) => (
            <motion.span
              key={i + 10}
              className="hero-letter outline"
              whileHover={{ y: -10, color: '#ff2d75', WebkitTextStroke: '0px', transition: { duration: 0.2 } }}
            >
              {l}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="role-prefix">&gt; </span>
          <span className="role-text">{text}</span>
          <span className="role-cursor">|</span>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link hoverable"
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,240,255,0.3)' }}
              whileTap={{ scale: 0.9 }}
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        <div className="hero-cta-group">
          <motion.a
            href="#about"
            className="hero-cta hoverable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,240,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
            <span className="cta-arrow">→</span>
          </motion.a>
          
          <motion.a
            href="/resume.pdf"
            download
            className="hero-cta-secondary hoverable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Resume
          </motion.a>
        </div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiChevronDown />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
