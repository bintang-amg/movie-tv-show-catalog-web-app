interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-brand/50 bg-brand/10 p-6 text-center"
    >
      <p className="font-semibold text-white">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-brand px-4 py-2 font-medium transition-colors hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}
