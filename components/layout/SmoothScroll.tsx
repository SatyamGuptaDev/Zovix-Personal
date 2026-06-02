'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export { useLenis };

function ScrollResetter() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.08,            // Smoother responsiveness, less lag spikes
      smoothWheel: true,     // Smooth scroll for mouse wheel
      syncTouch: false,      // Let mobile/trackpad native momentum do the work instead of programmatic delay
      wheelMultiplier: 1,    // Keep speed natural
      gestureOrientation: 'vertical' // Prevent horizontal scroll capturing
    }}>
      <ScrollResetter />
      {children}
    </ReactLenis>
  );
}
