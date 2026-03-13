import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppFloat = () => {
  return (
    <motion.a
      href="https://wa.me/919939128165?text=Hi%20Durgesh!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float hoverable"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: '0 0 30px rgba(37,211,102,0.6)',
      }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-tooltip">Chat with me!</span>
    </motion.a>
  )
}

export default WhatsAppFloat
