import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CardGridSkeleton from '../components/CardGridSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import MediaCard from '../components/MediaCard';
import SearchSuggest, { type SearchSuggestHandle } from '../components/SearchSuggest';
import { useWatchlistContext } from '../context/WatchlistContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';
import { searchMedia } from '../services/tmdb';
import type { MediaResponse } from '../types';

const SEARCH_DEBOUNCE_MS = 500;

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState(urlQuery);
  const debouncedQuery = useDebouncedValue(localQuery, SEARCH_DEBOUNCE_MS);
  const { isInWatchlist, toggleWatchlist } = useWatchlistContext();
  const { suggestions, isLoading: isLoadingSuggestions } = useSearchSuggestions(localQuery);
  const [inputFocused, setInputFocused] = useState(false);
  const suggestRef = useRef<SearchSuggestHandle>(null);

  const [state, setState] = useState<{
    data: MediaResponse | null;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: false, error: null });

  useEffect(() => {
    setLocalQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ data: null, isLoading: true, error: null });

    searchMedia(trimmed)
      .then((data) => {
        if (!cancelled) setState({ data, isLoading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ data: null, isLoading: false, error: 'Search failed. Please try again.' });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const trimmed = debouncedQuery.trim();
  const showDropdown = inputFocused && (suggestions.length > 0 || isLoadingSuggestions);

  const handleSelectSuggestion = (item: { mediaType: 'movie' | 'tv'; id: number }) => {
    navigate(`/${item.mediaType}/${item.id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!inputFocused) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      suggestRef.current?.navigate(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      suggestRef.current?.navigate(-1);
    } else if (event.key === 'Enter' && suggestions.length > 0) {
      event.preventDefault();
      suggestRef.current?.selectActive();
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Search</h1>

      <form role="search" onSubmit={(event) => event.preventDefault()} className="mb-6 relative max-w-xl">
        <label htmlFor="search-query" className="sr-only">
          Search movies and TV shows
        </label>
        <input
          id="search-query"
          type="search"
          value={localQuery}
          onChange={(event) => setLocalQuery(event.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies, TV shows, people…"
          autoComplete="off"
          className="w-full rounded-lg border border-surface-lighter bg-surface-light px-4 py-3 text-white placeholder-muted focus:border-brand focus:outline-none"
        />
        {showDropdown && (
          <SearchSuggest
            ref={suggestRef}
            suggestions={suggestions}
            isLoading={isLoadingSuggestions}
            onSelect={handleSelectSuggestion}
          />
        )}
      </form>

      {!trimmed && (
        <p className="text-muted">Type a query above to search across movies, TV shows, and people.</p>
      )}

      {trimmed && state.isLoading && <CardGridSkeleton count={12} />}
      {trimmed && !state.isLoading && state.error && (
        <ErrorMessage message={state.error} />
      )}
      {trimmed && !state.isLoading && state.data && (
        <>
          <p className="mb-4 text-sm text-muted" role="status">
            {state.data.total_results} result{state.data.total_results === 1 ? '' : 's'} for “
            {trimmed}”
          </p>
          <div className="movie-grid">
            {state.data.results
              .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
              .map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  isInWatchlist={isInWatchlist(item.id)}
                  onToggleWatchlist={toggleWatchlist}
                />
              ))}
          </div>
        </>
      )}
    </section>
  );
}
