'use client';
import Link from 'next/link';
import { Search, User, Home, Film, Tv, Compass, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/tv', label: 'Series' },
  { href: '/anime', label: 'Anime' },
  { href: '/discover', label: 'Discover' },
];

const MOBILE_DOCK_ITEMS = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/movies', label: 'Movies', Icon: Film },
  { href: '/tv', label: 'Series', Icon: Tv },
  { href: '/anime', label: 'Anime', Icon: Sparkles },
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
      {/* Inline styles for custom high-performance animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes liquid-drift-1 {
          0% { transform: translate(-10%, -10%) scale(1) rotate(0deg); opacity: 0.25; }
          50% { transform: translate(10%, 10%) scale(1.2) rotate(180deg); opacity: 0.38; }
          100% { transform: translate(-10%, -10%) scale(1) rotate(360deg); opacity: 0.25; }
        }
        @keyframes liquid-drift-2 {
          0% { transform: translate(10%, 10%) scale(1.1) rotate(180deg); opacity: 0.2; }
          50% { transform: translate(-10%, -10%) scale(0.9) rotate(0deg); opacity: 0.35; }
          100% { transform: translate(10%, 10%) scale(1.1) rotate(180deg); opacity: 0.2; }
        }
        @keyframes rainbow-sweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glint-drift {
          0% { transform: translateX(-150%) skewX(-30deg); }
          50% { transform: translateX(150%) skewX(-30deg); }
          100% { transform: translateX(150%) skewX(-30deg); }
        }
        .liquid-wave-1 {
          animation: liquid-drift-1 14s infinite linear;
        }
        .liquid-wave-2 {
          animation: liquid-drift-2 18s infinite linear;
        }
        
        .glass-pill-container {
          position: relative;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 
            0 20px 40px -15px rgba(0, 0, 0, 0.75), 
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.45),
            inset 0 -1.5px 2px 0 rgba(255, 255, 255, 0.15),
            inset 0 10px 20px -10px rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(28px) saturate(240%) contrast(120%) brightness(0.95);
          -webkit-backdrop-filter: blur(28px) saturate(240%) contrast(120%) brightness(0.95);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-pill-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(255, 0, 85, 0.35), rgba(0, 255, 204, 0.35), rgba(0, 85, 255, 0.35), rgba(255, 204, 0, 0.35), rgba(255, 0, 85, 0.35));
          background-size: 300% 300%;
          animation: rainbow-sweep 10s infinite linear;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 1.2px;
          pointer-events: none;
          opacity: 0.55;
          z-index: 5;
        }

        /* Specular bottle light streak (curved bottle sheen) */
        .bottle-sheen-highlight {
          position: absolute;
          top: 0;
          left: 5%;
          right: 5%;
          height: 35%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 80%, transparent 100%);
          border-radius: 9999px 9999px 0 0;
          pointer-events: none;
          mix-blend-mode: overlay;
          z-index: -2;
        }
        
        /* A bright specular sweeping glint */
        .bottle-glint {
          position: absolute;
          inset: 0;
          width: 200%;
          background: linear-gradient(90deg, transparent 42%, rgba(255, 255, 255, 0.38) 50%, transparent 58%);
          transform: skewX(-30deg);
          animation: glint-drift 12s infinite ease-in-out;
          pointer-events: none;
          mix-blend-mode: overlay;
          z-index: -2;
        }
        
        /* Wobbly water refraction layer inside the bottle */
        .water-refraction-body {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          overflow: hidden;
          pointer-events: none;
          z-index: -5;
          filter: url(#trippy-glass-distortion);
          opacity: 0.85;
        }
        
        .water-caustics {
          position: absolute;
          inset: -20%;
          background-image: 
            radial-gradient(circle at 30% 20%, rgba(0, 240, 255, 0.3) 0%, transparent 45%),
            radial-gradient(circle at 70% 80%, rgba(255, 0, 128, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
          mix-blend-mode: color-dodge;
        }
      `}} />

      {/* ── DESKTOP FLOATING PILL NAV ── */}
      <nav
        className={`hidden md:flex fixed z-[200] left-0 right-0 justify-center px-4 transition-all duration-500 ${scrolled ? 'top-3' : 'top-6'}`}
      >
        <div className="group glass-pill-container flex items-center px-6 py-2.5 gap-6 rounded-full transition-all duration-350 animate-slide-up overflow-hidden">
          
          {/* Layer 1: Specular glass bottle highlights & sweeping reflection glint */}
          <div className="bottle-sheen-highlight" />
          <div className="bottle-glint" />
          
          {/* Layer 2: Trippy Liquid Refraction Body (contains blobs and caustics, warped by SVG filter) */}
          <div className="water-refraction-body">
            <div 
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-[38%] liquid-wave-1"
              style={{
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.45) 0%, transparent 60%)',
              }}
            />
            <div 
              className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] rounded-[43%] liquid-wave-2"
              style={{
                background: 'radial-gradient(circle, rgba(255, 0, 128, 0.35) 0%, transparent 60%)',
              }}
            />
            <div className="water-caustics" />

            {/* Simulated cylindrical light refraction mesh */}
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-[0.35]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, rgba(0, 240, 255, 0.12) 0px, rgba(0, 240, 255, 0.12) 1.5px, transparent 1.5px, transparent 15px),
                  repeating-linear-gradient(0deg, rgba(255, 0, 128, 0.12) 0px, rgba(255, 0, 128, 0.12) 1.5px, transparent 1.5px, transparent 15px)
                `,
                backgroundSize: '200px 100px',
                animation: 'liquid-drift-1 10s infinite alternate ease-in-out',
              }}
            />
          </div>

          {/* Layer 3: Inner Specular Gloss Overlay */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden opacity-45 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-65"
            style={{
              background: `
                linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 25%, transparent 50%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0.25) 100%),
                linear-gradient(to right, rgba(255,255,255,0.12) 0%, transparent 12%, transparent 88%, rgba(255,255,255,0.12) 100%)
              `
            }}
          />

          {/* ── ZIVOX Logo ── */}
          <Link
            href="/"
            onClick={clearIframes}
            className="flex items-center z-10 transition-all duration-300 hover:opacity-80 active:scale-95 select-none"
            aria-label="ZIVOX Home"
          >
            <span
              className="font-display font-black tracking-[-0.05em] text-[18px] leading-none"
              style={{
                background: 'linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.65) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.04em',
              }}
            >
              ZIV
            </span>
            <span
              className="font-display font-black text-[18px] leading-none mx-[1px]"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2px solid rgba(229, 9, 20, 0.9)',
                boxShadow: '0 0 10px rgba(229,9,20,0.5), inset 0 0 6px rgba(229,9,20,0.2)',
                WebkitTextFillColor: 'transparent',
              }}
            >
            </span>
            <span
              className="font-display font-black tracking-[-0.05em] text-[18px] leading-none"
              style={{
                background: 'linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.65) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.04em',
              }}
            >
              X
            </span>
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
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'linear-gradient(to right, #e50914, transparent)' }}
                    />
                  )}
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
          background: 'rgba(5, 5, 5, 0.97)',
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
                <div className="relative">
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                  {active && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-crimson-500"
                      style={{ boxShadow: '0 0 6px rgba(229,9,20,0.8)' }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-semibold tracking-wide">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Trippy Glass Liquid Water-Bottle Displacement Map ── */}
      <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <filter id="trippy-glass-distortion" x="-30%" y="-30%" width="160%" height="160%">
            {/* Create horizontal-heavy fluid ripples for highly realistic cylindrical bottle water displacement */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01 0.04" 
              numOctaves="3" 
              result="noise" 
              seed="4"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="22" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
