"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaJs, FaGithub, FaAws } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiPostman,
  SiVercel,
  SiThreedotjs,
} from "react-icons/si"

// Define type for custom CSS properties
interface CustomCSSProperties extends React.CSSProperties {
  '--glow-opacity'?: number | string;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type TechItem = {
  name: string;
  icon: React.ReactNode;
  label: string;
};

type TechCategory = {
  title: string;
  items: TechItem[];
};

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const techData: TechCategory[] = [
    {
      title: "Frontend",
      items: [
        { name: "HTML", icon: <FaHtml5 />, label: "$ html --markup" },
        { name: "CSS", icon: <FaCss3Alt />, label: "$ css --styles" },
        { name: "JavaScript", icon: <FaJs />, label: "$ javascript --es6" },
        { name: "React", icon: <FaReact />, label: "$ react --ui" },
        { name: "Next.js", icon: <SiNextdotjs />, label: "$ next --ssr" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, label: "$ tailwind --utility" },
        { name: "Flutter", icon: <SiFlutter />, label: "$ flutter --mobile" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: <FaNodeJs />, label: "$ node --runtime" },
        { name: "Express", icon: <SiExpress />, label: "$ express --server" },
        { name: "MongoDB", icon: <SiMongodb />, label: "$ mongodb --database" },
        { name: "Firebase", icon: <SiFirebase />, label: "$ firebase --baaS" },
      ],
    },
    {
      title: "Tools & Cloud",
      items: [
        { name: "Git", icon: <FaGitAlt />, label: "$ git --vcs" },
        { name: "GitHub", icon: <FaGithub />, label: "$ github --repo" },
        { name: "Postman", icon: <SiPostman />, label: "$ postman --api" },
        { name: "Vercel", icon: <SiVercel />, label: "$ vercel --deploy" },
        { name: "AWS", icon: <FaAws />, label: "$ aws --cloud" },
        { name: "Three.js", icon: <SiThreedotjs />, label: "$ threejs --3d" },
      ],
    },
  ]

  useEffect(() => {
    if (!titleRef.current || !sectionRef.current) return

    gsap.from(titleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    })

    if (!gridRef.current) return

    gsap.from(gridRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    })

    const cards = gridRef.current.querySelectorAll<HTMLElement>(".tech-card")
    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.03,
          "--glow-opacity": 0.3,
          duration: 0.3,
          ease: "power1.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          "--glow-opacity": 0,
          duration: 0.3,
          ease: "power1.out",
        })
      }

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
      }
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-center text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-[length:400%_auto] animate-gradient-shift"
        >
          $ ./tech_stack
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techData.map((category) => (
            <div key={category.title} className="flex flex-col">
              <h3 className="text-lg md:text-xl mb-4 text-indigo-200/90 border-b border-indigo-400/30 pb-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {category.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="tech-card relative p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-indigo-400/10 hover:border-indigo-300/30 transition-all duration-300"
                    style={{ "--glow-opacity": 0 } as CustomCSSProperties}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl text-indigo-300">{tech.icon}</span>
                      <div className="overflow-hidden">
                        <h4 className="font-medium text-white truncate">{tech.name}</h4>
                        <p className="text-xs font-mono text-indigo-300/70 mt-1 truncate">{tech.label}</p>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                      style={{
                        opacity: "var(--glow-opacity, 0)",
                        boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
                        background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}