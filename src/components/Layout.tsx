import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import type { SuggestionItem } from '../types';

interface LayoutProps {
  watchlistCount: number;
  searchQuery: string;
  suggestions: SuggestionItem[];
  isLoadingSuggestions: boolean;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onSelectSuggestion: (item: SuggestionItem) => void;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Navbar {...props} />
      <Outlet />
    </>
  );
}
