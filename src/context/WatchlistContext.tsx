import { createContext, useContext, type ReactNode } from 'react';
import type { MediaItem } from '../types';
import { useWatchlist } from '../hooks/useWatchlist';

interface WatchlistContextValue {
  watchlist: MediaItem[];
  isInWatchlist: (id: number) => boolean;
  toggleWatchlist: (item: MediaItem) => void;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const watchlistState = useWatchlist();
  return (
    <WatchlistContext.Provider value={watchlistState}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext(): WatchlistContextValue {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlistContext must be used within a WatchlistProvider');
  }
  return context;
}
