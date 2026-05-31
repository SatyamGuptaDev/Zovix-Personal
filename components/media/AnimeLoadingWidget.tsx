'use client';

import { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, RefreshCw, Volume2, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LOADING_MESSAGES = [
  "Gathering the seven Dragon Balls... 🐉",
  "Channelling Nen aura from the Hunter Exam... ⚡",
  "Cooking the perfect bowl of Ichiraku Ramen... 🍜",
  "Charging Bankai, please do not close this... ⚔️",
  "Practicing Shadow Clone Jutsu (generating card skeletons)... 👥",
  "Syncing your Eva Unit-01 cockpit... 🤖",
  "Consulting the Death Note for top series... 📓",
  "Unlocking domain expansion: Infinite Catalog... 🔮",
  "Negotiating with Ryuk for more apple snacks... 🍎",
  "Senpai is loading the platform as fast as possible... 🌸",
  "Powering up past 9000... 💥",
  "Transmuting API data into raw anime energy... ⚗️",
  "Finding our way through the Steins;Gate worldline... 🧭"
];

export function AnimeLoadingWidget() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white pb-28 md:pb-20 overflow-hidden select-none">
      {/* ── HEADER SKELETON ── */}
      <header className="px-6 md:px-14 pt-28 md:pt-36 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Glowing Sakura/Mascot placeholder */}
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-pink-500/25 flex items-center justify-center flex-shrink-0 relative animate-pulse shadow-[0_0_15px_rgba(255,121,198,0.15)]">
            <span className="text-2xl animate-bounce duration-[1.5s]">🌸</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              {/* Title loader */}
              <div className="h-9 w-60 md:w-80 bg-zinc-900 rounded-xl animate-pulse border border-zinc-800" />
            </div>
            {/* Subtitle loader */}
            <div className="h-4 w-40 md:w-96 bg-zinc-900/60 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Toggle Button placeholder */}
        <div className="h-10 w-44 rounded-full bg-zinc-900/80 border border-zinc-800 animate-pulse hidden md:block" />
      </header>

      {/* ── DYNAMIC OTAKU MESSAGE BOX (ENGAGING LOADER) ── */}
      <section className="px-6 md:px-14 mb-10">
        <div className="w-full max-w-[1800px] mx-auto p-5 md:p-6 rounded-2xl bg-zinc-950/80 border border-zinc-900/60 flex items-center gap-5 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 pointer-events-none" />
          <div className="p-3.5 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center flex-shrink-0 animate-bounce duration-[2s]">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>

          <div className="flex-1 min-h-[44px] flex flex-col justify-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-pink-500 block mb-1">
              🔮 Otaku Teleporter Status
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={LOADING_MESSAGES[index]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-sm md:text-base font-bold text-pink-100/90 tracking-wide flex items-center gap-1.5"
              >
                {LOADING_MESSAGES[index]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── QUIZ SECTION SKELETON ── */}
      <section className="px-6 md:px-14 mb-12">
        <div className="w-full max-w-[1800px] mx-auto p-6 md:p-8 rounded-3xl bg-zinc-950/40 border border-zinc-900/60 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-4">
            <div className="space-y-1.5 w-full">
              <div className="h-6 w-72 bg-zinc-900 rounded-lg animate-pulse" />
              <div className="h-3 w-96 bg-zinc-900/50 rounded-md animate-pulse hidden md:block" />
            </div>
          </div>
          {/* Question placeholder */}
          <div className="h-5 w-1/3 bg-zinc-900 rounded-md animate-pulse" />
          {/* Options list placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 w-full rounded-2xl bg-zinc-900/60 border border-zinc-900 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* ── SKELETON HORIZONTAL CARD ROW 1 ── */}
      <section className="space-y-6 w-full max-w-[1800px] mx-auto px-6 md:px-14 mb-10">
        <div className="h-8 w-60 bg-zinc-900 rounded-lg animate-pulse border border-zinc-850" />
        <div className="flex gap-4 overflow-x-hidden no-scrollbar">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 flex-shrink-0" style={{ width: '160px' }}>
              <div className="w-full aspect-[2/3] bg-zinc-900 rounded-xl animate-pulse border border-zinc-850" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-zinc-900/80 rounded-md animate-pulse" />
                <div className="h-3 w-1/2 bg-zinc-900/50 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKELETON HORIZONTAL CARD ROW 2 ── */}
      <section className="space-y-6 w-full max-w-[1800px] mx-auto px-6 md:px-14">
        <div className="h-8 w-64 bg-zinc-900 rounded-lg animate-pulse border border-zinc-850" />
        <div className="flex gap-4 overflow-x-hidden no-scrollbar">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 flex-shrink-0" style={{ width: '160px' }}>
              <div className="w-full aspect-[2/3] bg-zinc-900 rounded-xl animate-pulse border border-zinc-850" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-zinc-900/80 rounded-md animate-pulse" />
                <div className="h-3 w-1/2 bg-zinc-900/50 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
