import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const NavBar = () => {
  const [dark, setDark] = useState<boolean>(false);

  // Initialize from localStorage / system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setDark(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(prefersDark);
    }
  }, []);

  // Apply class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <Link to="/" className="text-2xl font-bold text-primary-foreground">
        e.mason
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary-foreground">
          Entrar
        </Link>
        <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary-foreground">
          Área Admin
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </nav>
  );
};
