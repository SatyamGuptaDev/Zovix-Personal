'use client';
import { useEffect, useState } from 'react';
import { usePreferences } from '@/hooks/usePreferences';
import { HorizontalRow } from './HorizontalRow';
import { discoverMedia } from '@/app/actions';
import { Media } from '@/types/tmdb';

export function RecommendedForYou() {
  const { preferences } = usePreferences();
  const [recommendations, setRecommendations] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (preferences.preferredGenres.length === 0) {
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const genreStr = preferences.preferredGenres.join('|');
        const params: Record<string, string> = {
          with_genres: genreStr,
          sort_by: 'popularity.desc',
          include_adult: preferences.adultContent ? 'true' : 'false'
        };
        if (preferences.originalLanguage && preferences.originalLanguage.length > 0) {
          params.with_original_language = preferences.originalLanguage.join('|');
        }

        const data = await discoverMedia('movie', params);
        if (data.results) {
          setRecommendations(data.results.slice(0, 15).map((item: any) => ({ ...item, media_type: 'movie' })));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [preferences.preferredGenres, preferences.adultContent, preferences.originalLanguage]);

  if (loading || preferences.preferredGenres.length === 0 || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <HorizontalRow title="Recommended For You" items={recommendations} />
    </div>
  );
}
