'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-indigo-900/30">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row justify-between gap-12"
        >
          {/* Left section - Branding */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-[length:400%_auto] animate-gradient-shift">
              SHAAN SOLANKI
            </h2>
            <p className="text-lg text-indigo-200/90 max-w-md">
              Crafting immersive digital experiences with cutting-edge web technologies.
            </p>
          </div>

          {/* Right section - Links */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Navigation */}
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Navigation</h3>
                <ul className="space-y-4">
                  {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item.toLowerCase()}`} 
                        className="text-indigo-300 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <span className="text-indigo-400">$</span> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Connect</h3>
                <div className="space-y-4">
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors"
                  >
                    <FiLinkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://twitter.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors"
                  >
                    <FiTwitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </a>
                  <a 
                    href="mailto:hello@example.com" 
                    className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors"
                  >
                    <FiMail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 pt-8 border-t border-indigo-900/30 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-indigo-300/80 text-sm">
            © {new Date().getFullYear()} Shaan Solanki. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-indigo-300/80 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-indigo-300/80 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-indigo-400/20"
          style={{
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            filter: 'blur(1px)',
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </footer>
  );
}