import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  watchlistCount: number;
  onSearch: (query: string) => void;
}

export default function Layout({ watchlistCount, onSearch }: LayoutProps) {
  return (
    <>
      <Navbar watchlistCount={watchlistCount} onSearch={onSearch} />
      <Outlet />
    </>
  );
}
