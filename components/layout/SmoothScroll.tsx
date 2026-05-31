'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode } from 'react';

export { useLenis };

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.08,            // Softer inertia
      smoothWheel: true,     // Enable smooth scrolling
      wheelMultiplier: 1,    // Keep speed natural
    }}>
      {children}
    </ReactLenis>
  );
}
