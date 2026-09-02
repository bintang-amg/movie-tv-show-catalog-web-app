import {
  fetchAiringTodayTvShows,
  fetchOnTheAirTvShows,
  fetchPopularTvShows,
  fetchTopRatedTvShows,
} from '../services/tmdb';
import MediaBrowsePage, { type TabDefinition } from './MediaBrowsePage';

const tvTabs: TabDefinition[] = [
  { id: 'popular', label: 'Popular', fetcher: () => fetchPopularTvShows() },
  { id: 'top-rated', label: 'Top Rated', fetcher: () => fetchTopRatedTvShows() },
  { id: 'on-the-air', label: 'On The Air', fetcher: () => fetchOnTheAirTvShows() },
  { id: 'airing-today', label: 'Airing Today', fetcher: () => fetchAiringTodayTvShows() },
];

export default function TvShowsPage() {
  return <MediaBrowsePage heading="TV Shows" tabs={tvTabs} />;
}