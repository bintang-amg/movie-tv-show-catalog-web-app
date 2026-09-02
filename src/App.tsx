import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { WatchlistProvider, useWatchlistContext } from './context/WatchlistContext';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TvShowsPage from './pages/TvShowsPage';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';

function AppRoutes() {
  const { watchlist } = useWatchlistContext();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Routes>
      <Route element={<Layout watchlistCount={watchlist.length} onSearch={handleSearch} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv" element={<TvShowsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
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
