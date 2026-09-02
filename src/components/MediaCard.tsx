import type { MediaItem } from '../types';
import { getImageUrl } from '../utils/image';

interface MediaCardProps {
  item: MediaItem;
  isInWatchlist: boolean;
  onToggleWatchlist: (item: MediaItem) => void;
}

function formatRating(rating: number): string {
  return rating > 0 ? rating.toFixed(1) : 'N/A';
}

function getYear(dateString?: string): string {
  if (!dateString) return 'N/A';
  return dateString.slice(0, 4);
}

export default function MediaCard({ item, isInWatchlist, onToggleWatchlist }: MediaCardProps) {
  const title = item.title ?? item.name ?? 'Untitled';
  const year = getYear(item.release_date ?? item.first_air_date);
  const posterUrl = getImageUrl(item.poster_path);

  return (
    <article className="group relative overflow-hidden rounded-lg bg-surface-light transition-transform duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-brand">
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-lighter">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster for ${title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-muted">
            {title}
          </div>
        )}
        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-yellow-400">
          ★ {formatRating(item.vote_average)}
        </span>
        <button
          type="button"
          onClick={() => onToggleWatchlist(item)}
          aria-pressed={isInWatchlist}
          aria-label={
            isInWatchlist
              ? `Remove ${title} from watchlist`
              : `Add ${title} to watchlist`
          }
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-lg transition-colors hover:bg-brand disabled:opacity-50"
          title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <span aria-hidden="true">{isInWatchlist ? '✓' : '+'}</span>
        </button>
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold" title={title}>
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-muted">{year}</p>
      </div>
    </article>
  );
}
