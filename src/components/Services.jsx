import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaMobile,
  FaPalette,
  FaRocket,
  FaWhatsapp,
} from 'react-icons/fa'

const services = [
  {
    icon: <FaCode />,
    title: 'Premium Web Development',
    description:
      'Fast, modern websites and web apps engineered for smooth UX, strong SEO, and clean scalability.',
    deliverables: ['Landing Page or Multi-page Build', 'Speed + SEO Optimization', 'Deployment + Analytics Setup'],
    bestFor: 'Founders, personal brands, and growing businesses',
    timeline: '7-14 days',
    color: '#00f0ff',
    featured: true,
  },
  {
    icon: <FaMobile />,
    title: 'UI/UX Design Systems',
    description:
      'Conversion-focused interface design with reusable UI blocks and consistent visual language.',
    deliverables: ['Wireframe + Hi-Fi Screens', 'Design Tokens & Components', 'Responsive Layout Rules'],
    bestFor: 'SaaS, product ideas, and app redesigns',
    timeline: '5-10 days',
    color: '#7b2fff',
  },
  {
    icon: <FaPalette />,
    title: 'Motion + Visual Content',
    description:
      'High-retention short-form edits, motion graphics, and branded visual storytelling for social media.',
    deliverables: ['Reels/Shorts Editing', 'Kinetic Text + Motion FX', 'Brand-safe Export Pack'],
    bestFor: 'Creators and marketing campaigns',
    timeline: '48-72 hours',
    color: '#ff9f1c',
  },
]

const processSteps = [
  {
    title: 'Discover',
    text: 'We align on goals, audience, and timeline with a quick strategy call.',
  },
  {
    title: 'Build',
    text: 'I design and develop in focused milestones with regular updates.',
  },
  {
    title: 'Launch',
    text: 'Final QA, deployment support, and handover so everything runs smoothly.',
  },
]

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="services" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">02.</span>
        <h2 className="section-title">Services</h2>
        <div className="section-line" />
      </motion.div>

      <motion.p
        className="services-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        High-impact creative and development services crafted to make your brand stand out and convert better.
      </motion.p>

      <motion.div
        className="services-trustbar"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <span>Modern Stack</span>
        <span>Quick Turnaround</span>
        <span>Performance First</span>
        <span>Clean Communication</span>
      </motion.div>

      <div className="services-grid">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className={`service-card hoverable ${service.featured ? 'service-card--featured' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{
              y: -10, 
              boxShadow: `0 20px 40px ${service.color}33`,
            }}
            style={{ '--service-color': service.color }}
          >
            {service.featured && <span className="service-badge">Most Booked</span>}
            <div className="service-icon" style={{ color: service.color }}>
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>

            <ul className="service-list">
              {service.deliverables.map((item) => (
                <li key={item}>
                  <FaCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="service-meta">
              <span className="service-timeline">Delivery: {service.timeline}</span>
              <span className="service-bestfor">Best for: {service.bestFor}</span>
            </div>

            <div className="service-glow" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="services-process"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.55 }}
      >
        {processSteps.map((step, index) => (
          <div key={step.title} className="process-step">
            <span className="process-number">0{index + 1}</span>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="services-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7 }}
      >
        <p className="cta-text">Have a project in mind? Let&apos;s ship something exceptional.</p>
        <div className="services-cta-actions">
          <motion.a
            href="https://wa.me/919939128165?text=Hi%20Durgesh!%20I%20want%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp hoverable"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37,211,102,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Chat on WhatsApp
          </motion.a>

          <motion.a
            href="#contact"
            className="cta-secondary hoverable"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Start a Project <FaArrowRight />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default Services
