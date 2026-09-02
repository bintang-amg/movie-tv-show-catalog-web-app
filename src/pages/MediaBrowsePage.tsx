import { useState } from 'react';
import CardGridSkeleton from '../components/CardGridSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import MediaCard from '../components/MediaCard';
import { useWatchlistContext } from '../context/WatchlistContext';
import { useFetch } from '../hooks/useFetch';
import type { MediaItem, MediaResponse } from '../types';

export interface TabDefinition {
  id: string;
  label: string;
  fetcher: () => Promise<MediaResponse>;
}

interface MediaBrowsePageProps {
  heading: string;
  tabs: TabDefinition[];
}

export default function MediaBrowsePage({ heading, tabs }: MediaBrowsePageProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? '');
  const { isInWatchlist, toggleWatchlist } = useWatchlistContext();

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const { data, isLoading, error, reload } = useFetch<MediaResponse>(
    activeTab
      ? activeTab.fetcher
      : async () => ({ results: [], page: 1, total_pages: 0, total_results: 0 }),
  );

  const renderCard = (item: MediaItem) => (
    <MediaCard
      key={item.id}
      item={item}
      isInWatchlist={isInWatchlist(item.id)}
      onToggleWatchlist={toggleWatchlist}
    />
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-white">{heading}</h1>

      <div role="tablist" aria-label={`${heading} categories`} className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === activeTabId}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === activeTabId ? 0 : -1}
            onClick={() => setActiveTabId(tab.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const index = tabs.findIndex((t) => t.id === activeTabId);
                const direction = event.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + direction + tabs.length) % tabs.length;
                setActiveTabId(tabs[nextIndex].id);
              }
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              tab.id === activeTabId
                ? 'bg-brand text-white'
                : 'bg-surface-light text-gray-200 hover:bg-surface-lighter'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab?.id}`}
        aria-labelledby={`tab-${activeTab?.id}`}
      >
        {isLoading && <CardGridSkeleton count={12} />}

        {error && <ErrorMessage message={error} onRetry={reload} />}

        {!isLoading && !error && data && (
          <div className="movie-grid">{data.results.map(renderCard)}</div>
        )}
      </div>
    </section>
  );
}
