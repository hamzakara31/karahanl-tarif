'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/models';
import { RecipeService } from '@/lib/services/recipeService';
import { AIRecipeStorage } from '@/lib/services/aiRecipeStorage';
import { Clock, Users, ChefHat, CheckCircle2 } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import MarkAsDoneButton from '@/components/MarkAsDoneButton';
import BackButton from '@/components/BackButton';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recipeId = params.id as string;
    
    // Önce yerel tariflerden ara
    const recipeService = new RecipeService();
    let foundRecipe = recipeService.getRecipeById(recipeId);
    
    // Bulunamazsa AI tariflerinden ara
    if (!foundRecipe) {
      foundRecipe = AIRecipeStorage.getRecipeById(recipeId) ?? undefined;
    }
    
    setRecipe(foundRecipe || null);
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center px-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Tarif bulunamadı.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn border border-orange-100 dark:border-gray-700 relative">
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1 sm:gap-2">
            <MarkAsDoneButton recipeId={recipe.id} nutrition={recipe.nutrition} size="md" />
            <FavoriteButton recipeId={recipe.id} size="sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-3 pr-20 sm:pr-24">{recipe.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">{recipe.description}</p>

          {/* Nutrition Info */}
          {recipe.nutrition && (
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4 mb-6 border border-orange-200 dark:border-orange-700/50 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="text-orange-500">📊</span>
                Beslenme Bilgileri (Porsiyon Başına)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Kalori</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.round(recipe.nutrition.calories)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">kcal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protein</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {Math.round(recipe.nutrition.protein)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Karbonhidrat</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {Math.round(recipe.nutrition.carbs)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Yağ</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.round(recipe.nutrition.fat)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">g</p>
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Clock, label: 'Hazırlık', value: `${recipe.prepTime} dk` },
              { icon: ChefHat, label: 'Pişirme', value: `${recipe.cookTime} dk` },
              { icon: Users, label: 'Kişi', value: recipe.servings.toString() },
              { icon: CheckCircle2, label: 'Zorluk', value: recipe.difficulty },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fadeIn border border-orange-200 dark:border-orange-700/50"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">{item.label}</p>
                  <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn border border-orange-100 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 flex items-center gap-2">
            <span className="text-orange-500">🥘</span>
            Malzemeler
          </h2>
          <ul className="space-y-2 sm:space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-start gap-2 sm:gap-3 animate-fadeIn hover:bg-orange-50 dark:hover:bg-orange-900/20 p-2 rounded-lg transition-colors duration-300"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5 flex-shrink-0 shadow-md">
                  {index + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300 pt-1 text-sm sm:text-base">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{ingredient.amount}</span>
                  {ingredient.unit && <span className="text-gray-500 dark:text-gray-400"> {ingredient.unit}</span>}
                  <span className="ml-2 font-medium">{ingredient.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn border border-orange-100 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 flex items-center gap-2">
            <span className="text-orange-500">👨‍🍳</span>
            Yapılışı
          </h2>
          <ol className="space-y-3 sm:space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex gap-3 sm:gap-4 animate-fadeIn hover:bg-orange-50 dark:hover:bg-orange-900/20 p-2 sm:p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1 sm:pt-2 text-sm sm:text-base">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 animate-fadeIn border border-orange-100 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-orange-500">🏷️</span>
              Etiketler
            </h2>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-400 rounded-full text-xs sm:text-sm font-medium border border-orange-200 dark:border-orange-700/50 hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fadeIn"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

