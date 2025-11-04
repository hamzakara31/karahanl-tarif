import { Recipe } from '@/types/models';

export class AIRecipeStorage {
  private static STORAGE_KEY = 'ai_recipes';

  /**
   * AI tariflerini kaydet
   */
  static saveRecipes(recipes: Recipe[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      const existingRecipes = this.getAllRecipes();
      recipes.forEach((recipe) => {
        existingRecipes[recipe.id] = recipe;
      });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingRecipes));
    } catch (error) {
      console.error('AI tarifleri kaydedilemedi:', error);
    }
  }

  /**
   * Tüm AI tariflerini getir
   */
  static getAllRecipes(): Record<string, Recipe> {
    if (typeof window === 'undefined') return {};
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  /**
   * ID'ye göre AI tarifi getir
   */
  static getRecipeById(id: string): Recipe | null {
    const recipes = this.getAllRecipes();
    return recipes[id] || null;
  }

  /**
   * Tüm AI tariflerini temizle
   */
  static clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Eski tarifleri temizle (7 günden eski)
   */
  static cleanOldRecipes(): void {
    // Şimdilik tüm tarifleri tut, gelecekte timestamp eklenebilir
    // Bu metod gelecekte kullanılabilir
  }
}

