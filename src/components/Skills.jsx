import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaPython, FaFigma, FaGithub,
} from 'react-icons/fa'
import {
  SiJavascript, SiTailwindcss, SiMongodb, SiExpress, SiVite, SiFirebase, SiTypescript, SiNextdotjs,
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <FaReact />, color: '#61dafb' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
      { name: 'HTML5', icon: <FaHtml5 />, color: '#e34f26' },
      { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572b6' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38bdf8' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
      { name: 'Vite', icon: <SiVite />, color: '#646cff' },
    ],
  },
  {
    title: 'Backend & Tools',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
      { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
      { name: 'Firebase', icon: <SiFirebase />, color: '#ffca28' },
      { name: 'Python', icon: <FaPython />, color: '#3776ab' },
      { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
      { name: 'GitHub', icon: <FaGithub />, color: '#ffffff' },
      { name: 'Figma', icon: <FaFigma />, color: '#f24e1e' },
    ],
  },
]

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="skills" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">03.</span>
        <h2 className="section-title">Skills & Tech</h2>
        <div className="section-line" />
      </motion.div>

      <div className="skills-container">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            className="skill-category"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: catIndex * 0.2 }}
          >
            <h3 className="skill-category-title">{category.title}</h3>
            <div className="skill-grid">
              {category.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className="skill-card hoverable"
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{
                    delay: catIndex * 0.2 + i * 0.08,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.1,
                    boxShadow: `0 20px 40px ${skill.color}33`,
                    transition: { duration: 0.2 },
                  }}
                  style={{ '--skill-color': skill.color }}
                >
                  <div className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-glow" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="skills-orbit">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`orbit orbit-${i}`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Skills
