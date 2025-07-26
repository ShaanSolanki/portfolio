'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiExternalLink } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    if (path.includes('#') && pathname === "/") {
      const sectionId = path.split('#')[1];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const navLinks = [
    { name: "Home", path: "/#home" },
    { name: "Services", path: "/#services" },
    { name: "Skills", path: "/#skills" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  const socialLinks = [
    { icon: <FiGithub />, path: "https://github.com/ShaanSolanki", label: "GitHub" },
    { icon: <FiLinkedin />, path: "https://linkedin.com/in/shaan-solanki-6212b0369/", label: "LinkedIn" },
    { icon: <FiTwitter />, path: "https://twitter.com", label: "Twitter" },
    { icon: <FiMail />, path: "mailto:shaansolanki17@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-indigo-500/20">
      <div className="w-full max-w-7xl mx-auto"> {/* Increased max-width to 7xl */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row justify-between gap-12"
        >
          {/* Left section - Branding */}
          <div className="lg:w-2/5 mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              SHAAN SOLANKI
            </h2>
            <p className="text-base md:text-lg text-indigo-200/90">
              Crafting immersive digital experiences with cutting-edge web technologies.
            </p>
          </div>

          {/* Right section - Links */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Navigation and Connect side by side */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Navigation</h3>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {navLinks.map((item) => (
                      <li key={item.path}>
                        <button
                          onClick={() => handleNavigation(item.path)}
                          className="text-indigo-300 hover:text-white transition-colors flex items-center gap-2 w-full text-left text-sm md:text-base"
                        >
                          <span className="text-purple-400">▸</span> {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Connect</h3>
                  <ul className="space-y-4">
                    {socialLinks.map((social) => (
                      <li key={social.path}>
                        <a 
                          href={social.path} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors group"
                        >
                          <motion.span
                            whileHover={{ scale: 1.2 }}
                            className="group-hover:text-purple-400 transition-colors p-2 rounded-lg bg-indigo-900/30 border border-indigo-400/20 group-hover:border-indigo-300/50"
                          >
                            {social.icon}
                          </motion.span>
                          <span className="text-sm md:text-base">{social.label}</span>
                          <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
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
          className="mt-12 pt-8 border-t border-indigo-500/20 flex flex-col md:flex-row justify-between items-center gap-4"
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
        <motion.div 
          key={i}
          className="absolute rounded-full bg-indigo-400/20"
          style={{
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, Math.random() * 20 - 10],
            x: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </footer>
  );
}