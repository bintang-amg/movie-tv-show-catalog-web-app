function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-surface-light">
      <div className="aspect-[2/3] animate-pulse bg-surface-lighter" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-3/4 animate-pulse rounded bg-surface-lighter" />
        <div className="h-2 w-1/2 animate-pulse rounded bg-surface-lighter" />
      </div>
    </div>
  );
}

interface CardGridSkeletonProps {
  count?: number;
}

export default function CardGridSkeleton({ count = 10 }: CardGridSkeletonProps) {
  return (
    <div
      className="movie-grid"
      role="status"
      aria-label="Loading content"
    >
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
