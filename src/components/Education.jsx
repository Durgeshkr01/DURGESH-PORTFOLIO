import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaExternalLinkAlt, FaFilePdf, FaGraduationCap, FaSchool, FaUniversity } from 'react-icons/fa'
import { educationData } from '../data/educationData'

const iconByType = {
  college: <FaUniversity />,
  intermediate: <FaGraduationCap />,
  school: <FaSchool />,
}

const InstitutionMedia = ({ src, alt, fallback, accent }) => {
  const [broken, setBroken] = useState(false)

  if (!src || broken) {
    return (
      <div className="edu-media-fallback" style={{ '--edu-accent': accent }}>
        {fallback}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="edu-media"
      loading="lazy"
      onError={() => setBroken(true)}
    />
  )
}

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="education" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">06.</span>
        <h2 className="section-title">Education</h2>
        <div className="section-line" />
      </motion.div>

      <motion.p
        className="education-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        Academic journey with marksheet-backed milestones and verified score highlights.
      </motion.p>

      <motion.div
        className="education-score-strip"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div>
          <strong>{educationData[0].scoreValue}</strong>
          <span>B.Tech CGPA</span>
        </div>
        <div>
          <strong>{educationData[1].scoreValue}</strong>
          <span>Class 12 (364/500)</span>
        </div>
        <div>
          <strong>{educationData[2].scoreValue}</strong>
          <span>Class 10</span>
        </div>
      </motion.div>

      <div className="education-grid">
        {educationData.map((item, index) => (
          <motion.article
            key={item.level}
            className="education-card hoverable"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.12, duration: 0.55 }}
            whileHover={{ y: -8, boxShadow: `0 18px 34px ${item.accent}44` }}
            style={{ '--edu-accent': item.accent }}
          >
            <div className="education-card-top">
              <div className="education-media-wrap">
                <InstitutionMedia
                  src={item.image}
                  alt={item.institution}
                  fallback={item.fallback}
                  accent={item.accent}
                />
              </div>

              <div className="education-score-badge">
                <span>{item.scoreLabel}</span>
                <strong>{item.scoreValue}</strong>
              </div>
            </div>

            <h3>{item.level}</h3>
            <p className="education-institute">{item.institution}</p>

            <div className="education-meta">
              <span className="education-icon">{iconByType[item.type] || <FaSchool />}</span>
              <span>{item.period}</span>
            </div>

            {item.proofUrl && (
              <motion.a
                href={item.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="education-proof hoverable"
                whileHover={{ x: 4 }}
              >
                {item.proofUrl.endsWith('.pdf') ? <FaFilePdf /> : <FaExternalLinkAlt />}
                {item.proofLabel}
              </motion.a>
            )}

            <div className="education-glow" />
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Education
