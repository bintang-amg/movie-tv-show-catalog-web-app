import { useCallback, useEffect, useState } from 'react';
import type { MediaItem } from '../types';

const STORAGE_KEY = 'catalog_watchlist';

function loadWatchlist(): MediaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MediaItem[]) : [];
  } catch {
    return [];
  }
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<MediaItem[]>(() => loadWatchlist());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch {
      // Ignore storage write failures (e.g. private mode)
    }
  }, [watchlist]);

  const isInWatchlist = useCallback(
    (id: number) => watchlist.some((item) => item.id === id),
    [watchlist],
  );

  const addToWatchlist = useCallback((item: MediaItem) => {
    setWatchlist((prev) => (prev.some((i) => i.id === item.id) ? prev : [item, ...prev]));
  }, []);

  const removeFromWatchlist = useCallback((id: number) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleWatchlist = useCallback(
    (item: MediaItem) => {
      if (isInWatchlist(item.id)) {
        removeFromWatchlist(item.id);
      } else {
        addToWatchlist(item);
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist],
  );

  return { watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist };
}
