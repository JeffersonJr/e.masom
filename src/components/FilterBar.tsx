import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
  filterOptions?: Record<string, FilterOption[]>; // e.g., { status: [{label:'Regular',value:'regular'}, ...] }
}

export default function FilterBar({ onSearch, onFilterChange, filterOptions = {} }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleFilterSelect = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-background/80 backdrop-blur-lg rounded-xl border border-border shadow-sm">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          type="text"
          placeholder="Buscar conta ou loja..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition"
        />
      </form>

      {/* Dynamic Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="relative">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs font-medium text-accent hover:bg-accent/20 transition"
            >
              {key}
              <Filter size={12} />
            </button>
            {/* Dropdown */}
            <div className="absolute left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-10">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleFilterSelect(key, opt.value)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
