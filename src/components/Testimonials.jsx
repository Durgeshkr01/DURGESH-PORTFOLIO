import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'Rahul Verma',
    role: 'Startup Founder',
    text: 'Durgesh delivered our website fast, clean, and exactly aligned with business goals.',
  },
  {
    name: 'Priya Singh',
    role: 'Content Creator',
    text: 'His editing and web presentation quality made my brand look instantly premium.',
  },
  {
    name: 'Dr. A. Mishra',
    role: 'Faculty Mentor',
    text: 'Strong technical clarity with practical execution. He consistently builds production-ready work.',
  },
]

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">07.</span>
        <h2 className="section-title">Testimonials</h2>
        <div className="section-line" />
      </motion.div>

      <motion.p
        className="testimonials-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        What people say after working with me.
      </motion.p>

      <div className="testimonials-grid">
        {testimonials.map((item, idx) => (
          <motion.article
            key={item.name}
            className="testimonial-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.12 + 0.25 }}
            whileHover={{ y: -8 }}
          >
            <p className="testimonial-text">\"{item.text}\"</p>
            <div className="testimonial-footer">
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
