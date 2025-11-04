'use client';

import { useState, useRef, useEffect } from 'react';
import { AIRecipeService } from '@/lib/services/aiRecipeService';
import { RecipeService } from '@/lib/services/recipeService';
import { DetectedIngredient, Recipe } from '@/types/models';
import ImageUpload from '@/components/ImageUpload';
import DetectedIngredients from '@/components/DetectedIngredients';
import RecipeList from '@/components/RecipeList';
import ProgressBar from '@/components/ProgressBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import SearchAndFilter from '@/components/SearchAndFilter';
import DailyNutritionTracker from '@/components/DailyNutritionTracker';
import { ChefHat, Settings, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { RecipeCategory, Difficulty } from '@/types/models';

export default function Home() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([]);
  const [matchedRecipes, setMatchedRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [useGemini, setUseGemini] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: null as string | null,
    difficulty: null as string | null,
    maxTime: null as number | null,
  });

  const aiRecipeService = useRef(new AIRecipeService()).current;
  const recipeService = useRef(new RecipeService()).current;

  useEffect(() => {
    // LocalStorage'dan API anahtarını kontrol et
    const savedKey = localStorage.getItem('api_key');
    const savedUseGemini = localStorage.getItem('use_gemini') === 'true';
    
    if (savedKey) {
      setApiKey(savedKey);
      setUseGemini(savedUseGemini);
      setHasApiKey(true);
      aiRecipeService.setApiKey(savedKey, savedUseGemini);
    } else {
      setShowApiModal(true);
    }
  }, []);

  const handleImagesSelect = (files: File[]) => {
    setSelectedImages(files);
    // Yeni resim seçildiğinde sadece sonuçları temizle, fotoğrafları koru
    setDetectedIngredients([]);
    setMatchedRecipes([]);
    setAllRecipes([]);
    setError(null);
    setSearchQuery('');
    setFilters({ category: null, difficulty: null, maxTime: null });

    // Preview'ları oluştur
    const previewPromises = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then((previews) => {
      setImagePreviews(previews);
    });
  };

  const handleAnalyze = async () => {
    if (selectedImages.length === 0) return;

    if (!hasApiKey) {
      setShowApiModal(true);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    // Önceki sonuçları temizle ama fotoğrafları koru
    setDetectedIngredients([]);
    setMatchedRecipes([]);
    setAllRecipes([]);
    setSearchQuery('');
    setFilters({ category: null, difficulty: null, maxTime: null });

    try {
      // AI servisi ile görüntüleri analiz et ve tarifleri al
      const result = await aiRecipeService.analyzeImagesAndGetRecipes(selectedImages);
      
      setDetectedIngredients(result.ingredients);
      setMatchedRecipes(result.recipes);
      setAllRecipes(result.recipes);

      // AI tariflerini localStorage'a kaydet (tarif detay sayfası için)
      if (result.recipes.length > 0) {
        try {
          const existingRecipes = JSON.parse(localStorage.getItem('ai_recipes') || '{}');
          result.recipes.forEach((recipe) => {
            existingRecipes[recipe.id] = recipe;
          });
          localStorage.setItem('ai_recipes', JSON.stringify(existingRecipes));
        } catch (err) {
          console.error('AI tarifleri kaydedilemedi:', err);
        }
      }

      // Eğer AI'dan tarif gelmediyse, yerel tarif servisi ile eşleştir
      if (result.recipes.length === 0 && result.ingredients.length > 0) {
        const localRecipes = recipeService.findRecipes(result.ingredients);
        setMatchedRecipes(localRecipes);
        setAllRecipes(localRecipes);
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Görüntü analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      // Hata durumunda fotoğrafları koru, sadece sonuçları temizle
      // Fotoğraflar zaten korunuyor (selectedImages ve imagePreviews değişmedi)
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImages([]);
    setImagePreviews([]);
    setDetectedIngredients([]);
    setMatchedRecipes([]);
    setAllRecipes([]);
    setError(null);
    setSearchQuery('');
    setFilters({ category: null, difficulty: null, maxTime: null });
  };

  // Arama ve filtreleme
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query: string, filterSettings: typeof filters) => {
    let filtered = [...allRecipes];

    // Arama
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(lowerQuery) ||
          recipe.description.toLowerCase().includes(lowerQuery) ||
          recipe.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(lowerQuery)
          ) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Kategori filtresi
    if (filterSettings.category) {
      filtered = filtered.filter((recipe) => recipe.category === filterSettings.category);
    }

    // Zorluk filtresi
    if (filterSettings.difficulty) {
      filtered = filtered.filter((recipe) => recipe.difficulty === filterSettings.difficulty);
    }

    // Süre filtresi
    if (filterSettings.maxTime) {
      filtered = filtered.filter(
        (recipe) => recipe.prepTime + recipe.cookTime <= filterSettings.maxTime!
      );
    }

    setMatchedRecipes(filtered);
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      aiRecipeService.setApiKey(apiKey, useGemini);
      setHasApiKey(true);
      setShowApiModal(false);
      localStorage.setItem('api_key', apiKey);
      localStorage.setItem('use_gemini', useGemini.toString());
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Daily Nutrition Tracker */}
        <div className="max-w-4xl mx-auto mb-6">
          <DailyNutritionTracker />
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          {/* Action Buttons - Üstte */}
          <div className="flex justify-end items-center gap-2 mb-4 px-2">
            <DarkModeToggle />
            <Link
              href="/favorites"
              className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Favoriler"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
            <button
              onClick={() => setShowApiModal(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              title="API Ayarları"
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Title Section */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 animate-pulse-slow" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text break-words">
              Karahanlı Tarif
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg px-2">
            Malzemelerinizi analiz edin, tarifinizi bulun!
          </p>
          {hasApiKey && (
            <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" />
              AI ile gelişmiş analiz aktif
            </p>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <ImageUpload
            onImagesSelect={handleImagesSelect}
            imagePreviews={imagePreviews}
            isAnalyzing={isAnalyzing}
            onAnalyze={handleAnalyze}
            onReset={handleReset}
            selectedImages={selectedImages}
          />
          
          {/* Progress Bar */}
          {isAnalyzing && (
            <div className="mt-6 max-w-2xl mx-auto">
              <ProgressBar isActive={isAnalyzing} />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 animate-slideIn shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Detected Ingredients */}
        {detectedIngredients.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <DetectedIngredients ingredients={detectedIngredients} />
          </div>
        )}

        {/* Matched Recipes */}
        {allRecipes.length > 0 && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                🎉 Bulunan Tarifler
              </h2>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-semibold">
                {matchedRecipes.length} tarif
              </span>
            </div>

            {/* Search and Filter */}
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              searchQuery={searchQuery}
              filters={filters}
            />

            {/* Recipe List */}
            {matchedRecipes.length > 0 ? (
              <RecipeList recipes={matchedRecipes} />
            ) : (
              <div className="text-center py-12 animate-fadeIn">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Sonuç Bulunamadı
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Arama kriterlerinize uygun tarif bulunamadı.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ category: null, difficulty: null, maxTime: null });
                    setMatchedRecipes(allRecipes);
                  }}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State - No Recipes */}
        {!isAnalyzing && detectedIngredients.length > 0 && allRecipes.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-12 animate-fadeIn">
            <div className="mb-6">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Tarif Bulunamadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                Bu malzemelerle eşleşen tarif bulunamadı. Farklı fotoğraflar deneyebilir veya mevcut fotoğraflarla tekrar analiz edebilirsiniz.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || selectedImages.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Tekrar Analiz Et
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-semibold"
              >
                Yeni Fotoğraf Seç
              </button>
            </div>
          </div>
        )}

        {/* API Modal */}
        {showApiModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scaleIn border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                API Ayarları
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Gelişmiş AI analizi için Google Gemini veya OpenAI API anahtarı gerekli.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Servisi
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={useGemini}
                      onChange={() => setUseGemini(true)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span>Google Gemini</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!useGemini}
                      onChange={() => setUseGemini(false)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span>OpenAI GPT-4</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Anahtarı
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={useGemini ? 'Gemini API anahtarı' : 'OpenAI API anahtarı'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {useGemini ? (
                    <>
                      Gemini API anahtarı: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Buradan alın</a>
                    </>
                  ) : (
                    <>
                      OpenAI API anahtarı: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Buradan alın</a>
                    </>
                  )}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 font-semibold"
                >
                  Kaydet
                </button>
                {hasApiKey && (
                  <button
                    onClick={() => setShowApiModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
                  >
                    İptal
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </main>
  );
}
