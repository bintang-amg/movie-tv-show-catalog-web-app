import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import SearchSuggest, { type SearchSuggestHandle } from './SearchSuggest';
import type { SuggestionItem } from '../types';

interface SearchBarProps {
  value: string;
  suggestions: SuggestionItem[];
  isLoadingSuggestions: boolean;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onSelectSuggestion: (item: SuggestionItem) => void;
}

export default function SearchBar({
  value,
  suggestions,
  isLoadingSuggestions,
  onQueryChange,
  onSearch,
  onSelectSuggestion,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const suggestRef = useRef<SearchSuggestHandle>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!focused) return;
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

  const showDropdown = focused && (suggestions.length > 0 || isLoadingSuggestions);

  return (
    <form onSubmit={handleSubmit} role="search" className="relative">
      <label htmlFor="global-search" className="sr-only">
        Search movies and TV shows
      </label>
      <input
        id="global-search"
        type="search"
        value={value}
        onChange={(event) => onQueryChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Search…"
        autoComplete="off"
        className="w-32 rounded-full border border-surface-lighter bg-surface-light px-4 py-1.5 text-sm text-white placeholder-muted transition-all focus:w-48 focus:border-brand focus:outline-none sm:w-44 sm:focus:w-56"
      />
      {showDropdown && (
        <SearchSuggest
          ref={suggestRef}
          suggestions={suggestions}
          isLoading={isLoadingSuggestions}
          onSelect={onSelectSuggestion}
        />
      )}
    </form>
  );
}
