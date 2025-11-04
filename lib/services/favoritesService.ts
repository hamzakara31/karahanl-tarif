import { Recipe } from '@/types/models';

export class FavoritesService {
  private static STORAGE_KEY = 'favorite_recipes';

  /**
   * Favori tarifleri getir
   */
  static getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const favorites = localStorage.getItem(this.STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch {
      return [];
    }
  }

  /**
   * Favorilere ekle/çıkar
   */
  static toggleFavorite(recipeId: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(recipeId);

    if (index > -1) {
      // Çıkar
      favorites.splice(index, 1);
    } else {
      // Ekle
      favorites.push(recipeId);
    }

    this.saveFavorites(favorites);
    return index === -1; // true = eklendi, false = çıkarıldı
  }

  /**
   * Favori mi kontrol et
   */
  static isFavorite(recipeId: string): boolean {
    return this.getFavorites().includes(recipeId);
  }

  /**
   * Favorileri kaydet
   */
  private static saveFavorites(favorites: string[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Favoriler kaydedilemedi:', error);
    }
  }

  /**
   * Tüm favorileri temizle
   */
  static clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

