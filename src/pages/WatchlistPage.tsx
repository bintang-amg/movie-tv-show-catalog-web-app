import { Link } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
import { useWatchlistContext } from '../context/WatchlistContext';

export default function WatchlistPage() {
  const { watchlist, isInWatchlist, toggleWatchlist } = useWatchlistContext();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-white">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="rounded-lg border border-surface-lighter bg-surface-light p-10 text-center">
          <p className="mb-4 text-muted">Your watchlist is empty.</p>
          <Link
            to="/movies"
            className="inline-block rounded-md bg-brand px-4 py-2 font-medium text-white transition-colors hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Browse movies
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted" role="status">
            {watchlist.length} saved title{watchlist.length === 1 ? '' : 's'}
          </p>
          <div className="movie-grid">
            {watchlist.map((item) => (
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
