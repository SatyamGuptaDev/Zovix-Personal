import './globals.css';
import type { ReactNode } from 'react';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  metadataBase: new URL('https://zovix-personal.vercel.app'),
  title: 'Zovix Personal - Productivity Dashboard',
  description:
    'Zovix Personal is a productivity dashboard for managing notes, tasks, bookmarks, reminders, and personal workflows.',
  keywords: [
    'productivity dashboard',
    'notes',
    'tasks',
    'bookmarks',
    'reminders',
    'personal workspace',
    'workflow management',
  ],
  openGraph: {
    title: 'Zovix Personal - Productivity Dashboard',
    description:
      'Manage notes, tasks, bookmarks, reminders, and daily workflows in one personal workspace.',
    url: 'https://zovix-personal.vercel.app',
    siteName: 'Zovix Personal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zovix Personal - Productivity Dashboard',
    description:
      'Manage notes, tasks, bookmarks, reminders, and daily workflows in one personal workspace.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Zovix Personal',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://zovix-personal.vercel.app',
  description:
    'Zovix Personal is a productivity dashboard for notes, tasks, bookmarks, reminders, and personal workflows.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${space.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const originalReleasePointerCapture = Element.prototype.releasePointerCapture;

                Element.prototype.releasePointerCapture = function(pointerId) {
                  try {
                    originalReleasePointerCapture.call(this, pointerId);
                  } catch (e) {
                    if (e && e.name !== 'NotFoundError') {
                      throw e;
                    }
                  }
                };
              }
            `,
          }}
        />
      </head>

      <body
        className="bg-black text-zinc-100 min-h-screen flex flex-col font-body"
        suppressHydrationWarning
      >
        <SmoothScroll>
          {/* Ambient Background — Zovix Dark Violet */}
          <div
            className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black"
            style={{ contain: 'strict' }}
          >
            {/* Primary top-center deep violet core */}
            <div
              style={{
                position: 'absolute',
                top: '-30%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '70%',
                background:
                  'radial-gradient(ellipse at center, rgba(76,20,200,0.18) 0%, rgba(50,10,130,0.08) 35%, rgba(50,10,130,0.02) 60%, transparent 80%)',
                animation: 'purple-beam 16s ease-in-out infinite',
                willChange: 'transform, opacity',
              }}
            />

            {/* Top-left cool blue accent */}
            <div
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                width: '40%',
                height: '45%',
                background:
                  'radial-gradient(ellipse at center, rgba(30,60,180,0.08) 0%, rgba(30,60,180,0.02) 40%, transparent 70%)',
                animation: 'purple-beam 22s ease-in-out infinite reverse',
                willChange: 'transform, opacity',
              }}
            />

            {/* Top-right warm violet accent */}
            <div
              style={{
                position: 'absolute',
                top: '-5%',
                right: '-5%',
                width: '35%',
                height: '40%',
                background:
                  'radial-gradient(ellipse at center, rgba(100,30,200,0.08) 0%, rgba(100,30,200,0.02) 40%, transparent 70%)',
                animation: 'purple-beam 19s ease-in-out infinite',
                willChange: 'transform, opacity',
              }}
            />

            {/* Very subtle warm bottom accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '-10%',
                left: '30%',
                width: '40%',
                height: '30%',
                background:
                  'radial-gradient(ellipse at center, rgba(80,20,160,0.06) 0%, rgba(80,20,160,0.01) 45%, transparent 70%)',
              }}
            />
          </div>

          <Navbar />

          <main className="flex-1 flex flex-col pb-20 md:pb-0">
            {children}
          </main>

          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
