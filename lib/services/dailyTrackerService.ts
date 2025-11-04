import { NutritionInfo } from '@/types/models';

export interface DailyNutrition {
  date: string; // YYYY-MM-DD formatında
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  recipes: string[]; // Yapılan tarif ID'leri
}

export class DailyTrackerService {
  private static STORAGE_KEY = 'daily_nutrition';

  /**
   * Bugünün beslenme bilgilerini getir
   */
  static getTodayNutrition(): DailyNutrition {
    const today = this.getTodayDate();
    const allData = this.getAllNutritionData();
    return allData[today] || this.createEmptyDay(today);
  }

  /**
   * Tarif yapıldı olarak işaretle ve beslenme bilgilerini ekle
   */
  static addRecipe(recipeId: string, nutrition: NutritionInfo): void {
    const today = this.getTodayDate();
    const allData = this.getAllNutritionData();
    
    let todayData = allData[today] || this.createEmptyDay(today);
    
    // Eğer bu tarif zaten bugün yapıldıysa, tekrar ekleme
    if (todayData.recipes.includes(recipeId)) {
      return;
    }

    // Beslenme bilgilerini ekle
    todayData.calories += nutrition.calories;
    todayData.protein += nutrition.protein || 0;
    todayData.carbs += nutrition.carbs || 0;
    todayData.fat += nutrition.fat || 0;
    todayData.fiber += nutrition.fiber || 0;
    todayData.sugar += nutrition.sugar || 0;
    
    // Tarif ID'sini ekle
    todayData.recipes.push(recipeId);

    // Kaydet
    allData[today] = todayData;
    this.saveAllNutritionData(allData);
  }

  /**
   * Tarifi yapıldı olarak işaretten kaldır
   */
  static removeRecipe(recipeId: string, nutrition: NutritionInfo): void {
    const today = this.getTodayDate();
    const allData = this.getAllNutritionData();
    
    const todayData = allData[today];
    if (!todayData || !todayData.recipes.includes(recipeId)) {
      return;
    }

    // Beslenme bilgilerini çıkar
    todayData.calories -= nutrition.calories;
    todayData.protein -= nutrition.protein || 0;
    todayData.carbs -= nutrition.carbs || 0;
    todayData.fat -= nutrition.fat || 0;
    todayData.fiber -= nutrition.fiber || 0;
    todayData.sugar -= nutrition.sugar || 0;

    // Negatif değerleri önle
    todayData.calories = Math.max(0, todayData.calories);
    todayData.protein = Math.max(0, todayData.protein);
    todayData.carbs = Math.max(0, todayData.carbs);
    todayData.fat = Math.max(0, todayData.fat);
    todayData.fiber = Math.max(0, todayData.fiber);
    todayData.sugar = Math.max(0, todayData.sugar);

    // Tarif ID'sini çıkar
    todayData.recipes = todayData.recipes.filter(id => id !== recipeId);

    // Kaydet
    allData[today] = todayData;
    this.saveAllNutritionData(allData);
  }

  /**
   * Tarif yapıldı mı kontrol et
   */
  static isRecipeDone(recipeId: string): boolean {
    const today = this.getTodayDate();
    const allData = this.getAllNutritionData();
    const todayData = allData[today];
    return todayData ? todayData.recipes.includes(recipeId) : false;
  }

  /**
   * Bugünkü tarih (YYYY-MM-DD)
   */
  private static getTodayDate(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  /**
   * Boş gün oluştur
   */
  private static createEmptyDay(date: string): DailyNutrition {
    return {
      date,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      recipes: [],
    };
  }

  /**
   * Tüm beslenme verilerini getir
   */
  private static getAllNutritionData(): Record<string, DailyNutrition> {
    if (typeof window === 'undefined') return {};
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  /**
   * Tüm beslenme verilerini kaydet
   */
  private static saveAllNutritionData(data: Record<string, DailyNutrition>): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Beslenme verileri kaydedilemedi:', error);
    }
  }

  /**
   * Eski verileri temizle (30 günden eski)
   */
  static cleanOldData(): void {
    const allData = this.getAllNutritionData();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const cleaned: Record<string, DailyNutrition> = {};
    
    Object.keys(allData).forEach(date => {
      const dataDate = new Date(date);
      if (dataDate >= thirtyDaysAgo) {
        cleaned[date] = allData[date];
      }
    });

    this.saveAllNutritionData(cleaned);
  }
}

