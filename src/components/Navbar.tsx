import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

interface NavbarProps {
  watchlistCount: number;
  onSearch: (query: string) => void;
}

const navItems = [
  { to: '/movies', label: 'Movies' },
  { to: '/tv', label: 'TV Shows' },
  { to: '/watchlist', label: 'Watchlist' },
];

export default function Navbar({ watchlistCount, onSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
      isActive ? 'text-brand' : 'text-gray-200 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-surface-lighter bg-surface/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="ReelRack home"
        >
          <span aria-hidden="true" className="text-brand">▶</span>
          ReelRack
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SearchBar onSearch={onSearch} />
          <span className="hidden text-xs text-muted sm:inline" aria-hidden="true">
            {watchlistCount} saved
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="rounded-md p-2 text-gray-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-surface-lighter px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
