import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPhone } from 'react-icons/fa'
import { trackEvent } from '../utils/analytics'
import { profileData } from '../data/profileData'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY
  const [focused, setFocused] = useState(null)
  const [status, setStatus] = useState('idle') // idle, sending, sent, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' })
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.company) {
      return
    }

    const lastSubmission = Number(localStorage.getItem('portfolio_last_contact_submit') || 0)
    const now = Date.now()
    if (now - lastSubmission < 45000) {
      setStatus('error')
      setToast({ type: 'error', message: 'Please wait 45 seconds before sending another message.' })
      setTimeout(() => setToast(null), 2800)
      return
    }

    setStatus('sending')

    const mailtoLink = `mailto:${profileData.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`

    if (!web3FormsKey) {
      window.open(mailtoLink, '_blank')
      setStatus('sent')
      localStorage.setItem('portfolio_last_contact_submit', String(now))
      setFormData({ name: '', email: '', message: '', company: '' })
      setToast({ type: 'success', message: 'Opened your email app. Please send the drafted message.' })
      trackEvent('Contact submitted', { source: 'mailto_fallback' })
      setTimeout(() => setStatus('idle'), 3500)
      setTimeout(() => setToast(null), 3200)
      return
    }
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          botcheck: '',
        }),
      })

      const result = await response.json()
      
      if (response.ok && result.success) {
        setStatus('sent')
        localStorage.setItem('portfolio_last_contact_submit', String(now))
        setFormData({ name: '', email: '', message: '', company: '' })
        setToast({ type: 'success', message: 'Message sent successfully. I will get back soon.' })
        trackEvent('Contact submitted', { source: 'web3forms' })
        setTimeout(() => setStatus('idle'), 4000)
        setTimeout(() => setToast(null), 3200)
      } else {
        window.open(mailtoLink, '_blank')
        setStatus('sent')
        setToast({ type: 'success', message: 'API issue detected. Opened email fallback for reliable delivery.' })
        trackEvent('Contact submitted', { source: 'api_fallback' })
        setTimeout(() => setStatus('idle'), 3500)
        setTimeout(() => setToast(null), 3200)
      }
    } catch {
      // Fallback: open mailto
      window.open(mailtoLink, '_blank')
      setStatus('sent')
      localStorage.setItem('portfolio_last_contact_submit', String(now))
      setFormData({ name: '', email: '', message: '', company: '' })
      setToast({ type: 'success', message: 'Network issue detected. Opened email fallback.' })
      trackEvent('Contact submitted', { source: 'network_fallback' })
      setTimeout(() => setStatus('idle'), 4000)
      setTimeout(() => setToast(null), 3200)
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
        <span className="section-number">08.</span>
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-line" />
      </motion.div>

      {toast && <div className={`contact-toast ${toast.type}`}>{toast.message}</div>}

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
              href={profileData.whatsapp}
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-detail contact-whatsapp hoverable" 
              whileHover={{ x: 10, scale: 1.02 }}
              onClick={() => trackEvent('WhatsApp clicked', { source: 'contact_info' })}
            >
              <FaWhatsapp className="contact-icon whatsapp-icon" />
              <span>{profileData.phone} (WhatsApp)</span>
            </motion.a>
            <motion.a 
              href={`mailto:${profileData.email}`}
              className="contact-detail hoverable" 
              whileHover={{ x: 10 }}
            >
              <FaEnvelope className="contact-icon" />
              <span>{profileData.email}</span>
            </motion.a>
            <motion.a 
              href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
              className="contact-detail hoverable" 
              whileHover={{ x: 10 }}
            >
              <FaPhone className="contact-icon" />
              <span>{profileData.phone}</span>
            </motion.a>
            <motion.div className="contact-detail" whileHover={{ x: 10 }}>
              <FaMapMarkerAlt className="contact-icon" />
              <span>{profileData.location}</span>
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

          <input
            type="text"
            name="company"
            tabIndex="-1"
            autoComplete="off"
            className="contact-honeypot"
            value={formData.company}
            onChange={handleChange}
          />

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

          {status === 'sent' && (
            <motion.a
              href={`https://wa.me/${profileData.phone.replace(/\D/g, '')}?text=Hi%20Durgesh!%20I%20just%20submitted%20the%20contact%20form.`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-followup-whatsapp"
              onClick={() => trackEvent('WhatsApp clicked', { source: 'contact_followup' })}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaWhatsapp /> Quick follow-up on WhatsApp
            </motion.a>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default Contact
