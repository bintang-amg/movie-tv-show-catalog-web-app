# ReelRack – Movie & TV Show Catalog

A responsive web application for browsing movies and TV shows, powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

## Features

- Browse movies and TV shows across 8+ categories
- Real-time multi-search (movies, TV shows, people)
- Add / remove items to a persistent watchlist (localStorage)
- Loading skeletons while data is fetched
- Error handling with retry support
- Responsive, dark Netflix-inspired UI
- Semantic HTML, ARIA attributes, and keyboard navigation

## Tech Stack

| Layer      | Library                     |
| ---------- | --------------------------- |
| Framework  | React 19 + TypeScript       |
| Build tool | Vite 8                      |
| Styling    | Tailwind CSS v4             |
| Routing    | React Router 7              |
| HTTP       | Axios                       |

## Prerequisites

- **Node.js ≥ 18** and npm ≥ 9
- A TMDB API key – [get one free](https://www.themoviedb.org/settings/api)

## Getting Started

```bash
# Clone the repo
git clone <repository-url>
cd movie-tv-show-catalog-web-app

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Then edit .env and set VITE_TMDB_API_KEY=<your-key>

# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start Vite dev server with HMR           |
| `npm run build`  | Type-check then produce a production build |
| `npm run lint`   | Run oxlint                               |
| `npm run preview`| Serve the production build locally       |

## Project Structure

```
src/
  components/     Reusable UI components (Navbar, MediaCard, SearchBar, …)
  context/        React contexts (WatchlistContext)
  hooks/          Custom hooks (useFetch, useWatchlist)
  pages/          Route-level page components
  services/       TMDB API client and image helpers
  types/          Shared TypeScript interfaces
```

## TMDB API Endpoints Used

1. `/movie/popular` – Popular Movies
2. `/movie/top_rated` – Top Rated Movies
3. `/movie/now_playing` – Now Playing Movies
4. `/movie/upcoming` – Upcoming Movies
5. `/tv/popular` – Popular TV Shows
6. `/tv/top_rated` – Top Rated TV Shows
7. `/tv/on_the_air` – On The Air TV Shows
8. `/tv/airing_today` – Airing Today TV Shows
9. `/search/multi` – Multi Search

## License

MIT