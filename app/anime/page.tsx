import { tmdb } from '@/lib/tmdb';
import { HorizontalRow } from '@/components/media/HorizontalRow';
import { Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AnimePage() {
  const anime = await tmdb.getAnime();

  return (
    <div className="flex flex-col min-h-screen pb-28 md:pb-20 bg-black">
      {/* Page Header */}
      <div className="relative px-6 md:px-14 pt-28 md:pt-32 pb-8 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 100% at 20% 0%, rgba(168,85,247,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(88,28,220,0.2), rgba(88,28,220,0.05))',
              border: '1px solid rgba(88,28,220,0.3)',
            }}
          >
            <Star size={22} className="text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white">
              Anime
            </h1>
            <p className="text-sm text-white/35 mt-0.5">
              Top-rated anime series and films from Japan and beyond
            </p>
          </div>
        </div>
      </div>

      {/* Top 10 numbered */}
      <div className="px-2">
        <HorizontalRow
          title="🏆 Top 10 Anime"
          items={anime.results?.slice(0, 10) || []}
          variant="numbered"
        />
      </div>

      {/* All anime */}
      <HorizontalRow
        title="✨ Discover Anime"
        items={anime.results || []}
      />
    </div>
  );
}
