// Models
export interface Ingredient {
  id: string;
  name: string;
  synonyms: string[]; // Eş anlamlı kelimeler
  category: IngredientCategory;
  imageName?: string;
}

export enum IngredientCategory {
  VEGETABLES = 'Sebzeler',
  FRUITS = 'Meyveler',
  MEAT = 'Et',
  DAIRY = 'Süt Ürünleri',
  GRAINS = 'Tahıllar',
  SPICES = 'Baharatlar',
  OTHER = 'Diğer',
}

export interface DetectedIngredient {
  id: string;
  name: string;
  confidence: number; // 0.0 - 1.0 arası güven skoru
  matchedIngredient?: Ingredient; // Eşleşen malzeme modeli
}

export interface NutritionInfo {
  calories: number; // Kalori (kcal)
  protein: number; // Protein (gram)
  carbs: number; // Karbonhidrat (gram)
  fat: number; // Yağ (gram)
  fiber?: number; // Lif (gram)
  sugar?: number; // Şeker (gram)
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  prepTime: number; // Hazırlık süresi (dakika)
  cookTime: number; // Pişirme süresi (dakika)
  difficulty: Difficulty;
  servings: number; // Kaç kişilik
  category: RecipeCategory;
  imageName?: string;
  tags: string[];
  nutrition?: NutritionInfo; // Beslenme bilgileri (porsiyon başına)
}

export interface RecipeIngredient {
  name: string;
  amount: string; // "2", "1/2", "200" gibi
  unit?: string; // "adet", "gram", "yemek kaşığı" gibi
}

export enum Difficulty {
  EASY = 'Kolay',
  MEDIUM = 'Orta',
  HARD = 'Zor',
}

export enum RecipeCategory {
  MAIN_DISH = 'Ana Yemek',
  DESSERT = 'Tatlı',
  SALAD = 'Salata',
  SOUP = 'Çorba',
  APPETIZER = 'Aperatif',
  DRINK = 'İçecek',
  SNACK = 'Atıştırmalık',
  OTHER = 'Diğer',
}

