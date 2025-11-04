import { Ingredient, Recipe, DetectedIngredient, RecipeIngredient, IngredientCategory, Difficulty, RecipeCategory, NutritionInfo } from '@/types/models';

export class RecipeService {
  private ingredients: Ingredient[] = [];
  private recipes: Recipe[] = [];

  constructor() {
    this.loadIngredients();
    this.loadRecipes();
  }

  private loadIngredients(): void {
    this.ingredients = [
      { id: '1', name: 'Domates', synonyms: ['tomato', 'tomat'], category: IngredientCategory.VEGETABLES },
      { id: '2', name: 'Soğan', synonyms: ['onion'], category: IngredientCategory.VEGETABLES },
      { id: '3', name: 'Sarımsak', synonyms: ['garlic'], category: IngredientCategory.VEGETABLES },
      { id: '4', name: 'Biber', synonyms: ['pepper', 'bell pepper'], category: IngredientCategory.VEGETABLES },
      { id: '5', name: 'Patlıcan', synonyms: ['eggplant', 'aubergine'], category: IngredientCategory.VEGETABLES },
      { id: '6', name: 'Kabak', synonyms: ['zucchini', 'courgette'], category: IngredientCategory.VEGETABLES },
      { id: '7', name: 'Havuç', synonyms: ['carrot'], category: IngredientCategory.VEGETABLES },
      { id: '8', name: 'Patates', synonyms: ['potato'], category: IngredientCategory.VEGETABLES },
      { id: '9', name: 'Salatalık', synonyms: ['cucumber'], category: IngredientCategory.VEGETABLES },
      { id: '10', name: 'Marul', synonyms: ['lettuce'], category: IngredientCategory.VEGETABLES },
      { id: '11', name: 'Maydanoz', synonyms: ['parsley'], category: IngredientCategory.VEGETABLES },
      { id: '12', name: 'Dereotu', synonyms: ['dill'], category: IngredientCategory.VEGETABLES },
      { id: '13', name: 'Limon', synonyms: ['lemon'], category: IngredientCategory.FRUITS },
      { id: '14', name: 'Yumurta', synonyms: ['egg'], category: IngredientCategory.DAIRY },
      { id: '15', name: 'Süt', synonyms: ['milk'], category: IngredientCategory.DAIRY },
      { id: '16', name: 'Peynir', synonyms: ['cheese'], category: IngredientCategory.DAIRY },
      { id: '17', name: 'Yoğurt', synonyms: ['yogurt', 'yoghurt'], category: IngredientCategory.DAIRY },
      { id: '18', name: 'Et', synonyms: ['meat', 'beef'], category: IngredientCategory.MEAT },
      { id: '19', name: 'Tavuk', synonyms: ['chicken'], category: IngredientCategory.MEAT },
      { id: '20', name: 'Balık', synonyms: ['fish'], category: IngredientCategory.MEAT },
      { id: '21', name: 'Pilav', synonyms: ['rice'], category: IngredientCategory.GRAINS },
      { id: '22', name: 'Makarna', synonyms: ['pasta'], category: IngredientCategory.GRAINS },
      { id: '23', name: 'Ekmek', synonyms: ['bread'], category: IngredientCategory.GRAINS },
      { id: '24', name: 'Un', synonyms: ['flour'], category: IngredientCategory.GRAINS },
      { id: '25', name: 'Şeker', synonyms: ['sugar'], category: IngredientCategory.SPICES },
      { id: '26', name: 'Tuz', synonyms: ['salt'], category: IngredientCategory.SPICES },
      { id: '27', name: 'Karabiber', synonyms: ['black pepper', 'pepper'], category: IngredientCategory.SPICES },
      { id: '28', name: 'Zeytinyağı', synonyms: ['olive oil'], category: IngredientCategory.OTHER },
      { id: '29', name: 'Ayçiçek Yağı', synonyms: ['sunflower oil'], category: IngredientCategory.OTHER },
      { id: '30', name: 'Domates Salçası', synonyms: ['tomato paste'], category: IngredientCategory.OTHER },
      { id: '31', name: 'Biber Salçası', synonyms: ['pepper paste'], category: IngredientCategory.OTHER },
    ];
  }

