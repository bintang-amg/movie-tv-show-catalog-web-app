import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { WatchlistProvider, useWatchlistContext } from './context/WatchlistContext';
import { useSearchSuggestions } from './hooks/useSearchSuggestions';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TvShowsPage from './pages/TvShowsPage';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';
import DetailPage from './pages/DetailPage';
import type { SuggestionItem } from './types';

function AppRoutes() {
  const { watchlist } = useWatchlistContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { suggestions, isLoading } = useSearchSuggestions(searchQuery);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectSuggestion = (item: SuggestionItem) => {
    setSearchQuery('');
    navigate(`/${item.mediaType}/${item.id}`);
  };

  const layoutProps = {
    watchlistCount: watchlist.length,
    searchQuery,
    suggestions,
    isLoadingSuggestions: isLoading,
    onQueryChange: handleQueryChange,
    onSearch: handleSearch,
    onSelectSuggestion: handleSelectSuggestion,
  };

  return (
    <Routes>
      <Route element={<Layout {...layoutProps} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv" element={<TvShowsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="/tv/:id" element={<DetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;
