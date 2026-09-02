import CardGridSkeleton from '../components/CardGridSkeleton';
import MediaRow from '../components/MediaRow';
import { useWatchlistContext } from '../context/WatchlistContext';
import { useFetch } from '../hooks/useFetch';
import {
  fetchNowPlayingMovies,
  fetchOnTheAirTvShows,
  fetchPopularMovies,
  fetchPopularTvShows,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../services/tmdb';
import { getImageUrl } from '../utils/image';

export default function HomePage() {
  const { isInWatchlist, toggleWatchlist } = useWatchlistContext();
  const popularMovies = useFetch(() => fetchPopularMovies());
  const topRatedMovies = useFetch(() => fetchTopRatedMovies());
  const nowPlayingMovies = useFetch(() => fetchNowPlayingMovies());
  const upcomingMovies = useFetch(() => fetchUpcomingMovies());
  const popularTv = useFetch(() => fetchPopularTvShows());
  const onTheAirTv = useFetch(() => fetchOnTheAirTvShows());

  const connected = [
    popularMovies,
    topRatedMovies,
    nowPlayingMovies,
    upcomingMovies,
    popularTv,
    onTheAirTv,
  ];
  const anyLoading = connected.some((row) => row.isLoading);
  const anyError = connected.find((row) => row.error);

  const heroItem = nowPlayingMovies.data?.results[0];

  return (
    <>
      {heroItem && (
        <section
          aria-label="Featured now playing title"
          className="relative min-h-[420px] w-full overflow-hidden bg-surface"
        >
          {heroItem.backdrop_path && (
            <img
              src={getImageUrl(heroItem.backdrop_path, 'backdrop')}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-transparent to-transparent" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-end px-4 pb-12 pt-32 sm:px-6">
            <h1 className="mb-3 max-w-xl text-3xl font-bold text-white sm:text-5xl">
              {heroItem.title ?? heroItem.name}
            </h1>
            <p className="mb-6 max-w-lg text-sm text-gray-200 line-clamp-3 sm:text-base">
              {heroItem.overview}
            </p>
          </div>
        </section>
      )}

      {anyError ? (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p
            role="alert"
            className="rounded-lg border border-brand/50 bg-brand/10 p-6 text-center"
          >
            {anyError.error}
          </p>
        </div>
      ) : anyLoading ? (
        <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6">
          <CardGridSkeleton count={6} />
        </div>
      ) : (
        <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6">
          {nowPlayingMovies.data && (
            <MediaRow
              title="Now Playing"
              items={nowPlayingMovies.data.results.slice(0, 10)}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          )}
          {popularMovies.data && (
            <MediaRow
              title="Popular Movies"
              items={popularMovies.data.results.slice(0, 10)}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          )}
          {topRatedMovies.data && (
            <MediaRow
              title="Top Rated Movies"
              items={topRatedMovies.data.results.slice(0, 10)}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          )}
          {upcomingMovies.data && (
            <MediaRow
              title="Upcoming Movies"
              items={upcomingMovies.data.results.slice(0, 10)}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          )}
          {popularTv.data && (
            <MediaRow
              title="Popular TV Shows"
              items={popularTv.data.results.slice(0, 10)}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          )}
          {onTheAirTv.data && (
            <MediaRow
              title="On The Air TV"
              items={onTheAirTv.data.results.slice(0, 10)}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          )}
        </main>
      )}
    </>
  );
}
