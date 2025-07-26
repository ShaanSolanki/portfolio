'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroTitle = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate the entire heading first
    timeline.from(ref.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: 0.3
    });

    // Then add the subtle glow animation
    timeline.to(ref.current, {
      '--glow-opacity': 0.3,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    }, 0.5);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <h1
      ref={ref}
      className="text-5xl md:text-7xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-violet-300 tracking-tight leading-tight"
      style={{ '--glow-opacity': 0 } as React.CSSProperties}
    >
      <span ref={textRef}>{children}</span>
    </h1>
  );
};

const RoleTitle = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(ref.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: 'power3.out'
    });

    // Add a subtle pulse animation
    gsap.to(ref.current, {
      '--glow-scale': 1.03,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }, []);

  return (
    <div
      ref={ref}
      className="text-2xl md:text-3xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-100 to-violet-200"
      style={{ '--glow-scale': 1 } as React.CSSProperties}
    >
      Full Stack Developer
    </div>
  );
};

const SkillTags = () => {
  const ref = useRef<HTMLDivElement>(null);
  const skills = ["React", "Next.js", "Node.js", "MongoDB", "Express", "Firebase", "Three.js", "Flutter"];

  useEffect(() => {
    const elements = ref.current?.children || [];
    
    gsap.from(elements, {
      y: 10,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      delay: 1.2,
      ease: 'power2.out',
      onComplete: () => {
        // Add hover effects after animation
        Array.from(elements).forEach(el => {
          gsap.to(el, {
            scale: 1.05,
            duration: 0.3,
            paused: true,
            ease: 'power1.out'
          });
          
          el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.05, duration: 0.3 }));
          el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.3 }));
        });
      }
    });
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-3 mb-8">
      {skills.map((skill, index) => (
        <div key={skill} className="skill-tag flex items-center transition-transform duration-300">
          <span className="text-violet-300/80 text-sm md:text-base font-mono tracking-wide">
            {skill}
          </span>
          {index < skills.length - 1 && (
            <span className="text-violet-400/40 mx-2">·</span>
          )}
        </div>
      ))}
    </div>
  );
};

const ScrollIndicator = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bouncing animation for scroll indicator
    if (ref.current && ref.current.lastChild) {
      gsap.to(ref.current.lastChild, {
        y: -10,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2
      });
    }
  }, []);

  return (
    <div ref={ref} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
      <div className="text-violet-300/70 text-xs tracking-widest mb-2">SCROLL</div>
      <div className="w-px h-8 bg-gradient-to-t from-violet-400/50 to-transparent"></div>
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Register ScrollTrigger for potential future use
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-transparent pointer-events-none" />
      
      <div className="relative w-full max-w-3xl px-6 text-center">
        <HeroTitle>SHAAN SOLANKI</HeroTitle>
        <RoleTitle />
        <SkillTags />
      </div>
      
      <ScrollIndicator />
    </section>
  );
}