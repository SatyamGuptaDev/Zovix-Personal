'use client';
import { memo } from 'react';

function AnimatedBackgroundComponent() {
  return (
    <div className="fixed inset-0 z-0 bg-[#05010a] pointer-events-none">
      {/* 
        Container constrained to the upper part of the screen.
        We use a fade-out gradient at the bottom so it seamlessly blends into the dark background.
      */}
      <div className="absolute top-0 left-0 w-full h-[65vh] overflow-hidden">
        
        {/* Cloth Layer - Base Gradient */}
        <div className="absolute inset-0 opacity-80">
          <div 
            className="absolute inset-[-20%] w-[140%] h-[140%]"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(100, 30, 255, 0.5) 0%, rgba(20, 0, 80, 0) 60%)',
              animation: 'cloth-wave 15s ease-in-out infinite alternate',
              transformOrigin: 'center top'
            }}
          />
        </div>

        {/* Cloth Layer - Primary Folds (Bright) */}
        <div className="absolute inset-0 opacity-90 mix-blend-screen">
          <div 
            className="absolute w-[150%] h-[150%] -top-[30%] -left-[20%]"
            style={{
              background: 'radial-gradient(ellipse 40% 70% at 40% 40%, rgba(180, 80, 255, 0.6) 0%, transparent 60%)',
              filter: 'blur(50px)',
              animation: 'cloth-rotate 25s linear infinite',
              transformOrigin: '50% 40%'
            }}
          />
          <div 
            className="absolute w-[150%] h-[150%] -top-[20%] -right-[20%]"
            style={{
              background: 'radial-gradient(ellipse 50% 60% at 60% 40%, rgba(130, 40, 255, 0.5) 0%, transparent 60%)',
              filter: 'blur(60px)',
              animation: 'cloth-rotate-reverse 30s linear infinite',
              transformOrigin: '40% 50%'
            }}
          />
        </div>

        {/* Light Reflection / Edge Highlights on the Folds */}
        <div className="absolute inset-0 opacity-100 mix-blend-color-dodge">
          <div 
            className="absolute w-[120%] h-[100%] top-[0%] left-[10%]"
            style={{
              background: 'radial-gradient(ellipse 60% 25% at 50% 30%, rgba(220, 150, 255, 0.7) 0%, transparent 60%)',
              filter: 'blur(40px)',
              animation: 'cloth-sway 18s ease-in-out infinite alternate',
            }}
          />
        </div>

        {/* Woven Fabric Texture Overlay (Noise + Micro-lines) */}
        <div 
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{ 
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '150px 150px, 4px 4px, 4px 4px'
          }} 
        />

        {/* Bottom Fade to Black to blend with page content */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#05010a] via-[#05010a]/90 to-transparent" />
      </div>

      {/* Keyframes built from scratch for natural cloth movement */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cloth-wave {
          0% { transform: scale(1) translateY(0) rotate(-2deg); }
          50% { transform: scale(1.05) translateY(3%) rotate(1deg); }
          100% { transform: scale(1) translateY(-2%) rotate(-1deg); }
        }
        @keyframes cloth-rotate {
          0% { transform: rotate(0deg) scale(1) skew(0deg, 0deg); }
          33% { transform: rotate(120deg) scale(1.1) skew(5deg, 5deg); }
          66% { transform: rotate(240deg) scale(0.9) skew(-5deg, -5deg); }
          100% { transform: rotate(360deg) scale(1) skew(0deg, 0deg); }
        }
        @keyframes cloth-rotate-reverse {
          0% { transform: rotate(360deg) scale(1) skew(0deg, 0deg); }
          33% { transform: rotate(240deg) scale(1.15) skew(-5deg, 5deg); }
          66% { transform: rotate(120deg) scale(0.85) skew(5deg, -5deg); }
          100% { transform: rotate(0deg) scale(1) skew(0deg, 0deg); }
        }
        @keyframes cloth-sway {
          0% { transform: translateX(-5%) translateY(0) rotate(-5deg); }
          50% { transform: translateX(5%) translateY(5%) rotate(3deg); }
          100% { transform: translateX(-3%) translateY(-3%) rotate(-2deg); }
        }
      `}} />
    </div>
  );
}

export const AnimatedBackground = memo(AnimatedBackgroundComponent);
