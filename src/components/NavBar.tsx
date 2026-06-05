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
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-200">
      <Link to="/" className="text-lg font-semibold tracking-tight text-foreground hover:opacity-85 transition-opacity">
        e.mason
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/login" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          Entrar
        </Link>
        <Link to="/admin" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          Área Admin
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setDark(!dark)}>
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </nav>
  );
};
