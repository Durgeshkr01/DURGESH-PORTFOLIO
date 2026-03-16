import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { FaClock, FaExternalLinkAlt, FaFilter, FaSearch } from 'react-icons/fa'
import { projectsData, projectCategories } from '../data/projectsData'
import { trackEvent } from '../utils/analytics'

const FeaturedProjectShot = ({ project }) => {
  const shots = project.caseStudy?.screenshots?.filter(Boolean) || []
  const [currentIndex, setCurrentIndex] = useState(0)

  const fallbackImage = '/profile.jpg'
  const currentShot = shots[currentIndex] || fallbackImage

  return (
    <img
      src={currentShot}
      alt={`${project.name} screenshot`}
      className="featured-project-shot"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        setCurrentIndex((prev) => {
          if (prev < shots.length - 1) {
            return prev + 1
          }
          return prev
        })
      }}
    />
  )
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTech, setActiveTech] = useState('All')
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)

  const featuredProjects = useMemo(
    () => projectsData.filter((project) => project.featured).slice(0, 3),
    [],
  )

  const techOptions = useMemo(() => {
    const chips = new Set(projectsData.flatMap((project) => project.tech))
    return ['All', ...Array.from(chips)]
  }, [])

  const filteredProjects = useMemo(
    () =>
      projectsData.filter((project) => {
        const categoryMatch =
          selectedCategory === 'All' || project.category === selectedCategory
        const techMatch = activeTech === 'All' || project.tech.includes(activeTech)
        const query = searchTerm.trim().toLowerCase()
        const searchMatch =
          query.length === 0 ||
          project.name.toLowerCase().includes(query) ||
          project.summary.toLowerCase().includes(query) ||
          project.tech.some((item) => item.toLowerCase().includes(query))

        return categoryMatch && techMatch && searchMatch
      }),
    [activeTech, searchTerm, selectedCategory],
  )

  const openLiveDemo = (project, location) => {
    if (!project.liveUrl) {
      return
    }

    trackEvent('Project card clicked', {
      project: project.name,
      location,
      category: project.category,
    })
    window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
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
        Featured case studies first, then filterable live projects with tags and search.
      </motion.p>

      <div className="featured-projects-grid">
        {featuredProjects.map((project, i) => (
          <motion.article
            key={project.name}
            className="featured-project-card"
            initial={{ opacity: 0, y: 45 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <FeaturedProjectShot project={project} />
            <div className="featured-project-overlay" />
            <div className="featured-project-content">
              <span className="featured-project-pill">Featured Project</span>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="project-tech-list">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  type="button"
                  className="project-action-btn"
                  onClick={() => openLiveDemo(project, 'featured')}
                >
                  Live Demo <FaExternalLinkAlt />
                </button>
                <button
                  type="button"
                  className="project-action-btn secondary"
                  onClick={() => setActiveCaseStudy(project)}
                >
                  Case Study
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="project-filters">
        <div className="project-search-wrap">
          <FaSearch />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by project name, stack, or summary"
          />
        </div>

        <div className="project-category-filter">
          <FaFilter />
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="project-tech-chips">
          {techOptions.map((tech) => (
            <button
              key={tech}
              type="button"
              className={activeTech === tech ? 'active' : ''}
              onClick={() => setActiveTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, i) => (
          <motion.article
            key={project.name}
            className={`project-card project-card-split ${!project.liveUrl ? 'project-card-disabled' : ''}`}
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05, duration: 0.45 }}
          >
            <div className="project-card-inner">
              <div className="project-card-header">
                <div className="project-folder">🚀</div>
                <span className="project-updated">
                  <FaClock /> {project.updated}
                </span>
              </div>

              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.summary}</p>

              <div className="project-meta">
                <span className="project-lang">Category: {project.category}</span>
                <span className="project-stars">Node {project.nodeVersion}</span>
              </div>

              <div className="project-tech-list compact">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-actions">
                <button
                  type="button"
                  className="project-action-btn"
                  disabled={!project.liveUrl}
                  onClick={() => openLiveDemo(project, 'all_projects')}
                >
                  Live Demo <FaExternalLinkAlt />
                </button>
                <button
                  type="button"
                  className="project-action-btn secondary"
                  onClick={() => setActiveCaseStudy(project)}
                >
                  Case Study
                </button>
              </div>

              <div className="project-card-glow" />
            </div>
          </motion.article>
        ))}
      </div>

      <motion.a
        href="https://vercel.com/durgeshraj0852-1771s-projects"
        target="_blank"
        rel="noopener noreferrer"
        className="projects-view-all hoverable"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(123,47,255,0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        View All on Vercel →
      </motion.a>

      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            className="case-study-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCaseStudy(null)}
          >
            <motion.article
              className="case-study-modal"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="case-study-close"
                onClick={() => setActiveCaseStudy(null)}
              >
                ×
              </button>
              <h3>{activeCaseStudy.name} Case Study</h3>
              <div className="case-study-content">
                <p>
                  <strong>Problem:</strong> {activeCaseStudy.caseStudy.problem}
                </p>
                <p>
                  <strong>Approach:</strong> {activeCaseStudy.caseStudy.approach}
                </p>
                <p>
                  <strong>Tech Decisions:</strong> {activeCaseStudy.caseStudy.techDecisions}
                </p>
                <p>
                  <strong>Result:</strong> {activeCaseStudy.caseStudy.result}
                </p>
              </div>

              <div className="case-study-shots">
                {activeCaseStudy.caseStudy.screenshots.map((shot, idx) => (
                  <img
                    key={`${activeCaseStudy.name}-shot-${idx}`}
                    src={shot}
                    alt={`${activeCaseStudy.name} case study screenshot ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              {activeCaseStudy.liveUrl && (
                <button
                  type="button"
                  className="project-action-btn"
                  onClick={() => openLiveDemo(activeCaseStudy, 'case_study')}
                >
                  Open Live Demo <FaExternalLinkAlt />
                </button>
              )}
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
