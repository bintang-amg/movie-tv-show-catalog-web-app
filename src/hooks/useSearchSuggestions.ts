import { useEffect, useState } from 'react';
import { searchMovieSuggestions, searchTvSuggestions } from '../services/tmdb';
import type { MediaItem, SuggestionItem } from '../types';
import { useDebouncedValue } from './useDebouncedValue';

const SUGGESTION_DEBOUNCE_MS = 400;
const SUGGESTION_LIMIT = 6;

function toSuggestion(item: MediaItem, mediaType: 'movie' | 'tv'): SuggestionItem {
  return {
    id: item.id,
    mediaType,
    title: item.title ?? item.name ?? 'Untitled',
    year: (item.release_date ?? item.first_air_date ?? '').slice(0, 4) || 'N/A',
    posterUrl: item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : '',
  };
}

export function useSearchSuggestions(rawQuery: string) {
  const query = useDebouncedValue(rawQuery, SUGGESTION_DEBOUNCE_MS);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    Promise.all([searchMovieSuggestions(trimmed), searchTvSuggestions(trimmed)])
      .then(([movies, tvShows]) => {
        if (cancelled) return;
        const movieSuggestions = movies.slice(0, SUGGESTION_LIMIT).map((item) =>
          toSuggestion(item, 'movie'),
        );
        const tvSuggestions = tvShows.slice(0, SUGGESTION_LIMIT).map((item) =>
          toSuggestion(item, 'tv'),
        );
        setSuggestions([...movieSuggestions, ...tvSuggestions]);
        setIsLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setSuggestions([]);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { suggestions, isLoading };
}
