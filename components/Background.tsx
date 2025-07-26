'use client';
import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type BackgroundProps = {
  splineScene?: string;
  showParticles?: boolean;
  gradientOpacity?: number;
  children?: React.ReactNode;
  className?: string;
};

export default function Background({
  splineScene = 'https://prod.spline.design/Oy5edkRrMfCmZo17/scene.splinecode',
  showParticles = true,
  gradientOpacity = 0.7,
  children,
  className = '',
}: BackgroundProps) {
  const particlesRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !showParticles || !particlesRef.current) return;

    const particleCount = 40;
    const colors = [
      'bg-indigo-500/25',
      'bg-purple-500/20',
      'bg-blue-500/15',
      'bg-pink-500/20'
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.className = `absolute rounded-full ${color}`;

      const size = Math.random() * 15 + 5;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * -20;

      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        filter: 'blur(1.5px)',
        willChange: 'transform, opacity'
      });

      particlesRef.current.appendChild(particle);

      gsap.to(particle, {
        x: `${Math.random() * 400 - 200}px`,
        y: `${Math.random() * 400 - 200}px`,
        opacity: Math.random() * 0.8 + 0.2,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        onRepeat: () => {
          gsap.to(particle, {
            x: `${Math.random() * 400 - 200}px`,
            y: `${Math.random() * 400 - 200}px`,
            duration: duration,
            ease: 'power1.inOut'
          });
        }
      });
    }

    const waveAnimation = gsap.to(gradientRef.current, {
      backgroundPosition: '50% 60%',
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    const particleTween = gsap.to(particlesRef.current, {
      y: 200,
      scale: 1.4,
      ease: 'none',
      paused: true
    });

    const blurTween = gsap.to(containerRef.current, {
      backdropFilter: 'blur(15px) brightness(0.8)',
      opacity: 0.8,
      ease: 'none',
      paused: true
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
      animation: gsap.timeline()
        .add(blurTween, 0)
        .add(particleTween, 0),
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        blurTween.progress(easedProgress);
        particleTween.progress(easedProgress);

        if (gradientRef.current) {
          gsap.to(gradientRef.current, {
            opacity: gradientOpacity + (easedProgress * 0.3),
            duration: 0.1
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      waveAnimation.kill();
    };
  }, [hasMounted, showParticles, gradientOpacity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 3D Spline Background */}
      {splineScene && (
        <div className="absolute inset-0 -z-10 contrast-125 brightness-90 saturate-120">
          <Spline
            scene={splineScene}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Dynamic Particle overlay */}
      {hasMounted && showParticles && (
        <div
          ref={particlesRef}
          className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none mix-blend-screen"
        />
      )}

      {/* Animated Gradient overlay */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-transparent backdrop-blur-[3px] transition-all duration-500"
        style={{ opacity: gradientOpacity }}
      />

      {/* Children content */}
      {children}
    </div>
  );
}
