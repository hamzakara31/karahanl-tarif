'use client';

import { useMemo } from 'react';
import { Recipe } from '@/types/models';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  // Performans için memoize et
  const memoizedRecipes = useMemo(() => recipes, [recipes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {memoizedRecipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}

