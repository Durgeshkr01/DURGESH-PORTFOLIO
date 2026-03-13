import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedinIn, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'

const platforms = [
  {
    id: 'github',
    name: 'GitHub',
    icon: <FaGithub />,
    color: '#ffffff',
    bg: 'linear-gradient(135deg, #0d1117, #161b22)',
    link: 'https://github.com/Durgeshkr01',
    description: 'All my projects, open source contributions & code experiments live here.',
    preview: [
      { name: 'portfolio-website', lang: 'React', stars: 2 },
      { name: 'web-projects', lang: 'JavaScript', stars: 1 },
      { name: 'python-scripts', lang: 'Python', stars: 3 },
      { name: 'ui-components', lang: 'CSS', stars: 1 },
      { name: 'api-collection', lang: 'Node.js', stars: 2 },
      { name: 'learning-dsa', lang: 'C++', stars: 1 },
    ],
    cta: 'Explore All Repos',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <FaInstagram />,
    color: '#e4405f',
    bg: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
    link: 'https://www.instagram.com/dp.visualdiary?igsh=bHhwamptNHpqOW9i',
    description: 'My visual diary — photography, reels & creative captures from everyday life.',
    preview: Array.from({ length: 9 }, (_, i) => ({
      gradient: [
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #a18cd1, #fbc2eb)',
        'linear-gradient(135deg, #fccb90, #d57eeb)',
        'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
        'linear-gradient(135deg, #f5576c, #ff6a88)',
      ][i],
      label: ['🌅', '📸', '🎨', '🏙️', '🌿', '✨', '🎭', '🌊', '🔥'][i],
    })),
    cta: 'Visit Profile',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <FaLinkedinIn />,
    color: '#0077b5',
    bg: 'linear-gradient(135deg, #0077b5, #00a0dc)',
    link: 'https://www.linkedin.com/in/durgesh-kumar-4709a12a5',
    description: 'Professional network — connect with me for collaborations & opportunities.',
    preview: {
      name: 'Durgesh Kumar',
      headline: 'Full Stack Developer | Creative Coder | Open Source Enthusiast',
      connections: '500+',
      posts: '15+',
    },
    cta: 'Connect with Me',
  },
]

const SocialHub = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expandedCard, setExpandedCard] = useState(null)

  return (
    <section id="social" className="social-hub" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">05.</span>
        <h2 className="section-title">Social Universe</h2>
        <div className="section-line" />
      </motion.div>

      <motion.p
        className="social-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        Click to preview — then dive into each platform
      </motion.p>

      <div className="social-cards">
        {platforms.map((platform, idx) => (
          <motion.div
            key={platform.id}
            className={`social-card ${expandedCard === platform.id ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            onClick={() =>
              setExpandedCard(expandedCard === platform.id ? null : platform.id)
            }
          >
            <div className="social-card-bg" style={{ background: platform.bg }} />

            <div className="social-card-content">
              <motion.div
                className="social-card-icon"
                style={{ color: platform.color }}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {platform.icon}
              </motion.div>

              <h3 className="social-card-name">{platform.name}</h3>
              <p className="social-card-desc">{platform.description}</p>

              <AnimatePresence>
                {expandedCard === platform.id && (
                  <motion.div
                    className="social-preview"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {platform.id === 'github' && (
                      <div className="github-preview">
                        {platform.preview.map((repo, i) => (
                          <motion.div
                            key={i}
                            className="github-repo-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="repo-name">📦 {repo.name}</span>
                            <span className="repo-lang">{repo.lang}</span>
                            <span className="repo-stars">⭐ {repo.stars}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {platform.id === 'instagram' && (
                      <div className="insta-preview-grid">
                        {platform.preview.map((post, i) => (
                          <motion.div
                            key={i}
                            className="insta-post"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08, type: 'spring' }}
                            style={{ background: post.gradient }}
                            whileHover={{ scale: 1.1, zIndex: 2 }}
                          >
                            <span className="insta-post-icon">{post.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {platform.id === 'linkedin' && (
                      <div className="linkedin-preview">
                        <motion.div
                          className="linkedin-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="linkedin-avatar">DK</div>
                          <h4>{platform.preview.name}</h4>
                          <p>{platform.preview.headline}</p>
                          <div className="linkedin-stats">
                            <span>{platform.preview.connections} Connections</span>
                            <span>{platform.preview.posts} Posts</span>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    <motion.a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-cta hoverable"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {platform.cta} <FaArrowRight />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="social-card-footer">
                <span className="social-tap-hint">
                  {expandedCard === platform.id ? 'Tap to close' : 'Tap to preview'}
                </span>
                <FaExternalLinkAlt />
              </div>
            </div>

            <motion.div
              className="social-card-shine"
              animate={{
                x: [-200, 400],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                delay: idx * 0.5,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SocialHub
