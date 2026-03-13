import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaVideo, FaCamera, FaRocket } from 'react-icons/fa'

const stats = [
  { number: '10+', label: 'Projects Built' },
  { number: '50+', label: 'Videos Edited' },
  { number: '5+', label: 'Tech Stacks' },
  { number: '∞', label: 'Creativity' },
]

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">01.</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-line" />
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-image-wrap"
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="about-image-container">
            <div className="about-image-placeholder">
              <img src="/profile.jpg" alt="Durgesh Kumar" className="about-photo" />
              <div className="about-image-glitch" />
            </div>
            <div className="about-image-border" />
            <motion.div
              className="about-image-glow"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          <div className="about-badges">
            {[
              { icon: <FaCode />, text: 'Developer' },
              { icon: <FaVideo />, text: 'Editor' },
              { icon: <FaCamera />, text: 'Creator' },
              { icon: <FaRocket />, text: 'Innovator' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                className="about-badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.15, type: 'spring' }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {badge.icon}
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-text-wrap"
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="about-subtitle">
            I build things for the <span className="gradient-text">web</span> & create stunning{' '}
            <span className="gradient-text-2">video edits</span>
          </h3>

          <div className="about-description">
            <p>
              Hey! I&apos;m <strong>Durgesh Kumar</strong>, a passionate developer and professional video editor from India.
              I love building beautiful web applications and creating eye-catching video content.
            </p>
            <p>
              Whether it&apos;s crafting pixel-perfect UIs, building robust backends, or editing cinematic videos — I bring creativity to everything I do.
              Check out my visual diary on Instagram for my editing work!
            </p>
            <p>
              <strong>Looking for a developer or video editor?</strong> Let&apos;s work together and create something amazing! 🚀
            </p>
          </div>

          <div className="about-stats">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0,240,255,0.2)',
                }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
