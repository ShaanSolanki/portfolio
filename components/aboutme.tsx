'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiDownload } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    .from(textRef.current?.children || [], {
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
    .from(buttonsRef.current?.children || [], {
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
    const buttons = buttonsRef.current?.querySelectorAll('button, a');
    buttons?.forEach(btn => {
      const glow = document.createElement('div');
      glow.className = 'absolute inset-0 rounded-xl opacity-0 pointer-events-none';
      glow.style.background = 'radial-gradient(circle at center, rgba(99, 102, 241, 0.8) 0%, transparent 70%)';
      glow.style.transition = 'opacity 0.5s ease';
      glow.style.filter = 'blur(10px)';
      btn.appendChild(glow);
      
      btn.addEventListener('mousemove', (e) => {
        const mouseEvent = e as MouseEvent;
        const rect = btn.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        
        gsap.to(btn, {
          x: (x - rect.width/2) * 0.2,
          y: (y - rect.height/2) * 0.2,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)'
        });
      });
      
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          scale: 1.1,
          duration: 0.5,
          ease: 'back.out(2.5)'
        });
        gsap.to(glow, {
          opacity: 0.9,
          duration: 0.5
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)'
        });
        gsap.to(glow, {
          opacity: 0,
          duration: 0.5
        });
      });
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
            
            <div ref={textRef} className="space-y-6">
              <p className="text-lg md:text-xl text-indigo-200/90 leading-relaxed">
                I'm a <span className="text-white font-medium">Creative Full Stack Developer</span> who brings ideas to life through immersive, animated web experiences — where design meets precision.
              </p>
              
              <p className="text-lg md:text-xl text-indigo-200/90 leading-relaxed">
                Fluent across the entire development stack, I build seamless interfaces using React, Next.js, and Three.js — while architecting powerful, scalable backends that keep everything running fast and secure.
              </p>
              
              <p className="text-lg md:text-xl text-indigo-200/90 leading-relaxed">
                From dynamic UIs to secure APIs and database design, I specialize in blending functionality with storytelling — making every interaction feel purposeful and smooth.
              </p>

              <p className="text-lg md:text-xl text-indigo-200/90 leading-relaxed">
                I don't just code websites — I craft digital experiences that engage, perform, and inspire.
              </p>
            </div>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 mt-10">
              <button
                className="relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-500 overflow-hidden group shadow-xl shadow-indigo-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Download CV
                  <FiDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button
                className="relative px-8 py-4 bg-transparent border-2 border-indigo-500/90 hover:border-indigo-400 text-white font-medium rounded-xl transition-all duration-500 group shadow-xl shadow-indigo-500/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Let's Connect
                  <FiMail className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </button>
            </div>
          </div>

          {/* Image/avatar card */}
          <div 
            ref={imageRef} 
            className="lg:w-1/2 relative flex justify-center mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-2 border-indigo-500/30 backdrop-blur-sm bg-gradient-to-br from-indigo-900/30 to-violet-900/30 shadow-2xl shadow-indigo-500/20">
              {/* Placeholder for 3D avatar or photo */}
              <div className="absolute inset-0 flex items-center justify-center text-indigo-300/50">
                <svg 
                  className="w-1/2 h-1/2" 
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
              
              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-indigo-400/50"
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
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </section>
  );
}