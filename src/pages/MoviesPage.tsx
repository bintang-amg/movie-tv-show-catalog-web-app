import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../services/tmdb';
import MediaBrowsePage, { type TabDefinition } from './MediaBrowsePage';

const movieTabs: TabDefinition[] = [
  { id: 'popular', label: 'Popular', fetcher: () => fetchPopularMovies() },
  { id: 'top-rated', label: 'Top Rated', fetcher: () => fetchTopRatedMovies() },
  { id: 'now-playing', label: 'Now Playing', fetcher: () => fetchNowPlayingMovies() },
  { id: 'upcoming', label: 'Upcoming', fetcher: () => fetchUpcomingMovies() },
];

export default function MoviesPage() {
  return <MediaBrowsePage heading="Movies" tabs={movieTabs} />;
}