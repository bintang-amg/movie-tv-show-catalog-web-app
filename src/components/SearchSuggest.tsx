import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { SuggestionItem } from '../types';

export interface SearchSuggestHandle {
  navigate: (direction: -1 | 1) => void;
  selectActive: () => void;
  clear: () => void;
}

interface SearchSuggestProps {
  suggestions: SuggestionItem[];
  isLoading: boolean;
  onSelect: (item: SuggestionItem) => void;
}

const SearchSuggest = forwardRef<SearchSuggestHandle, SearchSuggestProps>(
  function SearchSuggest({ suggestions, isLoading, onSelect }, ref) {
    const [activeIndex, setActiveIndex] = useState(-1);
    const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

    useEffect(() => {
      setActiveIndex(-1);
    }, [suggestions]);

    useEffect(() => {
      const option = optionRefs.current[activeIndex];
      if (option) {
        option.scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex]);

    const navigate = (direction: -1 | 1) => {
      setActiveIndex((prev) => {
        const last = suggestions.length - 1;
        if (last < 0) return -1;
        const next = prev + direction;
        if (next < 0) return last;
        if (next > last) return 0;
        return next;
      });
    };

    const selectActive = () => {
      const active = suggestions[activeIndex];
      if (active) onSelect(active);
    };

    useImperativeHandle(ref, () => ({
      navigate,
      selectActive,
      clear() {
        setActiveIndex(-1);
      },
    }));

    const showDropdown = suggestions.length > 0 || isLoading;

    return (
      <div className="relative">
        {showDropdown && (
          <ul
            role="listbox"
            aria-label="Search suggestions"
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-auto rounded-lg border border-surface-lighter bg-surface-light shadow-xl"
          >
            {isLoading && suggestions.length === 0 && (
              <li className="px-4 py-3 text-sm text-muted" role="option" aria-disabled="true">
                Searching…
              </li>
            )}

            {suggestions.map((item, index) => (
              <li
                key={`${item.mediaType}-${item.id}`}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                role="option"
                aria-selected={index === activeIndex}
              >
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onSelect(item);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors focus:outline-none ${
                    index === activeIndex ? 'bg-surface-lighter' : ''
                  }`}
                >
                  {item.posterUrl ? (
                    <img
                      src={item.posterUrl}
                      alt=""
                      className="h-12 w-8 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-8 shrink-0 items-center justify-center rounded bg-surface-lighter text-xs text-muted">
                      {item.mediaType === 'movie' ? 'M' : 'TV'}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-white">{item.title}</span>
                    <span className="block text-xs text-muted">
                      {item.mediaType === 'movie' ? 'Movie' : 'TV'} · {item.year}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default SearchSuggest;
