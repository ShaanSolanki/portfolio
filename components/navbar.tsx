"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaGithub />, path: "https://github.com" },
    { icon: <FaLinkedin />, path: "https://linkedin.com" },
    { icon: <FaTwitter />, path: "https://twitter.com" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4",
        isMounted ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={clsx(
          "container mx-auto px-6 backdrop-blur-lg transition-all duration-500",
          isScrolled 
            ? "bg-[#0a0a0a]/95 border-b border-indigo-500/20" 
            : "bg-[#0a0a0a]/80 border-b border-indigo-500/10",
          "shadow-lg shadow-indigo-500/10"
        )}
      >
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo with animated gradient */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 transition-all duration-500 flex items-center"
              onMouseEnter={() => setIsHovering("logo")}
              onMouseLeave={() => setIsHovering(null)}
            >
              <motion.span 
                className="mr-2"
                animate={{
                  rotate: isHovering === "logo" ? [0, 10, -10, 0] : 0,
                  transition: { duration: 0.5 }
                }}
              >
                {"</>"}
              </motion.span>
              <span>SHAAN SOLANKI</span>
              {isHovering === "logo" && (
                <motion.span
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
                  layoutId="nav-underline"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div 
                key={link.path}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setIsHovering(link.path)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <Link
                  href={link.path}
                  className="relative px-2 py-1 text-indigo-100 hover:text-white transition-colors duration-300 text-lg font-medium"
                >
                  {link.name}
                  {isHovering === link.path && (
                    <motion.span
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
                      layoutId="nav-underline"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.span
                    className="absolute inset-0 rounded-md opacity-0 hover:opacity-100"
                    style={{
                      boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
                      background: "transparent",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {/* Social Links with glow effect */}
            <div className="flex items-center space-x-5 ml-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.path}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    y: -3,
                    scale: 1.2,
                    color: "#a78bfa"
                  }}
                  className="text-indigo-300 hover:text-indigo-100 transition-all duration-300 text-xl relative"
                >
                  {social.icon}
                  <motion.span
                    className="absolute inset-0 rounded-full opacity-0 hover:opacity-100"
                    style={{
                      boxShadow: "0 0 10px rgba(167, 139, 250, 0.6)",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Resume Button with animated gradient border */}
            <motion.button
              onClick={handleResumeDownload}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
                backgroundColor: "rgba(99, 102, 241, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="ml-6 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-100 hover:text-white flex items-center gap-2 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={{
                    y: [0, -2, 0],
                    transition: { repeat: Infinity, duration: 1.5 }
                  }}
                >
                  <FiDownload />
                </motion.span>
                <span>Resume</span>
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </nav>

          {/* Mobile menu button with animated lines */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-indigo-200 hover:text-white focus:outline-none transition-colors duration-300 relative group"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <div className="flex flex-col items-center justify-center w-6 h-6">
                <motion.span 
                  className="block w-6 h-0.5 bg-indigo-200 mb-1.5 group-hover:bg-white"
                  animate={{ 
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0
                  }}
                />
                <motion.span 
                  className="block w-6 h-0.5 bg-indigo-200 group-hover:bg-white"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                />
                <motion.span 
                  className="block w-6 h-0.5 bg-indigo-200 mt-1.5 group-hover:bg-white"
                  animate={{ 
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0
                  }}
                />
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation with gradient background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1e1b4b] backdrop-blur-xl z-40 pt-24"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-col px-8 space-y-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={{
                    open: { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 100,
                        damping: 10
                      }
                    },
                    closed: { 
                      opacity: 0, 
                      x: -30,
                      transition: { 
                        type: "spring",
                        stiffness: 100,
                        damping: 10
                      }
                    },
                  }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-2xl text-indigo-100 hover:text-white transition-colors duration-300 font-medium border-b border-indigo-500/20 relative group"
                  >
                    <span className="relative z-10 flex items-center">
                      <motion.span 
                        className="inline-block mr-3 text-purple-400"
                        animate={{
                          x: [0, 5, 0],
                          transition: { repeat: Infinity, duration: 2, delay: index * 0.2 }
                        }}
                      >
                        ▸
                      </motion.span>
                      {link.name}
                    </span>
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-500"
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  open: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  },
                  closed: { 
                    opacity: 0, 
                    y: 20,
                    transition: { 
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  },
                }}
                className="flex justify-center space-x-8 pt-8"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.path}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.3,
                      color: "#a78bfa",
                      y: -5
                    }}
                    className="text-indigo-300 hover:text-indigo-100 transition-colors duration-300 text-2xl"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                variants={{
                  open: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  },
                  closed: { 
                    opacity: 0, 
                    y: 20,
                    transition: { 
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  },
                }}
                className="pt-8"
              >
                <button
                  onClick={() => {
                    handleResumeDownload();
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 hover:border-indigo-400/60 text-indigo-100 hover:text-white flex items-center justify-center gap-3 text-xl font-medium transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                  <motion.span
                    animate={{
                      y: [0, -3, 0],
                      transition: { repeat: Infinity, duration: 1.5 }
                    }}
                  >
                    <FiDownload />
                  </motion.span>
                  <span>Download Resume</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}