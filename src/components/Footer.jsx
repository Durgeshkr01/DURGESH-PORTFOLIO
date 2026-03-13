import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedinIn, FaHeart, FaArrowUp, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"
            fill="rgba(0,240,255,0.05)"
            className="wave-path"
          />
        </svg>
      </div>

      <div className="footer-content">
        <motion.div
          className="footer-logo"
          whileHover={{ scale: 1.05 }}
        >
          <span className="logo-bracket">&lt;</span>
          Durgesh Kumar
          <span className="logo-bracket">/&gt;</span>
        </motion.div>

        <div className="footer-socials">
          {[
            { icon: <FaGithub />, href: 'https://github.com/Durgeshkr01', label: 'GitHub' },
            { icon: <FaInstagram />, href: 'https://www.instagram.com/dp.visualdiary?igsh=bHhwamptNHpqOW9i', label: 'Instagram' },
            { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/durgesh-kumar-4709a12a5', label: 'LinkedIn' },
            { icon: <FaWhatsapp />, href: 'https://wa.me/919939128165', label: 'WhatsApp' },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social hoverable"
              whileHover={{ y: -5, color: '#00f0ff' }}
              whileTap={{ scale: 0.9 }}
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        <p className="footer-text">
          Designed & Built with <FaHeart className="heart-icon" /> by Durgesh Kumar
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>

      <motion.button
        className="scroll-top hoverable"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,240,255,0.4)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  )
}

export default Footer
