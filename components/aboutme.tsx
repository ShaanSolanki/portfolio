'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiDownload, FiMail, FiCode, FiLayers, FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Define type for custom CSS properties
interface CustomCSSProperties extends React.CSSProperties {
  '--glow-opacity'?: number;
  '--glow-scale'?: number;
}

type Skill = {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
};

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'skills'>('about');
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Dynamic content data
  const aboutTexts = [
    "I'm a <span class='text-white font-medium'>Creative Full Stack Developer</span> who brings ideas to life through immersive, animated web experiences — where design meets precision.",
    "Fluent across the entire development stack, I build seamless interfaces using React, Next.js, and Three.js — while architecting powerful, scalable backends that keep everything running fast and secure.",
    "From dynamic UIs to secure APIs and database design, I specialize in blending functionality with storytelling — making every interaction feel purposeful and smooth.",
    "I don't just code websites — I craft digital experiences that engage, perform, and inspire."
  ];

  const skills: Skill[] = [
    { name: 'React/Next.js', level: 95, icon: <FiLayers className="w-4 h-4" />, color: 'bg-blue-500' },
    { name: 'TypeScript', level: 90, icon: <FiCode className="w-4 h-4" />, color: 'bg-indigo-500' },
    { name: 'Node.js', level: 85, icon: <FiCpu className="w-4 h-4" />, color: 'bg-green-500' },
    { name: 'Three.js', level: 80, icon: <FiLayers className="w-4 h-4" />, color: 'bg-purple-500' },
    { name: 'UI/UX Design', level: 75, icon: <FiLayers className="w-4 h-4" />, color: 'bg-pink-500' },
    { name: 'DevOps', level: 70, icon: <FiCpu className="w-4 h-4" />, color: 'bg-yellow-500' }
  ];

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !textRef.current || !imageRef.current || !buttonsRef.current) return;

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      skewY: 5,
      ease: 'back.out(1.7)'
    })
    .from(Array.from(textRef.current.children), {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power2.out'
    }, "-=0.8")
    .from(imageRef.current, {
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
      scale: 0.8
    }, "-=0.6")
    .from(Array.from(buttonsRef.current.children), {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(2)'
    }, "-=0.4");

    // Floating image animation
    gsap.to(imageRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Button hover effects
    const buttons = buttonsRef.current.querySelectorAll('button, a');
    buttons.forEach((btn) => {
      const buttonEl = btn as HTMLElement;
      const glow = document.createElement('div');
      glow.className = 'absolute inset-0 rounded-xl opacity-0 pointer-events-none';
      glow.style.background = 'radial-gradient(circle at center, rgba(99, 102, 241, 0.8) 0%, transparent 70%)';
      glow.style.transition = 'opacity 0.5s ease';
      glow.style.filter = 'blur(10px)';
      buttonEl.appendChild(glow);
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = buttonEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(buttonEl, {
          x: (x - rect.width/2) * 0.2,
          y: (y - rect.height/2) * 0.2,
          duration: 0.8,
          ease: 'power2.out'
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(buttonEl, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)'
        });
      };
      
      const handleMouseEnter = () => {
        gsap.to(buttonEl, {
          scale: 1.1,
          duration: 0.5,
          ease: 'back.out(2.5)'
        });
        gsap.to(glow, {
          opacity: 0.9,
          duration: 0.5
        });
      };
      
      buttonEl.addEventListener('mousemove', handleMouseMove);
      buttonEl.addEventListener('mouseleave', handleMouseLeave);
      buttonEl.addEventListener('mouseenter', handleMouseEnter);
      
      return () => {
        buttonEl.removeEventListener('mousemove', handleMouseMove);
        buttonEl.removeEventListener('mouseleave', handleMouseLeave);
        buttonEl.removeEventListener('mouseenter', handleMouseEnter);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Text content */}
          <div className="lg:w-1/2">
            <h2 
              ref={headingRef}
              className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-[length:400%_auto] animate-gradient-shift"
            >
              About Me
            </h2>
            
            {/* Tab navigation */}
            <div className="flex mb-6 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2 font-medium ${activeTab === 'about' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-4 py-2 font-medium ${activeTab === 'skills' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}
              >
                Skills
              </button>
            </div>
            
            {/* Dynamic content based on tab */}
            <div ref={textRef}>
              {activeTab === 'about' ? (
                <div className="space-y-6">
                  {aboutTexts.map((text, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-lg md:text-xl text-indigo-200/90 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`p-2 rounded-full ${skill.color} text-white`}>
                            {skill.icon}
                          </span>
                          <span className="font-medium text-white">{skill.name}</span>
                        </div>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div 
                        className="w-full bg-gray-800 rounded-full h-2.5"
                        onMouseEnter={() => setHoveredSkill(index)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <motion.div
                          className={`h-2.5 rounded-full ${skill.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                          whileHover={{ scaleY: 1.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-500 overflow-hidden group shadow-xl shadow-indigo-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Download CV
                  <FiDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-transparent border-2 border-indigo-500/90 hover:border-indigo-400 text-white font-medium rounded-xl transition-all duration-500 group shadow-xl shadow-indigo-500/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Let&apos;s Connect
                  <FiMail className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </motion.button>
            </div>
          </div>

          {/* Image/avatar card */}
          <div 
            ref={imageRef} 
            className="lg:w-1/2 relative flex justify-center mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-2 border-indigo-500/30 backdrop-blur-sm bg-gradient-to-br from-indigo-900/30 to-violet-900/30 shadow-2xl shadow-indigo-500/20">
              {/* Interactive 3D avatar placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full border-2 border-indigo-400/30 animate-spin-slow" style={{ animationDuration: '20s' } as CustomCSSProperties} />
                  <div className="absolute w-3/4 h-3/4 rounded-full border border-indigo-400/20 animate-spin-slow-reverse" style={{ animationDuration: '25s' } as CustomCSSProperties} />
                  <svg 
                    className="w-1/2 h-1/2 text-indigo-300/70" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
              </div>
              
              {/* Floating tech icons */}
              {['React', 'TS', 'JS', 'CSS', 'HTML', 'Node'].map((tech, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-indigo-900/50 backdrop-blur-sm text-white text-xs font-bold rounded-full p-2 border border-indigo-500/30 shadow-lg"
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    scale: 1,
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }}
                  style={{
                    top: `${Math.random() * 70 + 15}%`,
                    left: `${Math.random() * 70 + 15}%`,
                  } as CustomCSSProperties}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
      `}</style>
    </section>
  );
}