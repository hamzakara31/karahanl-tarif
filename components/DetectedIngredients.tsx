'use client';

import { DetectedIngredient } from '@/types/models';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface DetectedIngredientsProps {
  ingredients: DetectedIngredient[];
}

export default function DetectedIngredients({ ingredients }: DetectedIngredientsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn border border-orange-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-800">
          Tespit Edilen Malzemeler
        </h2>
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
          {ingredients.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-full hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="text-sm font-medium text-orange-700">
              {ingredient.name}
            </span>
            {ingredient.confidence > 0.7 && (
              <CheckCircle2 className="w-4 h-4 text-green-500 animate-scaleIn" />
            )}
            <span className="text-xs text-gray-500 font-medium">
              {Math.round(ingredient.confidence * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

