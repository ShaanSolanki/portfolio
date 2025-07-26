'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaCode, 
  FaMobileAlt, 
  FaServer, 
  FaCloudUploadAlt 
} from 'react-icons/fa';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current || !gridRef.current) return;

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    // Text animations with staggered delays
    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      skewY: 5,
      ease: 'back.out(1.7)'
    })
    .from(gridRef.current?.children || [], {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power2.out'
    }, "-=0.8");

    // Hover effects
    const cards = gridRef.current?.querySelectorAll('.service-card') || [];
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.03,
          '--glow-opacity': 0.3,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          '--glow-opacity': 0,
          duration: 0.3,
          ease: 'power1.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const services = [
    {
      title: 'Web Development',
      icon: <FaCode className="text-2xl sm:text-3xl text-indigo-300" />,
      description: 'Building responsive and dynamic websites.',
      label: '$ web --responsive'
    },
    {
      title: 'App Development',
      icon: <FaMobileAlt className="text-2xl sm:text-3xl text-indigo-300" />,
      description: 'Creating cross-platform mobile and desktop apps.',
      label: '$ app --cross-platform'
    },
    {
      title: 'API & Backend Services',
      icon: <FaServer className="text-2xl sm:text-3xl text-indigo-300" />,
      description: 'Developing fast, scalable backend solutions.',
      label: '$ api --scalable'
    },
    {
      title: 'Cloud & Deployment',
      icon: <FaCloudUploadAlt className="text-2xl sm:text-3xl text-indigo-300" />,
      description: 'Deploying projects with modern cloud services.',
      label: '$ cloud --deploy'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ 
        background: 'transparent', 
        zIndex: 10,
        isolation: 'isolate'
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col">
          {/* Heading moved to left */}
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-[length:400%_auto] animate-gradient-shift"
            style={{
              textAlign: 'left' // Changed from center to left
            }}
          >
            services provided
          </h2>

          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{
              position: 'relative',
              zIndex: 1
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card relative p-6 rounded-lg bg-gradient-to-br from-indigo-900/20 to-indigo-900/10 backdrop-blur-sm border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-300 flex flex-col items-center text-center h-full"
                style={{
                  minHeight: '200px',
                  opacity: 1,
                  transform: 'translateY(0)',
                  background: 'linear-gradient(135deg, rgba(49, 46, 129, 0.2) 0%, rgba(67, 56, 202, 0.1) 100%)',
                  // @ts-ignore: Allow custom CSS variable
                  ['--glow-opacity' as any]: 0
                }}
              >
                <div className="mb-4 p-3 rounded-full bg-indigo-900/30 border border-indigo-400/30">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-indigo-100/80 mb-3">
                  {service.description}
                </p>
                <p className="text-xs font-mono text-indigo-300/60 mt-auto">
                  {service.label}
                </p>

                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: 'var(--glow-opacity, 0)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
                    background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                    zIndex: -1
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;