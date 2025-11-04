'use client';

import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FavoritesService } from '@/lib/services/favoritesService';

interface FavoriteButtonProps {
  recipeId: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function FavoriteButton({ recipeId, size = 'md', showText = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsFavorite(FavoritesService.isFavorite(recipeId));
  }, [recipeId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = FavoritesService.toggleFavorite(recipeId);
    setIsFavorite(newState);
    setIsAnimating(true);

    // Custom event gönder (diğer bileşenler dinleyebilir)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('favoritesUpdated'));
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${
        isFavorite
          ? 'text-red-500 bg-red-50 hover:bg-red-100'
          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
      } ${isAnimating ? 'scale-125' : ''}`}
      title={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
    >
      <Heart
        className={`${sizeClasses[size]} transition-all duration-300 ${
          isFavorite ? 'fill-current' : ''
        } ${isAnimating ? 'animate-pulse' : ''}`}
      />
      {showText && (
        <span className="text-sm font-medium">
          {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
        </span>
      )}
    </button>
  );
}

