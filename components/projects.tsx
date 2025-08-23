"use client";

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FiExternalLink, FiGithub, FiArrowRight, FiLoader } from 'react-icons/fi';

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [loadedIframes, setLoadedIframes] = useState<boolean[]>([]);

  const projects = [
    {
      title: "CadTech",
      description: "Professional engineering services website with modern design and responsive layout",
      image: "https://www.cadtech.co.in/",
      liveUrl: "https://www.cadtech.co.in/",
      githubUrl: "https://github.com/yourusername/cadtech-engineering",
      category: "Professional Website"
    },
    {
      title: "E-Cell PRMITR",
      description: "Entrepreneurship cell website featuring events, initiatives and startup resources",
      image: "https://ecell.prmitr.in/",
      liveUrl: "https://ecell.prmitr.in/",
      githubUrl: "https://github.com/yourusername/ecell-prmitr",
      category: "Institutional Website"
    },
    {
      title: "Business Landing Page",
      description: "Modern business landing page with smooth animations and clean UI design",
      image: "https://business-landing-page-mocha.vercel.app/",
      liveUrl: "https://business-landing-page-mocha.vercel.app/",
      githubUrl: "https://github.com/yourusername/business-landing-page",
      category: "Landing Page"
    },
    {
      title: "Static Website Design",
      description: "Clean and responsive static website design with modern aesthetics",
      image: "https://static-website-design.vercel.app/",
      liveUrl: "https://static-website-design.vercel.app/",
      githubUrl: "https://github.com/yourusername/static-website-design",
      category: "Portfolio Website"
    },
    {
      title: "Finance Tracker",
      description: "Financial management application for tracking expenses and budgets",
      image: "https://finance-tracker-drab-six.vercel.app/",
      liveUrl: "https://finance-tracker-drab-six.vercel.app/",
      githubUrl: "https://github.com/yourusername/finance-tracker",
      category: "Web Application"
    }
  ];

  useEffect(() => {
    // Initialize loaded state array
    setLoadedIframes(new Array(projects.length).fill(false));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section animation
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    // Heading animation
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%"
      },
      backgroundPositionX: "100%",
      duration: 1.5,
      ease: "power4.out"
    });

    // Projects animation
    projectsRef.current.forEach((project, index) => {
      if (project) {
        gsap.from(project, {
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.2)"
        });
      }
    });

    // Hover animations
    projectsRef.current.forEach(project => {
      if (project) {
        const handleMouseEnter = () => {
          gsap.to(project, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(project, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        project.addEventListener('mouseenter', handleMouseEnter);
        project.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
          project.removeEventListener('mouseenter', handleMouseEnter);
          project.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, []);

  const handleIframeLoad = (index: number) => {
    setLoadedIframes(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="projects"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated gradient heading */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-[length:200%_auto] animate-gradient"
        >
          Featured Projects
        </h2>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => {
                if (el) projectsRef.current[index] = el;
              }}
              className="relative group"
            >
              {/* Glow border */}
              <div className="glow-border absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 to-blue-500/30 opacity-30 group-hover:opacity-60 transition-opacity duration-300 blur-md" />
              
              {/* Glassmorphic card */}
              <div className="h-full bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Project preview with iframe */}
                <div 
                  className="relative mb-6 overflow-hidden rounded-lg aspect-video bg-gray-800 flex-shrink-0 cursor-pointer"
                  onClick={() => handleCardClick(project.liveUrl)}
                >
                  {!loadedIframes[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                      <FiLoader className="text-4xl text-gray-400 animate-spin" />
                    </div>
                  )}
                  <iframe
                    src={project.image}
                    className={`w-full h-full border-none transition-opacity duration-500 ${
                      loadedIframes[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts"
                    onLoad={() => handleIframeLoad(index)}
                    title={`${project.title} Preview`}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiExternalLink className="text-white text-lg" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiGithub className="text-white text-lg" />
                    </a>
                  </div>

                  {/* Click indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 px-2 py-1 bg-purple-600/80 text-white text-xs rounded-full">
                      <span>View Live</span>
                      <FiExternalLink className="text-xs" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex-1">
                    <span className="text-sm text-purple-400 font-medium mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/ShaanSolanki?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600/20 text-purple-300 hover:text-white hover:bg-purple-600/30 transition-all duration-300 group border border-purple-500/30"
          >
            <span>View More Projects</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;