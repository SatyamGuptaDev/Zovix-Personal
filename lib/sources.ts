export interface Source {
  id: string;
  name: string;
  type: "iframe" | "hls";
  languages?: string[];
  url: (
    type: "movie" | "tv",
    id: string,
    season?: number,
    episode?: number,
    lang?: string
  ) => string;
}

export const sources: Source[] = [
  {
    id: "vidlink",
    name: "VidLink (Fast/Multi-Dub)",
    type: "iframe",
    languages: ["en", "es", "fr", "de", "hi", "pt", "ar"],
    url: (type, id, season, episode, lang) => {
      const base = type === "movie"
        ? `https://vidlink.pro/movie/${id}`
        : `https://vidlink.pro/tv/${id}/${season}/${episode}`;
      const params = new URLSearchParams({
        primaryColor: "E11D48",
        secondaryColor: "18181B",
        iconColor: "ffffff",
        autoplay: "true"
      });
      if (lang) params.append("lang", lang);
      return `${base}?${params.toString()}`;
    }
  },
  {
    id: "autoembed",
    name: "AutoEmbed (Reliable)",
    type: "iframe",
    url: (type, id, season, episode) =>
      type === "movie"
        ? `https://autoembed.co/movie/tmdb/${id}`
        : `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`
  },
  {
    id: "vidbinge",
    name: "VidBinge (Ad-Free)",
    type: "iframe",
    url: (type, id, season, episode) =>
      type === "movie"
        ? `https://vidbinge.dev/embed/movie/${id}`
        : `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}`
  },
  {
    id: "2embed",
    name: "2Embed (Fallback)",
    type: "iframe",
    url: (type, id, season, episode) =>
      type === "movie"
        ? `https://www.2embed.cc/embed/${id}`
        : `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
  },
  {
    id: "cinesrc",
    name: "CineSrc (Premium)",
    type: "iframe",
    url: (type, id, season, episode) =>
      type === "movie"
        ? `https://cinesrc.st/embed/movie/${id}?color=%23e50914&autoplay=true`
        : `https://cinesrc.st/embed/tv/${id}?s=${season}&e=${episode}&color=%23e50914&autoplay=true`
  }
];

export const getSource = (id?: string): Source =>
  sources.find((s) => s.id === id) || sources[0];
