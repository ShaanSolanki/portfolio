// app/template.tsx
"use client";

import { useEffect } from "react";
import { animatePageIn } from "./utils/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div className="relative">
      {/* Transition Panels - Increased to 8 divisions for smoother animation */}
      <div id="transition-panel-1" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-0 w-1/8" />
      <div id="transition-panel-2" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-1/8 w-1/8" />
      <div id="transition-panel-3" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-2/8 w-1/8" />
      <div id="transition-panel-4" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-3/8 w-1/8" />
      <div id="transition-panel-5" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-4/8 w-1/8" />
      <div id="transition-panel-6" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-5/8 w-1/8" />
      <div id="transition-panel-7" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-6/8 w-1/8" />
      <div id="transition-panel-8" className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-7/8 w-1/8" />

      {/* Actual Page Content */}
      <div id="page-content">
        {children}
      </div>
    </div>
  );
}