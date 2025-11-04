import { DetectedIngredient, Recipe } from '@/types/models';

export interface AIRecipeResponse {
  ingredients: string[];
  recipes: Array<{
    title: string;
    description: string;
    ingredients: Array<{ name: string; amount: string; unit?: string }>;
    instructions: string[];
    prepTime: number;
    cookTime: number;
    difficulty: 'Kolay' | 'Orta' | 'Zor';
    servings: number;
    category: string;
    tags: string[];
  }>;
}

export class AIRecipeService {
  private apiKey: string | null = null;
  private useGemini: boolean = true; // Gemini varsayılan, OpenAI için false yapın

  constructor() {
    // Environment variable'dan API anahtarını al
    if (typeof window !== 'undefined') {
      // Client-side'da localStorage'dan al
      this.apiKey = localStorage.getItem('api_key') || null;
    }
  }

  setApiKey(key: string, useGemini: boolean = true) {
    this.apiKey = key;
    this.useGemini = useGemini;
    if (typeof window !== 'undefined') {
      localStorage.setItem('api_key', key);
      localStorage.setItem('use_gemini', useGemini.toString());
    }
  }

  /**
   * GPT-4 Vision veya Gemini ile görüntüden malzeme ve tarif önerisi al
   */
  async analyzeImagesAndGetRecipes(imageFiles: File[]): Promise<{
    ingredients: DetectedIngredient[];
    recipes: Recipe[];
  }> {
    if (!this.apiKey) {
      throw new Error('API anahtarı bulunamadı. Lütfen API anahtarınızı girin.');
    }

    if (this.useGemini) {
      return this.analyzeWithGemini(imageFiles);
    } else {
      return this.analyzeWithOpenAI(imageFiles);
    }
  }

  /**
   * Google Gemini ile analiz
   */
  private async analyzeWithGemini(imageFiles: File[]): Promise<{
    ingredients: DetectedIngredient[];
    recipes: Recipe[];
  }> {
    try {
      // Base64'e çevir
      const imagePromises = imageFiles.map((file) => this.fileToBase64(file));
      const base64Images = await Promise.all(imagePromises);

      // Önce mevcut modelleri kontrol et
      let visionModels: string[] = [];
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          const allModels = data.models
            ?.filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
            ?.map((m: any) => m.name.replace('models/', '')) || [];
          
          // Görüntü desteği olan modelleri filtrele
          visionModels = allModels.filter((m: string) => 
            m.includes('vision') || m.includes('flash') || m === 'gemini-pro'
          );
        }
      } catch (err) {
        console.warn('Model listesi alınamadı, varsayılan modeller kullanılacak');
      }

      // Eğer model listesi boşsa, varsayılan modelleri kullan
      if (visionModels.length === 0) {
        // En yaygın çalışan modeller (sırayla denenecek)
        // gemini-pro en temel ve her zaman mevcut olan model
        visionModels = ['gemini-pro'];
      }
      
      console.log('Kullanılacak modeller:', visionModels);

      let lastError: Error | null = null;

