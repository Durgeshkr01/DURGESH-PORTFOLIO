import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaVideo, FaMobile, FaPalette, FaRocket, FaWhatsapp } from 'react-icons/fa'

const services = [
  {
    icon: <FaCode />,
    title: 'Web Development',
    description: 'Modern, responsive websites built with React, Next.js, and cutting-edge technologies.',
    color: '#00f0ff',
  },
  {
    icon: <FaVideo />,
    title: 'Video Editing',
    description: 'Professional video editing for YouTube, Instagram Reels, short films, and promotional content.',
    color: '#ff2d75',
  },
  {
    icon: <FaMobile />,
    title: 'UI/UX Design',
    description: 'Beautiful, user-friendly interfaces that engage and convert your audience.',
    color: '#7b2fff',
  },
  {
    icon: <FaPalette />,
    title: 'Motion Graphics',
    description: 'Eye-catching animations, intros, and visual effects for your videos and presentations.',
    color: '#f7df1e',
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
        What I can do for you — Let&apos;s bring your ideas to life!
      </motion.p>

      <div className="services-grid">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="service-card hoverable"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ 
              y: -10, 
              boxShadow: `0 20px 40px ${service.color}33`,
            }}
            style={{ '--service-color': service.color }}
          >
            <div className="service-icon" style={{ color: service.color }}>
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <div className="service-glow" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="services-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        <p className="cta-text">Interested in working together?</p>
        <motion.a
          href="https://wa.me/919939128165?text=Hi%20Durgesh!%20I%20saw%20your%20portfolio%20and%20I'm%20interested%20in%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="cta-whatsapp hoverable"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37,211,102,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp /> Chat on WhatsApp
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Services
