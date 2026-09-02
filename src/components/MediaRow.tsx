import type { MediaItem } from '../types';
import MediaCard from './MediaCard';

interface MediaRowProps {
  title: string;
  items: MediaItem[];
  isInWatchlist: (id: number) => boolean;
  onToggleWatchlist: (item: MediaItem) => void;
}

export default function MediaRow({ title, items, isInWatchlist, onToggleWatchlist }: MediaRowProps) {
  return (
    <section aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}>
      <h2
        id={title.replace(/\s+/g, '-').toLowerCase()}
        className="mb-3 text-lg font-bold text-white"
      >
        {title}
      </h2>
      <div
        className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((item) => (
          <div key={item.id} className="w-32 shrink-0 sm:w-40">
            <MediaCard
              item={item}
              isInWatchlist={isInWatchlist(item.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
