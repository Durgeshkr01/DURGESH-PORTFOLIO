import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPhone } from 'react-icons/fa'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [focused, setFocused] = useState(null)
  const [status, setStatus] = useState('idle') // idle, sending, sent, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      // Using Web3Forms - free form submission service
      // Replace YOUR_ACCESS_KEY with your Web3Forms access key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY', // Get your free key at https://web3forms.com
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      })
      
      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      // Fallback: open mailto
      const mailtoLink = `mailto:durgeshraj0852@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      window.open(mailtoLink, '_blank')
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-number">06.</span>
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-line" />
      </motion.div>

      <div className="contact-grid">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h3 className="contact-heading">
            Let&apos;s create something <span className="gradient-text">amazing</span> together
          </h3>
          <p className="contact-text">
            Looking for a developer or video editor? Want to collaborate on a project?
            Reach out to me directly!
          </p>

          <div className="contact-details">
            <motion.a 
              href="https://wa.me/919939128165" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-detail contact-whatsapp hoverable" 
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <FaWhatsapp className="contact-icon whatsapp-icon" />
              <span>+91 9939128165 (WhatsApp)</span>
            </motion.a>
            <motion.a 
              href="mailto:durgeshraj0852@gmail.com"
              className="contact-detail hoverable" 
              whileHover={{ x: 10 }}
            >
              <FaEnvelope className="contact-icon" />
              <span>durgeshraj0852@gmail.com</span>
            </motion.a>
            <motion.a 
              href="tel:+919939128165"
              className="contact-detail hoverable" 
              whileHover={{ x: 10 }}
            >
              <FaPhone className="contact-icon" />
              <span>+91 9939128165</span>
            </motion.a>
            <motion.div className="contact-detail" whileHover={{ x: 10 }}>
              <FaMapMarkerAlt className="contact-icon" />
              <span>India 🇮🇳</span>
            </motion.div>
          </div>

          <div className="contact-decoration">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="contact-floating-dot"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.4,
                  repeat: Infinity,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${60 + (i % 3) * 10}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
        >
          {[
            { name: 'name', type: 'text', label: 'Your Name' },
            { name: 'email', type: 'email', label: 'Your Email' },
          ].map((field) => (
            <div
              key={field.name}
              className={`form-group ${focused === field.name ? 'focused' : ''}`}
            >
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused(null)}
                placeholder=" "
              />
              <label>{field.label}</label>
              <div className="form-line" />
            </div>
          ))}

          <div className={`form-group ${focused === 'message' ? 'focused' : ''}`}>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              placeholder=" "
            />
            <label>Your Message</label>
            <div className="form-line" />
          </div>

          <motion.button
            type="submit"
            className={`contact-submit hoverable ${status === 'sent' ? 'sent' : ''} ${status === 'error' ? 'error' : ''}`}
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,240,255,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'sending' ? (
              <>Sending...</>
            ) : status === 'sent' ? (
              <>✓ Message Sent!</>
            ) : status === 'error' ? (
              <>✕ Error, Try Again</>
            ) : (
              <>
                Send Message <FaPaperPlane />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact
