import axios from 'axios';
import type { MediaDetail, MediaItem, MediaResponse, Person } from '../types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: API_KEY, language: 'en-US' },
});

export interface FetchListParams {
  page?: number;
  query?: string;
}

async function fetchList(
  endpoint: string,
  params: FetchListParams = {},
): Promise<MediaResponse> {
  const { data } = await api.get<MediaResponse>(endpoint, { params });
  return data;
}

export async function fetchPopularMovies(params: FetchListParams = {}) {
  return fetchList('/movie/popular', params);
}

export async function fetchTopRatedMovies(params: FetchListParams = {}) {
  return fetchList('/movie/top_rated', params);
}

export async function fetchNowPlayingMovies(params: FetchListParams = {}) {
  return fetchList('/movie/now_playing', params);
}

export async function fetchUpcomingMovies(params: FetchListParams = {}) {
  return fetchList('/movie/upcoming', params);
}

export async function fetchPopularTvShows(params: FetchListParams = {}) {
  return fetchList('/tv/popular', params);
}

export async function fetchTopRatedTvShows(params: FetchListParams = {}) {
  return fetchList('/tv/top_rated', params);
}

export async function fetchOnTheAirTvShows(params: FetchListParams = {}) {
  return fetchList('/tv/on_the_air', params);
}

export async function fetchAiringTodayTvShows(params: FetchListParams = {}) {
  return fetchList('/tv/airing_today', params);
}

export async function fetchPopularPeople(params: FetchListParams = {}) {
  const { data } = await api.get<{ results: Person[] }>('/person/popular', { params });
  return data.results;
}

export async function searchMedia(query: string): Promise<MediaResponse> {
  return fetchList('/search/multi', { query });
}

export async function searchMovieSuggestions(query: string): Promise<MediaItem[]> {
  const { data } = await api.get<MediaResponse>('/search/movie', { params: { query } });
  return data.results;
}

export async function searchTvSuggestions(query: string): Promise<MediaItem[]> {
  const { data } = await api.get<MediaResponse>('/search/tv', { params: { query } });
  return data.results;
}

export async function fetchMovieDetail(id: number): Promise<MediaDetail> {
  const { data } = await api.get<MediaDetail>(`/movie/${id}`, {
    params: { append_to_response: '' },
  });
  return { ...data, media_type: 'movie' };
}

export async function fetchTvDetail(id: number): Promise<MediaDetail> {
  const { data } = await api.get<MediaDetail>(`/tv/${id}`, {
    params: { append_to_response: '' },
  });
  return { ...data, media_type: 'tv' };
}
