'use client';

import { memo } from 'react';
import { Recipe, Difficulty } from '@/types/models';
import { Clock, Users, ChefHat, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import MarkAsDoneButton from './MarkAsDoneButton';

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 'text-green-600 bg-green-50';
      case Difficulty.MEDIUM:
        return 'text-orange-600 bg-orange-50';
      case Difficulty.HARD:
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer h-full flex flex-col transform hover:scale-[1.02] group relative border border-gray-200 dark:border-gray-700">
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex gap-1 sm:gap-2" onClick={(e) => e.stopPropagation()}>
        <MarkAsDoneButton recipeId={recipe.id} nutrition={recipe.nutrition} size="sm" />
        <FavoriteButton recipeId={recipe.id} size="sm" />
      </div>

      <Link href={`/recipe/${recipe.id}`} className="flex-1 flex flex-col">

        {/* Header */}
        <div className="mb-4 pr-16 sm:pr-20">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
            {recipe.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{recipe.description}</p>
        </div>

        {/* Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} dk</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} kişi</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty}
          </div>
          {recipe.nutrition && (
            <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-semibold">
              <span>🔥</span>
              <span>{Math.round(recipe.nutrition.calories)} kcal</span>
            </div>
          )}
        </div>

        {/* Ingredients Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded-md"
            >
              {ingredient.name}
            </span>
          ))}
          {recipe.ingredients.length > 5 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
              +{recipe.ingredients.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{recipe.category}</span>
          <div className="flex items-center gap-1 text-orange-500 dark:text-orange-400 font-medium text-sm group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors duration-300">
            <span>Detaylar</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(RecipeCard);

