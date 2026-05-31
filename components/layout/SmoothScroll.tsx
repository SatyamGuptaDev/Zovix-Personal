'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode } from 'react';

export { useLenis };

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.12,            // Faster, snappier responsiveness
      smoothWheel: true,     // Smooth scroll for mouse wheel
      syncTouch: false,      // Let mobile/trackpad native momentum do the work instead of programmatic delay
      wheelMultiplier: 1,    // Keep speed natural
    }}>
      {children}
    </ReactLenis>
  );
}
