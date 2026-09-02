import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="relative">
      <label htmlFor="global-search" className="sr-only">
        Search movies and TV shows
      </label>
      <input
        id="global-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
        className="w-32 rounded-full border border-surface-lighter bg-surface-light px-4 py-1.5 text-sm text-white placeholder-muted transition-all focus:w-48 focus:border-brand focus:outline-none sm:w-44 sm:focus:w-56"
      />
    </form>
  );
}
