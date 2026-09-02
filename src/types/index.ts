export interface MediaItem {
  id: number;
  media_type?: 'movie' | 'tv';
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
}

export interface MediaResponse {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SuggestionItem {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  year: string;
  posterUrl: string;
}

export interface MediaDetail {
  id: number;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  runtime?: number | null;
  number_of_seasons?: number;
  number_of_episodes?: number;
  tagline?: string;
  status?: string;
  original_language?: string;
  popularity?: number;
}
