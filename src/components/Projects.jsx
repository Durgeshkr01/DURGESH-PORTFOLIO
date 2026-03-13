import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { FaStar, FaCodeBranch, FaExternalLinkAlt, FaCss3Alt } from 'react-icons/fa'
import { SiJavascript, SiPython, SiHtml5, SiTypescript } from 'react-icons/si'

const langIcons = {
  JavaScript: <SiJavascript style={{ color: '#f7df1e' }} />,
  Python: <SiPython style={{ color: '#3776ab' }} />,
  HTML: <SiHtml5 style={{ color: '#e34f26' }} />,
  CSS: <FaCss3Alt style={{ color: '#1572b6' }} />,
  TypeScript: <SiTypescript style={{ color: '#3178c6' }} />,
}

const langColors = {
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  HTML: '#e34f26',
  CSS: '#1572b6',
  TypeScript: '#3178c6',
  Shell: '#89e051',
  Java: '#b07219',
  'C++': '#f34b7d',
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/Durgeshkr01/repos?sort=updated&per_page=12')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter((r) => !r.fork))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    setHoveredCard(index)
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    setHoveredCard(null)
  }

  return (
    <section id="projects" className="projects" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">04.</span>
        <h2 className="section-title">My Projects</h2>
        <div className="section-line" />
      </motion.div>

      <motion.p
        className="projects-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        Live from my GitHub — hover for 3D effect, click to explore
      </motion.p>

      {loading ? (
        <div className="projects-loader">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="project-skeleton"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      ) : (
        <div className="projects-grid">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card hoverable ${hoveredCard === i ? 'hovered' : ''}`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="project-card-inner">
                <div className="project-card-header">
                  <div className="project-folder">📂</div>
                  <FaExternalLinkAlt className="project-link-icon" />
                </div>

                <h3 className="project-name">{repo.name}</h3>
                <p className="project-desc">
                  {repo.description || 'No description — mystery project! 🔮'}
                </p>

                <div className="project-meta">
                  {repo.language && (
                    <span className="project-lang">
                      <span
                        className="lang-dot"
                        style={{ background: langColors[repo.language] || '#8b8b8b' }}
                      />
                      {langIcons[repo.language] || null}
                      {repo.language}
                    </span>
                  )}
                  <span className="project-stars">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className="project-forks">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                </div>

                <div className="project-card-glow" />
              </div>
            </motion.a>
          ))}
        </div>
      )}

      <motion.a
        href="https://github.com/Durgeshkr01?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="projects-view-all hoverable"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(123,47,255,0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        View All on GitHub →
      </motion.a>
    </section>
  )
}

export default Projects
