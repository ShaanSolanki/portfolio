'use client';
import Background from './Background';

export default function LayoutWithBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Background stays behind everything */}
      <Background className="fixed inset-0 -z-10 pointer-events-none" />

      {/* Main content stays above background */}
      <div className="relative z-20">
        {children}
      </div>
    </>
  );
}
