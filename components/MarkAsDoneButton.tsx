'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DailyTrackerService } from '@/lib/services/dailyTrackerService';
import { NutritionInfo } from '@/types/models';

interface MarkAsDoneButtonProps {
  recipeId: string;
  nutrition?: NutritionInfo;
  size?: 'sm' | 'md' | 'lg';
}

export default function MarkAsDoneButton({ recipeId, nutrition, size = 'md' }: MarkAsDoneButtonProps) {
  const [isDone, setIsDone] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsDone(DailyTrackerService.isRecipeDone(recipeId));
  }, [recipeId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!nutrition) {
      alert('Bu tarif için beslenme bilgileri bulunamadı.');
      return;
    }

    if (isDone) {
      DailyTrackerService.removeRecipe(recipeId, nutrition);
      setIsDone(false);
    } else {
      DailyTrackerService.addRecipe(recipeId, nutrition);
      setIsDone(true);
    }

    setIsAnimating(true);
    
    // Custom event gönder
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('nutritionUpdated'));
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const buttonClasses = `flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 ${
    !nutrition
      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-800'
      : isDone
      ? 'text-white bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 shadow-green-200 dark:shadow-green-900/50'
      : 'text-gray-600 dark:text-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/30 dark:hover:to-green-800/30 hover:text-green-600 dark:hover:text-green-400 border border-gray-200 dark:border-gray-600'
  } ${isAnimating ? 'scale-110' : ''}`;

  return (
    <button
      onClick={handleToggle}
      className={buttonClasses}
      disabled={!nutrition}
      title={nutrition ? (isDone ? 'Yapıldı olarak işaretle' : 'Yaptım olarak işaretle') : 'Beslenme bilgisi gerekli'}
    >
      {isDone ? (
        <CheckCircle2 className={`${sizeClasses[size]} fill-current animate-scaleIn`} />
      ) : (
        <Circle className={sizeClasses[size]} strokeWidth={2} />
      )}
      {size !== 'sm' && nutrition && (
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
          {isDone ? 'Yapıldı' : 'Yaptım'}
        </span>
      )}
    </button>
  );
}

