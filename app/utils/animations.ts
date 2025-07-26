// app/utils/animations.ts
import gsap from "gsap";

export const animatePageIn = () => {
  // 1. More subtle initial setup
  gsap.set("#page-content", {
    visibility: "hidden",
    opacity: 0,
    scale: 0.98 // Tiny scale for depth
  });

  const panels = Array.from({ length: 8 }, (_, i) => {
    const panel = document.getElementById(`transition-panel-${i+1}`);
    if (panel) {
      // Natural variation in panel opacity
      const opacity = 0.12 + (Math.random() * 0.03);
      panel.style.background = `rgba(255, 255, 255, ${opacity})`;
      panel.style.backdropFilter = "blur(3px)";
      panel.style.boxShadow = "none";
      panel.style.borderRight = "none";
      // Organic overlap variation
      panel.style.marginRight = i < 7 ? `-${0.5 + (Math.random() * 1)}px` : "0";
      // Slight initial offset for natural feel
      gsap.set(panel, { 
        y: `${(Math.random() * 4) - 2}px`,
        opacity: 0.9 // Start slightly transparent
      });
    }
    return panel;
  }).filter(Boolean);

  if (panels.length === 8) {
    const tl = gsap.timeline({
      defaults: {
        ease: "sine.inOut",
        duration: 1.4
      }
    });

    // 2. Natural content reveal
    tl.to("#page-content", {
      visibility: "visible",
      opacity: 1,
      scale: 1,
      ease: "elastic.out(1, 0.5)",
      duration: 1.8
    }, 0.3);

    // 3. Organic wave animation with variation
    panels.forEach((panel, i) => {
      const delay = i * 0.04 + (Math.random() * 0.02);
      const duration = 0.9 + (Math.random() * 0.2);
      const yPercent = -100 + (Math.random() * 10);
      
      tl.to(panel, {
        yPercent,
        opacity: 0,
        duration,
        delay,
        ease: i % 2 === 0 ? "sine.in" : "power1.in",
        onComplete: () => {
          gsap.set(panel, { display: "none" });
        }
      }, 0);
    });

    // 4. Natural light trail effect
    const trailsContainer = document.createElement("div");
    trailsContainer.className = "fixed inset-0 z-40 pointer-events-none overflow-hidden";
    trailsContainer.style.opacity = "0";
    document.body.appendChild(trailsContainer);

    // Organic trail with slight variation
    const trail = document.createElement("div");
    trail.className = "absolute bottom-0 left-0 right-0 h-px";
    trail.style.background = `rgba(255, 255, 255, ${0.2 + (Math.random() * 0.1)})`;
    trail.style.filter = `blur(${0.2 + (Math.random() * 0.2)}px)`;
    trailsContainer.appendChild(trail);

    tl.to(trailsContainer, {
      opacity: 0.5,
      duration: 0.6
    }, 0.2)
    .fromTo(trail,
      {
        height: "0px",
        opacity: 0.6
      },
      {
        height: "100vh",
        opacity: 0,
        duration: 1.2,
        ease: "power2.in"
      },
      0.2
    );

    // 5. Gentle cleanup
    tl.add(() => {
      gsap.to(trailsContainer, {
        opacity: 0,
        duration: 0.6,
        ease: "sine.out",
        onComplete: () => trailsContainer.remove()
      });
    }, "-=0.6");

    // Subtle background dim for depth
    const bgDim = document.createElement("div");
    bgDim.className = "fixed inset-0 z-30 pointer-events-none";
    bgDim.style.background = "rgba(0, 0, 0, 0.08)";
    bgDim.style.opacity = "0";
    document.body.appendChild(bgDim);
    
    tl.to(bgDim, {
      opacity: 1,
      duration: 0.8
    }, 0)
    .to(bgDim, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => bgDim.remove()
    }, "-=0.8");
  }
};