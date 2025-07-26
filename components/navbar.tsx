"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiDownload, FiExternalLink } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaDev } from "react-icons/fa";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import clsx from "clsx";
import { useTheme } from "next-themes";

// Define types for navigation and social links
type NavLink = {
  name: string;
  path: string;
};

type SocialLink = {
  icon: React.ReactNode;
  path: string;
  label: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navbarRef = useRef<HTMLElement>(null);
  const controls = useAnimationControls();
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: "Skills", path: "/#skills" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, path: "https://github.com/ShaanSolanki", label: "GitHub" },
    { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/shaan-solanki-6212b0369/", label: "LinkedIn" },
    { icon: <FaTwitter />, path: "https://twitter.com", label: "Twitter" },
    { icon: <FaDev />, path: "https://dev.to", label: "Dev.to" },
  ];

  // Handle scroll events for navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Animate navbar when visibility changes
  useEffect(() => {
    if (isVisible) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: -100, opacity: 0 });
    }
  }, [isVisible, controls]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleResumeDownload = () => {
    setIsOpen(false);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "shaan_solanki_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      ref={navbarRef}
      initial={{ opacity: 0, y: -20 }}
      animate={controls}
      transition={{ duration: 0.3, ease: "easeOut" }}
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
            ? "bg-[#0a0a0a]/95 dark:bg-[#0a0a0a]/95 border-b border-indigo-500/20" 
            : "bg-[#0a0a0a]/80 dark:bg-[#0a0a0a]/80 border-b border-indigo-500/10",
          "shadow-lg shadow-indigo-500/10"
        )}
      >
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo with animated gradient */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 transition-all duration-500 flex items-center"
              onMouseEnter={() => setIsHovering("logo")}
              onMouseLeave={() => setIsHovering(null)}
              aria-label="Home"
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
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div 
                key={link.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovering(link.path)}
                onMouseLeave={() => setIsHovering(null)}
              >
                {link.path.includes('#') ? (
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="relative px-3 py-1 text-indigo-100 hover:text-white transition-colors duration-300 text-lg font-medium"
                    aria-label={link.name}
                  >
                    {link.name}
                    {isHovering === link.path && (
                      <motion.span
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
                        layoutId="nav-underline"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.path}
                    className="relative px-3 py-1 text-indigo-100 hover:text-white transition-colors duration-300 text-lg font-medium"
                    aria-label={link.name}
                  >
                    {link.name}
                    {isHovering === link.path && (
                      <motion.span
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
                        layoutId="nav-underline"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2 p-2 rounded-full text-indigo-200 hover:text-white focus:outline-none transition-colors duration-300"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <RiSunFill className="w-5 h-5" />
              ) : (
                <RiMoonFill className="w-5 h-5" />
              )}
            </motion.button>

            {/* Social Links with glow effect */}
            <div className="flex items-center space-x-4 ml-2">
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
                  whileTap={{ scale: 0.9 }}
                  className="text-indigo-300 hover:text-indigo-100 transition-all duration-300 text-xl relative"
                  aria-label={social.label}
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
              className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-100 hover:text-white flex items-center gap-2 transition-all duration-300 relative overflow-hidden group"
              aria-label="Download Resume"
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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-[#0a0a0a] z-40 pt-24 pb-8 overflow-y-auto"
            style={{
              background: "linear-gradient(to bottom, #0a0a0a 0%, #1e1b4b 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)"
            }}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                },
                closed: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-col px-6 space-y-4"
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
                        stiffness: 300,
                        damping: 20
                      }
                    },
                    closed: { 
                      opacity: 0, 
                      x: -20,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    },
                  }}
                >
                  {link.path.includes('#') ? (
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="w-full text-left py-3 text-xl text-indigo-100 hover:text-white transition-colors duration-300 font-medium relative group"
                      aria-label={link.name}
                    >
                      <div className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-500/10 transition-colors duration-300">
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
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-xl text-indigo-100 hover:text-white transition-colors duration-300 font-medium relative group"
                      aria-label={link.name}
                    >
                      <div className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-500/10 transition-colors duration-300">
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
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Theme Toggle for Mobile */}
              <motion.div
                variants={{
                  open: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  },
                  closed: { 
                    opacity: 0, 
                    y: 10,
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  },
                }}
                className="pt-2"
              >
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-3 rounded-lg bg-indigo-500/10 border border-indigo-500/40 text-indigo-100 flex items-center justify-center gap-3 text-lg font-medium"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? (
                    <RiSunFill className="w-5 h-5" />
                  ) : (
                    <RiMoonFill className="w-5 h-5" />
                  )}
                  <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
                </button>
              </motion.div>

              <motion.div
                variants={{
                  open: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  },
                  closed: { 
                    opacity: 0, 
                    y: 10,
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  },
                }}
                className="flex justify-center space-x-6 pt-4"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.path}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2,
                      color: "#a78bfa",
                      y: -3
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="text-indigo-300 hover:text-indigo-100 transition-colors duration-300 text-2xl p-2"
                    aria-label={social.label}
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
                      stiffness: 300,
                      damping: 20
                    }
                  },
                  closed: { 
                    opacity: 0, 
                    y: 10,
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  },
                }}
                className="pt-4"
              >
                <button
                  onClick={handleResumeDownload}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 hover:border-indigo-400/60 text-indigo-100 hover:text-white flex items-center justify-center gap-3 text-lg font-medium transition-all duration-300 relative overflow-hidden group"
                  aria-label="Download Resume"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                  <motion.span
                    animate={{
                      y: [0, -2, 0],
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