      // Modelleri sırayla dene
      for (const modelName of visionModels) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `Bu fotoğraflardaki yemek malzemelerini tespit et ve bu malzemelerle yapılabilecek basit ve kolay tarifler öner. Türkçe cevap ver.
                    
Lütfen şu formatta JSON döndür (sadece JSON, başka metin yok):
{
  "ingredients": ["domates", "soğan", "yumurta"],
  "recipes": [
    {
      "title": "Tarif Adı",
      "description": "Kısa açıklama",
      "ingredients": [
        {"name": "Malzeme Adı", "amount": "2", "unit": "adet"}
      ],
      "instructions": ["Adım 1", "Adım 2"],
      "prepTime": 10,
      "cookTime": 15,
      "difficulty": "Kolay",
      "servings": 2,
      "category": "Ana Yemek",
      "tags": ["kolay", "hızlı"]
    }
  ]
}`,
                      },
                      ...base64Images.map((base64, index) => ({
                        inline_data: {
                          mime_type: imageFiles[index].type,
                          data: base64.split(',')[1], // data:image/... kısmını kaldır
                        },
                      })),
                    ],
                  },
                ],
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `Model ${modelName} hatası`);
          }

          const data = await response.json();
          let text = data.candidates[0]?.content?.parts[0]?.text || '';

          // Başarılı, devam et
          if (text) {
            // Markdown code block varsa kaldır
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // JSON'u parse et
            let jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
              // Eğer JSON bulunamazsa, tüm metni JSON olarak dene
              try {
                jsonMatch = [text];
              } catch {
                throw new Error('JSON formatı bulunamadı. API yanıtı: ' + text.substring(0, 200));
              }
            }

            let aiResponse: AIRecipeResponse;
            try {
              aiResponse = JSON.parse(jsonMatch[0]);
            } catch (parseError) {
              console.error('JSON parse error:', parseError);
              console.error('Text:', text);
              throw new Error('JSON parse hatası. API yanıtı geçersiz format.');
            }

            // DetectedIngredient ve Recipe formatına çevir
            const detectedIngredients: DetectedIngredient[] = aiResponse.ingredients.map(
              (name, index) => ({
                id: `detected-${index}`,
                name,
                confidence: 0.9,
              })
            );

            const recipes: Recipe[] = aiResponse.recipes.map((r, index) => ({
              id: `recipe-ai-${index}`,
              title: r.title,
              description: r.description,
              ingredients: r.ingredients.map((ing) => ({
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit,
              })),
              instructions: r.instructions,
              prepTime: r.prepTime,
              cookTime: r.cookTime,
              difficulty: r.difficulty as 'Kolay' | 'Orta' | 'Zor',
              servings: r.servings,
              category: r.category as any,
              tags: r.tags,
              // Tahmini beslenme bilgisi (basit hesaplama)
              nutrition: this.estimateNutrition(r.ingredients, r.servings),
            }));

            return { ingredients: detectedIngredients, recipes };
          }
        } catch (error: any) {
          // Bu model çalışmadı, bir sonrakini dene
          lastError = error;
          console.warn(`Model ${modelName} çalışmadı:`, error.message);
          continue;
        }
      }

      // Hiçbir model çalışmadıysa hata fırlat
      throw lastError || new Error('Tüm modeller denenmiş ama hiçbiri çalışmadı. Lütfen API anahtarınızı kontrol edin.');
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  /**
   * OpenAI GPT-4 Vision ile analiz
   */
  private async analyzeWithOpenAI(imageFiles: File[]): Promise<{
    ingredients: DetectedIngredient[];
    recipes: Recipe[];
  }> {
    try {
      // Base64'e çevir
      const imagePromises = imageFiles.map((file) => this.fileToBase64(file));
      const base64Images = await Promise.all(imagePromises);

      // OpenAI API'ye istek gönder
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Bu fotoğraflardaki yemek malzemelerini tespit et ve bu malzemelerle yapılabilecek basit ve kolay tarifler öner. 
                    
Lütfen şu formatta JSON döndür:
{
  "ingredients": ["domates", "soğan", "yumurta"],
  "recipes": [
    {
      "title": "Tarif Adı",
      "description": "Kısa açıklama",
      "ingredients": [
        {"name": "Malzeme Adı", "amount": "2", "unit": "adet"}
      ],
      "instructions": ["Adım 1", "Adım 2"],
      "prepTime": 10,
      "cookTime": 15,
      "difficulty": "Kolay",
      "servings": 2,
      "category": "Ana Yemek",
      "tags": ["kolay", "hızlı"]
    }
  ]
}`,
                },
                ...base64Images.map((base64) => ({
                  type: 'image_url',
                  image_url: {
                    url: base64,
                  },
                })),
              ],
            },
          ],
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API hatası');
      }

      const data = await response.json();
      let text = data.choices[0]?.message?.content || '';

      // Markdown code block varsa kaldır
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      // JSON'u parse et
      let jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        try {
          jsonMatch = [text];
        } catch {
          throw new Error('JSON formatı bulunamadı. API yanıtı: ' + text.substring(0, 200));
        }
      }

      let aiResponse: AIRecipeResponse;
      try {
        aiResponse = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Text:', text);
        throw new Error('JSON parse hatası. API yanıtı geçersiz format.');
      }

      // DetectedIngredient ve Recipe formatına çevir
      const detectedIngredients: DetectedIngredient[] = aiResponse.ingredients.map(
        (name, index) => ({
          id: `detected-${index}`,
          name,
          confidence: 0.9,
        })
      );

      const recipes: Recipe[] = aiResponse.recipes.map((r, index) => ({
        id: `recipe-ai-${index}`,
        title: r.title,
        description: r.description,
        ingredients: r.ingredients.map((ing) => ({
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
        })),
        instructions: r.instructions,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        difficulty: r.difficulty as 'Kolay' | 'Orta' | 'Zor',
        servings: r.servings,
        category: r.category as any,
        tags: r.tags,
        // Tahmini beslenme bilgisi (basit hesaplama)
        nutrition: this.estimateNutrition(r.ingredients, r.servings),
      }));

      return { ingredients: detectedIngredients, recipes };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  /**
   * File'ı base64'e çevir
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Malzemelere göre tahmini beslenme bilgisi hesapla
   */
  private estimateNutrition(
    ingredients: Array<{ name: string; amount: string; unit?: string }>,
    servings: number
  ): {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
  } {
    // Basit tahmin - malzeme sayısı ve tipine göre
    const ingredientCount = ingredients.length;
    const baseCalories = ingredientCount * 80; // Her malzeme için ortalama 80 kcal
    const baseProtein = ingredientCount * 4; // Her malzeme için ortalama 4g protein
    const baseCarbs = ingredientCount * 12; // Her malzeme için ortalama 12g karbonhidrat
    const baseFat = ingredientCount * 3; // Her malzeme için ortalama 3g yağ

    // Porsiyon başına hesapla
    const caloriesPerServing = Math.round(baseCalories / Math.max(servings, 1));
    const proteinPerServing = Math.round(baseProtein / Math.max(servings, 1));
    const carbsPerServing = Math.round(baseCarbs / Math.max(servings, 1));
    const fatPerServing = Math.round(baseFat / Math.max(servings, 1));

    return {
      calories: caloriesPerServing,
      protein: proteinPerServing,
      carbs: carbsPerServing,
      fat: fatPerServing,
      fiber: Math.round(ingredientCount * 2 / Math.max(servings, 1)),
      sugar: Math.round(ingredientCount * 3 / Math.max(servings, 1)),
    };
  }
}

