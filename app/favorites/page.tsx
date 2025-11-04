'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/types/models';
import { RecipeService } from '@/lib/services/recipeService';
import { FavoritesService } from '@/lib/services/favoritesService';
import RecipeList from '@/components/RecipeList';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const router = useRouter();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recipeService = new RecipeService();
    const favoriteIds = FavoritesService.getFavorites();
    
    const recipes: Recipe[] = [];
    
    // Yerel tariflerden ve AI tariflerinden ara
    favoriteIds.forEach((id) => {
      let recipe = recipeService.getRecipeById(id);
      if (!recipe) {
        recipe = AIRecipeStorage.getRecipeById(id);
      }
      if (recipe) {
        recipes.push(recipe);
      }
    });
    
    setFavoriteRecipes(recipes);
    setIsLoading(false);
  }, []);

  // Favoriler değiştiğinde güncelle
  useEffect(() => {
    const handleStorageChange = () => {
      const recipeService = new RecipeService();
      const favoriteIds = FavoritesService.getFavorites();
      
      const recipes: Recipe[] = [];
      
      // Yerel tariflerden ve AI tariflerinden ara
      favoriteIds.forEach((id) => {
        let recipe = recipeService.getRecipeById(id);
        if (!recipe) {
          recipe = AIRecipeStorage.getRecipeById(id);
        }
        if (recipe) {
          recipes.push(recipe);
        }
      });
      
      setFavoriteRecipes(recipes);
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event için de dinle
    window.addEventListener('favoritesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="mb-6">
            <BackButton to="/" label="Ana Sayfa" />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Favori Tariflerim
            </h1>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
              {favoriteRecipes.length}
            </span>
          </div>
        </div>

        {/* Favorites List */}
        {favoriteRecipes.length > 0 ? (
          <div className="animate-fadeIn">
            <RecipeList recipes={favoriteRecipes} />
          </div>
        ) : (
          <div className="text-center py-16 animate-fadeIn">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Henüz Favori Tarif Yok
            </h2>
            <p className="text-gray-600 mb-6">
              Beğendiğiniz tarifleri favorilere ekleyerek burada görebilirsiniz.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              Tarif Ara
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