  private loadRecipes(): void {
    this.recipes = [
      {
        id: '1',
        title: 'Menemen',
        description: 'Klasik Türk menemeni, domates, biber ve yumurta ile hazırlanan lezzetli bir kahvaltı yemeği.',
        ingredients: [
          { name: 'Domates', amount: '3', unit: 'adet' },
          { name: 'Biber', amount: '2', unit: 'adet' },
          { name: 'Soğan', amount: '1', unit: 'adet' },
          { name: 'Yumurta', amount: '4', unit: 'adet' },
          { name: 'Zeytinyağı', amount: '2', unit: 'yemek kaşığı' },
          { name: 'Tuz', amount: '1', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Soğanı küp küp doğrayın.',
          'Biberleri ince şeritler halinde kesin.',
          'Domatesleri küp küp doğrayın.',
          'Tavaya zeytinyağını alın, soğanı ekleyip kavurun.',
          'Biberleri ekleyip birkaç dakika daha kavurun.',
          'Domatesleri ekleyip suyunu çekene kadar pişirin.',
          'Tuz ve karabiber ekleyin.',
          'Yumurtaları kırıp karıştırın, pişirin.',
          'Sıcak servis yapın.',
        ],
        prepTime: 10,
        cookTime: 15,
        difficulty: Difficulty.EASY,
        servings: 2,
        category: RecipeCategory.MAIN_DISH,
        tags: ['kahvaltı', 'kolay', 'hızlı'],
        nutrition: {
          calories: 320,
          protein: 18,
          carbs: 12,
          fat: 22,
          fiber: 3,
          sugar: 8,
        },
      },
      {
        id: '2',
        title: 'Domates Çorbası',
        description: 'Sıcacık ve lezzetli domates çorbası, kış günleri için ideal.',
        ingredients: [
          { name: 'Domates', amount: '5', unit: 'adet' },
          { name: 'Soğan', amount: '1', unit: 'adet' },
          { name: 'Sarımsak', amount: '2', unit: 'diş' },
          { name: 'Un', amount: '2', unit: 'yemek kaşığı' },
          { name: 'Et Suyu', amount: '2', unit: 'su bardağı' },
          { name: 'Zeytinyağı', amount: '2', unit: 'yemek kaşığı' },
          { name: 'Tuz', amount: '1', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Domatesleri haşlayıp kabuklarını soyun.',
          'Soğan ve sarımsağı küp küp doğrayın.',
          'Tavada zeytinyağı ile soğan ve sarımsağı kavurun.',
          'Unu ekleyip kavurun.',
          'Domatesleri ekleyip ezerek pişirin.',
          'Et suyunu ekleyip kaynatın.',
          'Blender\'dan geçirin.',
          'Tuz ve karabiber ekleyip tekrar kaynatın.',
          'Sıcak servis yapın.',
        ],
        prepTime: 15,
        cookTime: 25,
        difficulty: Difficulty.EASY,
        servings: 4,
        category: RecipeCategory.SOUP,
        tags: ['çorba', 'kış', 'sıcak'],
        nutrition: {
          calories: 180,
          protein: 4,
          carbs: 25,
          fat: 8,
          fiber: 3,
          sugar: 12,
        },
      },
      {
        id: '3',
        title: 'Karışık Salata',
        description: 'Taze ve sağlıklı karışık salata, her öğüne uygun.',
        ingredients: [
          { name: 'Marul', amount: '1', unit: 'baş' },
          { name: 'Salatalık', amount: '2', unit: 'adet' },
          { name: 'Domates', amount: '2', unit: 'adet' },
          { name: 'Soğan', amount: 'yarım', unit: 'adet' },
          { name: 'Maydanoz', amount: 'yarım', unit: 'demet' },
          { name: 'Zeytinyağı', amount: '3', unit: 'yemek kaşığı' },
          { name: 'Limon', amount: '1', unit: 'adet' },
          { name: 'Tuz', amount: '1', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Marulu yıkayıp doğrayın.',
          'Salatalığı dilimleyin.',
          'Domatesi küp küp doğrayın.',
          'Soğanı ince halkalar halinde kesin.',
          'Maydanozu ince doğrayın.',
          'Tüm malzemeleri karıştırın.',
          'Zeytinyağı, limon suyu ve tuz ile sos hazırlayın.',
          'Salatanın üzerine sosu dökün ve karıştırın.',
          'Servis yapın.',
        ],
        prepTime: 10,
        cookTime: 0,
        difficulty: Difficulty.EASY,
        servings: 4,
        category: RecipeCategory.SALAD,
        tags: ['salata', 'sağlıklı', 'hızlı'],
        nutrition: {
          calories: 85,
          protein: 2,
          carbs: 8,
          fat: 5,
          fiber: 4,
          sugar: 6,
        },
      },
      {
        id: '4',
        title: 'Yumurta Salatası',
        description: 'Basit ve lezzetli yumurta salatası, kahvaltı veya atıştırmalık olarak ideal.',
        ingredients: [
          { name: 'Yumurta', amount: '4', unit: 'adet' },
          { name: 'Maydanoz', amount: 'yarım', unit: 'demet' },
          { name: 'Zeytinyağı', amount: '2', unit: 'yemek kaşığı' },
          { name: 'Limon', amount: 'yarım', unit: 'adet' },
          { name: 'Tuz', amount: 'yarım', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Yumurtaları haşlayın ve soğutun.',
          'Yumurtaları küp küp doğrayın.',
          'Maydanozu ince doğrayın.',
          'Yumurta ve maydanozu karıştırın.',
          'Zeytinyağı, limon suyu, tuz ve karabiber ekleyin.',
          'Karıştırıp servis yapın.',
        ],
        prepTime: 5,
        cookTime: 10,
        difficulty: Difficulty.EASY,
        servings: 2,
        category: RecipeCategory.SALAD,
        tags: ['yumurta', 'kahvaltı', 'kolay'],
        nutrition: {
          calories: 280,
          protein: 16,
          carbs: 2,
          fat: 23,
          fiber: 0,
          sugar: 1,
        },
      },
      {
        id: '5',
        title: 'Domates Soslu Makarna',
        description: 'Klasik ve lezzetli domates soslu makarna, herkesin sevdiği bir tarif.',
        ingredients: [
          { name: 'Makarna', amount: '400', unit: 'gram' },
          { name: 'Domates', amount: '4', unit: 'adet' },
          { name: 'Sarımsak', amount: '3', unit: 'diş' },
          { name: 'Soğan', amount: '1', unit: 'adet' },
          { name: 'Zeytinyağı', amount: '3', unit: 'yemek kaşığı' },
          { name: 'Tuz', amount: '1', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
          { name: 'Maydanoz', amount: 'yarım', unit: 'demet' },
        ],
        instructions: [
          'Makarnayı tuzlu suda haşlayın.',
          'Soğan ve sarımsağı küp küp doğrayın.',
          'Domatesleri küp küp doğrayın.',
          'Tavada zeytinyağı ile soğan ve sarımsağı kavurun.',
          'Domatesleri ekleyip suyunu çekene kadar pişirin.',
          'Tuz ve karabiber ekleyin.',
          'Haşlanmış makarnayı sos ile karıştırın.',
          'Maydanoz ile süsleyip servis yapın.',
        ],
        prepTime: 10,
        cookTime: 20,
        difficulty: Difficulty.EASY,
        servings: 4,
        category: RecipeCategory.MAIN_DISH,
        tags: ['makarna', 'kolay', 'hızlı'],
        nutrition: {
          calories: 420,
          protein: 12,
          carbs: 65,
          fat: 12,
          fiber: 4,
          sugar: 8,
        },
      },
      {
        id: '6',
        title: 'Sebzeli Pilav',
        description: 'Renkli ve lezzetli sebzeli pilav, ana yemek olarak ideal.',
        ingredients: [
          { name: 'Pilav', amount: '2', unit: 'su bardağı' },
          { name: 'Soğan', amount: '1', unit: 'adet' },
          { name: 'Havuç', amount: '2', unit: 'adet' },
          { name: 'Biber', amount: '2', unit: 'adet' },
          { name: 'Domates', amount: '2', unit: 'adet' },
          { name: 'Zeytinyağı', amount: '3', unit: 'yemek kaşığı' },
          { name: 'Tuz', amount: '1', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Pilavı yıkayın ve suda bekletin.',
          'Soğanı küp küp doğrayın.',
          'Havucu küp küp doğrayın.',
          'Biberleri küp küp doğrayın.',
          'Domatesi küp küp doğrayın.',
          'Tavada zeytinyağı ile soğanı kavurun.',
          'Sebzeleri ekleyip kavurun.',
          'Pilavı ekleyip suyunu çekene kadar pişirin.',
          'Tuz ve karabiber ekleyin.',
          'Servis yapın.',
        ],
        prepTime: 15,
        cookTime: 25,
        difficulty: Difficulty.EASY,
        servings: 4,
        category: RecipeCategory.MAIN_DISH,
        tags: ['pilav', 'sebze', 'kolay'],
        nutrition: {
          calories: 380,
          protein: 8,
          carbs: 72,
          fat: 8,
          fiber: 4,
          sugar: 6,
        },
      },
      {
        id: '7',
        title: 'Domatesli Yumurta',
        description: 'Basit ve lezzetli domatesli yumurta, kahvaltı için ideal.',
        ingredients: [
          { name: 'Yumurta', amount: '4', unit: 'adet' },
          { name: 'Domates', amount: '2', unit: 'adet' },
          { name: 'Soğan', amount: 'yarım', unit: 'adet' },
          { name: 'Zeytinyağı', amount: '2', unit: 'yemek kaşığı' },
          { name: 'Tuz', amount: 'yarım', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Domatesleri küp küp doğrayın.',
          'Soğanı küp küp doğrayın.',
          'Tavada zeytinyağı ile soğanı kavurun.',
          'Domatesleri ekleyip suyunu çekene kadar pişirin.',
          'Yumurtaları kırıp karıştırın.',
          'Tuz ve karabiber ekleyin.',
          'Pişirin ve servis yapın.',
        ],
        prepTime: 5,
        cookTime: 10,
        difficulty: Difficulty.EASY,
        servings: 2,
        category: RecipeCategory.MAIN_DISH,
        tags: ['yumurta', 'kahvaltı', 'hızlı'],
        nutrition: {
          calories: 290,
          protein: 16,
          carbs: 10,
          fat: 20,
          fiber: 2,
          sugar: 7,
        },
      },
      {
        id: '8',
        title: 'Sıcak Salata',
        description: 'Sıcak ve lezzetli salata, kış ayları için ideal.',
        ingredients: [
          { name: 'Patates', amount: '3', unit: 'adet' },
          { name: 'Havuç', amount: '2', unit: 'adet' },
          { name: 'Soğan', amount: '1', unit: 'adet' },
          { name: 'Zeytinyağı', amount: '3', unit: 'yemek kaşığı' },
          { name: 'Limon', amount: '1', unit: 'adet' },
          { name: 'Tuz', amount: '1', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Patatesleri haşlayın ve küp küp doğrayın.',
          'Havucu haşlayın ve küp küp doğrayın.',
          'Soğanı ince halkalar halinde kesin.',
          'Tüm malzemeleri karıştırın.',
          'Zeytinyağı, limon suyu, tuz ve karabiber ile sos hazırlayın.',
          'Salatanın üzerine sosu dökün ve karıştırın.',
          'Sıcak servis yapın.',
        ],
        prepTime: 15,
        cookTime: 20,
        difficulty: Difficulty.EASY,
        servings: 4,
        category: RecipeCategory.SALAD,
        tags: ['salata', 'sıcak', 'kış'],
        nutrition: {
          calories: 220,
          protein: 4,
          carbs: 35,
          fat: 8,
          fiber: 5,
          sugar: 8,
        },
      },
      {
        id: '9',
        title: 'Sebzeli Omlet',
        description: 'Renkli ve besleyici sebzeli omlet, kahvaltı için mükemmel.',
        ingredients: [
          { name: 'Yumurta', amount: '3', unit: 'adet' },
          { name: 'Biber', amount: '1', unit: 'adet' },
          { name: 'Domates', amount: '1', unit: 'adet' },
          { name: 'Soğan', amount: 'yarım', unit: 'adet' },
          { name: 'Zeytinyağı', amount: '1', unit: 'yemek kaşığı' },
          { name: 'Tuz', amount: 'yarım', unit: 'çay kaşığı' },
          { name: 'Karabiber', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Biberi küp küp doğrayın.',
          'Domatesi küp küp doğrayın.',
          'Soğanı küp küp doğrayın.',
          'Yumurtaları kırıp çırpın.',
          'Sebzeleri yumurtaya ekleyin.',
          'Tuz ve karabiber ekleyin.',
          'Tavada zeytinyağı ile pişirin.',
          'Servis yapın.',
        ],
        prepTime: 5,
        cookTime: 8,
        difficulty: Difficulty.EASY,
        servings: 1,
        category: RecipeCategory.MAIN_DISH,
        tags: ['yumurta', 'kahvaltı', 'kolay'],
        nutrition: {
          calories: 250,
          protein: 14,
          carbs: 8,
          fat: 18,
          fiber: 2,
          sugar: 5,
        },
      },
      {
        id: '10',
        title: 'Taze Salata',
        description: 'Taze ve sağlıklı salata, her öğüne uygun.',
        ingredients: [
          { name: 'Marul', amount: 'yarım', unit: 'baş' },
          { name: 'Domates', amount: '2', unit: 'adet' },
          { name: 'Salatalık', amount: '1', unit: 'adet' },
          { name: 'Limon', amount: 'yarım', unit: 'adet' },
          { name: 'Zeytinyağı', amount: '2', unit: 'yemek kaşığı' },
          { name: 'Tuz', amount: 'yarım', unit: 'çay kaşığı' },
        ],
        instructions: [
          'Marulu yıkayıp doğrayın.',
          'Domatesi dilimleyin.',
          'Salatalığı dilimleyin.',
          'Tüm malzemeleri karıştırın.',
          'Zeytinyağı, limon suyu ve tuz ile sos hazırlayın.',
          'Salatanın üzerine sosu dökün.',
          'Servis yapın.',
        ],
        prepTime: 5,
        cookTime: 0,
        difficulty: Difficulty.EASY,
        servings: 2,
        category: RecipeCategory.SALAD,
        tags: ['salata', 'taze', 'hızlı'],
        nutrition: {
          calories: 70,
          protein: 1,
          carbs: 6,
          fat: 5,
          fiber: 2,
          sugar: 4,
        },
      },
    ];
  }

  getAllIngredients(): Ingredient[] {
    return this.ingredients;
  }

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  findRecipes(detectedIngredients: DetectedIngredient[]): Recipe[] {
    if (detectedIngredients.length === 0) {
      return [];
    }

    // Her tarif için eşleşme skorunu hesapla
    const recipesWithScores = this.recipes.map((recipe) => ({
      recipe,
      score: this.calculateMatchScore(recipe, detectedIngredients),
    }));

    // Eşleşme skoru %30'dan fazla olan tarifleri filtrele ve sırala
    const matchedRecipes = recipesWithScores
      .filter((item) => item.score >= 30.0)
      .sort((a, b) => {
        // Önce eşleşme skoruna göre, sonra basitlik skoruna göre sırala
        if (a.score !== b.score) {
          return b.score - a.score;
        }
        return this.calculateSimplicityScore(b.recipe) - this.calculateSimplicityScore(a.recipe);
      })
      .map((item) => item.recipe);

    return matchedRecipes;
  }

  private calculateMatchScore(recipe: Recipe, detectedIngredients: DetectedIngredient[]): number {
    const recipeIngredientNames = recipe.ingredients.map((ing) => ing.name.toLowerCase());
    let matchCount = 0;

    for (const detectedIngredient of detectedIngredients) {
      const detectedNames = detectedIngredient.matchedIngredient
        ? this.getAllPossibleNames(detectedIngredient.matchedIngredient)
        : [detectedIngredient.name.toLowerCase()];

      for (const recipeName of recipeIngredientNames) {
        if (detectedNames.some((name) => name.includes(recipeName) || recipeName.includes(name))) {
          matchCount++;
          break;
        }
      }
    }

    if (recipeIngredientNames.length === 0) {
      return 0.0;
    }

    const matchPercentage = matchCount / recipeIngredientNames.length;
    return matchPercentage * 100.0;
  }

  private calculateSimplicityScore(recipe: Recipe): number {
    const totalTime = recipe.prepTime + recipe.cookTime;
    const timeScore = 100.0 - totalTime;

    let difficultyScore = 0;
    switch (recipe.difficulty) {
      case Difficulty.EASY:
        difficultyScore = 100.0;
        break;
      case Difficulty.MEDIUM:
        difficultyScore = 50.0;
        break;
      case Difficulty.HARD:
        difficultyScore = 0.0;
        break;
    }

    return timeScore * 0.6 + difficultyScore * 0.4;
  }

  private getAllPossibleNames(ingredient: Ingredient): string[] {
    const names = [ingredient.name.toLowerCase()];
    names.push(...ingredient.synonyms.map((s) => s.toLowerCase()));
    return names;
  }

  getRecipeById(id: string): Recipe | undefined {
    return this.recipes.find((r) => r.id === id);
  }
}

