import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { useWatchlistContext } from '../context/WatchlistContext';
import { useFetch } from '../hooks/useFetch';
import { fetchMovieDetail, fetchTvDetail } from '../services/tmdb';
import { getImageUrl } from '../utils/image';
import type { MediaDetail } from '../types';

export default function DetailPage() {
  const { id, mediaTypeParam } = useParams();
  const mediaType = mediaTypeParam === 'tv' ? 'tv' : 'movie';
  const numericId = Number(id);
  const { isInWatchlist, toggleWatchlist } = useWatchlistContext();

  const fetcher =
    mediaType === 'tv' ? () => fetchTvDetail(numericId) : () => fetchMovieDetail(numericId);

  const { data, isLoading, error, reload } = useFetch<MediaDetail>(fetcher);

  // Refetch when the route id changes without remounting the page.
  const previousId = useRef(numericId);
  useEffect(() => {
    if (previousId.current !== numericId) {
      previousId.current = numericId;
      reload();
    }
  }, [reload, numericId]);

  const title = data?.title ?? data?.name ?? 'Untitled';
  const year = (data?.release_date ?? data?.first_air_date ?? '').slice(0, 4) || 'N/A';
  const inWatchlist = data ? isInWatchlist(data.id) : false;
  const backdropUrl = data ? getImageUrl(data.backdrop_path, 'backdrop') : '';
  const posterUrl = data ? getImageUrl(data.poster_path) : '';

  const handleToggle = () => {
    if (!data) return;
    const watchlistItem = {
      id: data.id,
      media_type: data.media_type,
      title: data.title,
      name: data.name,
      overview: data.overview,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      release_date: data.release_date,
      first_air_date: data.first_air_date,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      genre_ids: data.genres.map((genre) => genre.id),
    };
    toggleWatchlist(watchlistItem);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {isLoading && (
        <div role="status" aria-label="Loading details" className="space-y-4">
          <div className="aspect-[16/7] w-full animate-pulse rounded-lg bg-surface-lighter" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-surface-lighter" />
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={reload} />}

      {!isLoading && !error && data && (
        <section aria-label={title} className="overflow-hidden rounded-lg bg-surface-light">
          <div className="relative h-56 w-full sm:h-80">
            {backdropUrl && (
              <img
                src={backdropUrl}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-light to-transparent" />
          </div>

          <div className="relative -mt-20 flex flex-col gap-6 px-6 pb-8 sm:flex-row sm:items-end">
            <img
              src={posterUrl}
              alt={`Poster for ${title}`}
              className="w-36 shrink-0 rounded-lg shadow-2xl sm:w-44"
            />
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-white sm:text-4xl">{title}</h1>
              <p className="mt-1 text-sm text-muted">
                {year} · {mediaType === 'movie' ? 'Movie' : 'TV Series'}
                {data.number_of_seasons != null && ` · ${data.number_of_seasons} seasons`}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded bg-black/60 px-2 py-0.5 text-sm font-semibold text-yellow-400">
                  ★ {data.vote_average > 0 ? data.vote_average.toFixed(1) : 'N/A'}
                </span>
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-surface-lighter px-3 py-0.5 text-xs text-gray-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={handleToggle}
                aria-pressed={inWatchlist}
                className="mt-4 rounded-md bg-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>

          <div className="px-6 pb-8">
            {data.tagline && <p className="italic text-muted">“{data.tagline}”</p>}
            {data.overview ? (
              <p className="mt-3 text-gray-200">{data.overview}</p>
            ) : (
              <p className="mt-3 text-muted">No overview available.</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
