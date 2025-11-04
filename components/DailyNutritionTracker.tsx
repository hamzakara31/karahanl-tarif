'use client';

import { useEffect, useState } from 'react';
import { DailyTrackerService, DailyNutrition } from '@/lib/services/dailyTrackerService';
import { Flame, Droplet, Beef, Wheat, Leaf, Candy } from 'lucide-react';

export default function DailyNutritionTracker() {
  const [nutrition, setNutrition] = useState<DailyNutrition | null>(null);

  useEffect(() => {
    // İlk yükleme
    updateNutrition();

    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      updateNutrition();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('nutritionUpdated', handleStorageChange);

    // Eski verileri temizle
    DailyTrackerService.cleanOldData();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('nutritionUpdated', handleStorageChange);
    };
  }, []);

  const updateNutrition = () => {
    const todayNutrition = DailyTrackerService.getTodayNutrition();
    setNutrition(todayNutrition);
  };

  if (!nutrition || nutrition.calories === 0) {
    return null; // Hiçbir şey yapılmadıysa gösterme
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-4 md:p-6 mb-6 animate-fadeIn border border-orange-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 sm:gap-2">
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
          <span className="hidden sm:inline">Bugünkü Beslenme</span>
          <span className="sm:hidden">Beslenme</span>
        </h3>
        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
        {/* Kalori */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg p-2 sm:p-3 border border-orange-200 dark:border-orange-700/50 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className="w-3 h-3 text-orange-600 dark:text-orange-400" />
            <span className="text-[10px] sm:text-xs font-semibold text-orange-700 dark:text-orange-300">Kalori</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-orange-700 dark:text-orange-300 text-center">
            {Math.round(nutrition.calories)}
          </p>
          <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5">kcal</p>
        </div>

        {/* Protein */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg p-2 sm:p-3 border border-red-200 dark:border-red-700/50 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Beef className="w-3 h-3 text-red-600 dark:text-red-400" />
            <span className="text-[10px] sm:text-xs font-semibold text-red-700 dark:text-red-300">Protein</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-red-700 dark:text-red-300 text-center">
            {Math.round(nutrition.protein)}
          </p>
          <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5">g</p>
        </div>

        {/* Karbonhidrat */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg p-2 sm:p-3 border border-yellow-200 dark:border-yellow-700/50 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Wheat className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
            <span className="text-[10px] sm:text-xs font-semibold text-yellow-700 dark:text-yellow-300">Karbonhidrat</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-yellow-700 dark:text-yellow-300 text-center">
            {Math.round(nutrition.carbs)}
          </p>
          <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5">g</p>
        </div>

        {/* Yağ */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-2 sm:p-3 border border-blue-200 dark:border-blue-700/50 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Droplet className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] sm:text-xs font-semibold text-blue-700 dark:text-blue-300">Yağ</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-300 text-center">
            {Math.round(nutrition.fat)}
          </p>
          <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5">g</p>
        </div>

        {/* Lif */}
        {nutrition.fiber > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-2 sm:p-3 border border-green-200 dark:border-green-700/50 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Leaf className="w-3 h-3 text-green-600 dark:text-green-400" />
              <span className="text-[10px] sm:text-xs font-semibold text-green-700 dark:text-green-300">Lif</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-green-700 dark:text-green-300 text-center">
              {Math.round(nutrition.fiber)}
            </p>
            <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5">g</p>
          </div>
        )}

        {/* Şeker */}
        {nutrition.sugar > 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg p-2 sm:p-3 border border-pink-200 dark:border-pink-700/50 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Candy className="w-3 h-3 text-pink-600 dark:text-pink-400" />
              <span className="text-[10px] sm:text-xs font-semibold text-pink-700 dark:text-pink-300">Şeker</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-pink-700 dark:text-pink-300 text-center">
              {Math.round(nutrition.sugar)}
            </p>
            <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5">g</p>
          </div>
        )}
      </div>
    </div>
  );
}

