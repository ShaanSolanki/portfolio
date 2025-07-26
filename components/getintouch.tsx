'use client';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

// Define type for social media links
type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
};

export default function ContactSection() {
  const socialLinks: SocialLink[] = [
    { 
      icon: <FiGithub />, 
      href: "https://github.com/ShaanSolanki", 
      label: "GitHub",
      color: "hover:text-purple-400"
    },
    { 
      icon: <FiLinkedin />, 
      href: "https://www.linkedin.com/in/shaan-solanki-6212b0369/", 
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    { 
      icon: <FiTwitter />, 
      href: "https://twitter.com", 
      label: "Twitter",
      color: "hover:text-sky-400"
    },
  ];

  return (
    <section id="contact" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/10"
            style={{
              width: `${Math.random() * 12 + 4}px`,
              height: `${Math.random() * 12 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1.5px)',
            }}
            animate={{
              y: [0, Math.random() * 60 - 30],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Enhanced Heading with animated gradient */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-[length:400%_auto] animate-gradient-shift">
            Contact Me
          </h2>
          <motion.p 
            className="text-lg md:text-xl text-indigo-200/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project or collaboration in mind? Let&apos;s connect!
          </motion.p>
        </motion.div>

        {/* Premium Contact Card with enhanced effects */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 rounded-xl bg-gradient-to-br from-indigo-900/30 to-indigo-900/10 backdrop-blur-lg border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-500 max-w-2xl mx-auto relative overflow-hidden group shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right, #818cf8 1px, transparent 1px), linear-gradient(to bottom, #818cf8 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          
          <div className="space-y-8 text-center relative z-10">
            <motion.h3 
              className="text-xl md:text-2xl font-medium text-white mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Contact Information
            </motion.h3>
            
            <div className="space-y-6">
              <motion.a 
                href="mailto:shaansolanki17@gmail.com" 
                className="flex items-center justify-center gap-3 text-indigo-300 hover:text-white transition-colors group"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.span 
                  whileHover={{ scale: 1.3 }}
                  className="group-hover:text-purple-400 transition-colors bg-indigo-900/30 p-3 rounded-lg border border-indigo-400/20 group-hover:border-indigo-300/50"
                >
                  <FiMail className="w-5 h-5" />
                </motion.span>
                <span className="text-lg">shaansolanki17@gmail.com</span>
              </motion.a>
              
              <motion.a 
                href="tel:+919021606508" 
                className="flex items-center justify-center gap-3 text-indigo-300 hover:text-white transition-colors group"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.span 
                  whileHover={{ scale: 1.3 }}
                  className="group-hover:text-purple-400 transition-colors bg-indigo-900/30 p-3 rounded-lg border border-indigo-400/20 group-hover:border-indigo-300/50"
                >
                  <FiPhone className="w-5 h-5" />
                </motion.span>
                <span className="text-lg">+91 90216 06508</span>
              </motion.a>
            </div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg md:text-xl text-white mb-6">Connect With Me</h4>
              <div className="flex justify-center gap-6 flex-wrap">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-indigo-300 ${social.color} transition-colors group relative`}
                    aria-label={social.label}
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.1 }}
                      className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-400/20 group-hover:border-indigo-300/50 transition-all shadow-sm hover:shadow-md"
                    >
                      <motion.span
                        whileHover={{ scale: 1.2 }}
                        className={`transition-colors block text-xl ${social.color}`}
                      >
                        {social.icon}
                      </motion.span>
                    </motion.div>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-10 transition-all duration-300 text-xs text-indigo-300 whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}