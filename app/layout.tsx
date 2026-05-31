import './globals.css';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'VOIDSTREAM — Premium Streaming',
  description: 'Cinematic streaming experience. Watch movies, TV shows, and anime in stunning quality.',
  keywords: 'stream movies, watch tv shows, anime, free streaming, voidstream',
  openGraph: {
    title: 'VOIDSTREAM — Premium Streaming',
    description: 'Cinematic streaming experience. Watch movies, TV shows, and anime in stunning quality.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body className="bg-black text-zinc-100 min-h-screen flex flex-col font-body" suppressHydrationWarning>
        <SmoothScroll>
          {/* Animated Purple Beam Background — like ShuttleTV */}
          <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black" style={{ contain: 'strict' }}>
            {/* Main purple beam */}
            <div
              style={{
                position: 'absolute',
                top: '-20%',
                left: '15%',
                width: '70%',
                height: '65%',
                background: 'radial-gradient(ellipse at center, rgba(88,28,220,0.35) 0%, rgba(55,10,140,0.2) 40%, transparent 75%)',
                filter: 'blur(60px)',
                animation: 'purple-beam 12s ease-in-out infinite',
                transformOrigin: 'center top',
                willChange: 'transform, opacity',
              }}
            />
            {/* Secondary smaller glow */}
            <div
              style={{
                position: 'absolute',
                top: '-5%',
                right: '5%',
                width: '35%',
                height: '40%',
                background: 'radial-gradient(ellipse at center, rgba(120,40,220,0.18) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'purple-beam 18s ease-in-out infinite reverse',
                transformOrigin: 'center top',
                willChange: 'transform, opacity',
              }}
            />
            {/* Very subtle crimson accent at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '25%',
                background: 'radial-gradient(ellipse at 20% 100%, rgba(229,9,20,0.06) 0%, transparent 60%)',
                filter: 'blur(30px)',
              }}
            />
          </div>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

