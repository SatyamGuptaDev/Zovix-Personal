'use client';
import Link from 'next/link';
import { Search, User, Home, Film, Tv, Compass, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/tv', label: 'Series' },
  { href: '/discover', label: 'Discover' },
];

const MOBILE_DOCK_ITEMS = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/movies', label: 'Movies', Icon: Film },
  { href: '/tv', label: 'Series', Icon: Tv },
  { href: '/discover', label: 'Discover', Icon: Compass },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clearIframes = () => {
    document.querySelectorAll('iframe').forEach(i => (i.src = ''));
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <>
      {/* ── SVG Filter for Water/Glass Distortion (Fallback/Support varies by browser) ── */}
      <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
        <filter id="water-glass">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="1" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7" in="noise" result="coloredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* ── DESKTOP FLOATING PILL NAV ── */}
      <nav
        className={`hidden md:flex fixed z-[200] left-0 right-0 justify-center px-4 transition-all duration-500 ${scrolled ? 'top-3' : 'top-6'}`}
      >
        <div
          className="group relative flex items-center px-5 py-2.5 gap-5 rounded-full transition-all duration-300"
          style={{
            /* The base dark translucent background */
            backgroundColor: 'rgba(10, 8, 12, 0.45)',
            /* The intense blur to simulate thick glass */
            backdropFilter: 'blur(20px) saturate(180%) contrast(120%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%) contrast(120%) brightness(1.1)',
            /* Subtle warm orange/brown border glow */
            border: '1px solid rgba(255, 165, 80, 0.15)',
            /* Gentle outer shadow for depth, soft inner shadow for the glass edge */
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(255, 165, 80, 0.1)',
          }}
        >
          {/* ── Inner Reflections (The "Water Bottle" Effect) ── */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden opacity-50 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-70"
            style={{
              background: `
                linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 20%, transparent 50%, rgba(255,255,255,0.02) 80%, rgba(255,255,255,0.2) 100%),
                linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 10%, transparent 90%, rgba(255,255,255,0.1) 100%)
              `
            }}
          />
          
          {/* Subtle noise texture for realism */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none opacity-[0.04] mix-blend-color-dodge"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
            }}
          />

          {/* Rocket Icon (Left) */}
          <Link
            href="/"
            onClick={clearIframes}
            className="flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          >
            <Rocket size={18} className="text-white fill-white drop-shadow-md" />
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6 z-10 mx-2">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={clearIframes}
                  className={`relative text-[14px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-[1px] ${
                    active
                      ? 'text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                      : 'text-white/60 hover:text-white/95'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Action Icons (Right) */}
          <div className="flex items-center gap-4 z-10 ml-2">
            <Link
              href="/search"
              onClick={clearIframes}
              className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Search"
            >
              <Search size={17} strokeWidth={2} />
            </Link>
            <Link
              href="/profile"
              onClick={clearIframes}
              className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Profile"
            >
              <User size={17} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── MOBILE BOTTOM DOCK ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-[200]"
        style={{
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-around py-2 px-2">
          {MOBILE_DOCK_ITEMS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={clearIframes}
                className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-200 ${
                  active ? 'text-white' : 'text-white/35 hover:text-white/70'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span className="text-[10px] font-semibold tracking-wide">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
