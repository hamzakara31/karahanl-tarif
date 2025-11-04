'use client';

import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { RecipeCategory, Difficulty } from '@/types/models';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: {
    category: string | null;
    difficulty: string | null;
    maxTime: number | null;
  }) => void;
  searchQuery: string;
  filters: {
    category: string | null;
    difficulty: string | null;
    maxTime: number | null;
  };
}

export default function SearchAndFilter({
  onSearch,
  onFilter,
  searchQuery,
  filters,
}: SearchAndFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category: string) => {
    const newCategory = filters.category === category ? null : category;
    onFilter({ ...filters, category: newCategory });
  };

  const handleDifficultyChange = (difficulty: string) => {
    const newDifficulty = filters.difficulty === difficulty ? null : difficulty;
    onFilter({ ...filters, difficulty: newDifficulty });
  };

  const handleMaxTimeChange = (time: number) => {
    const newTime = filters.maxTime === time ? null : time;
    onFilter({ ...filters, maxTime: newTime });
  };

  const clearFilters = () => {
    onSearch('');
    onFilter({ category: null, difficulty: null, maxTime: null });
  };

  const hasActiveFilters = filters.category || filters.difficulty || filters.maxTime || searchQuery;

  return (
    <div className="mb-6 animate-fadeIn">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Tarif ara..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <Filter className="w-5 h-5" />
          <span>Filtrele</span>
          {showFilters && <span className="text-xs">▼</span>}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-300 text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Filtreleri Temizle
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn">
          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Kategori
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(RecipeCategory).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filters.category === category
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Zorluk
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(Difficulty).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultyChange(difficulty)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filters.difficulty === difficulty
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Time Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Maksimum Süre (dakika)
            </label>
            <div className="flex flex-wrap gap-2">
              {[15, 30, 45, 60, 90].map((time) => (
                <button
                  key={time}
                  onClick={() => handleMaxTimeChange(time)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filters.maxTime === time
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {time} dk
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4">
          {searchQuery && (
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium">
              Arama: "{searchQuery}"
            </span>
          )}
          {filters.category && (
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium">
              Kategori: {filters.category}
            </span>
          )}
          {filters.difficulty && (
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium">
              Zorluk: {filters.difficulty}
            </span>
          )}
          {filters.maxTime && (
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium">
              Maks: {filters.maxTime} dk
            </span>
          )}
        </div>
      )}
    </div>
  );
}

