import { createWorker } from 'tesseract.js';
import { DetectedIngredient, Ingredient } from '@/types/models';
import { RecipeService } from './recipeService';

export class ImageAnalysisService {
  private recipeService: RecipeService;
  private worker: any = null;

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  async initialize(): Promise<void> {
    if (!this.worker) {
      this.worker = await createWorker('tur', 1, {
        logger: (m) => {
          // Log progress if needed
          if (m.status === 'recognizing text') {
            console.log(`Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      });
    }
  }

  async analyzeImage(imageFile: File): Promise<DetectedIngredient[]> {
    try {
      await this.initialize();

      // Tesseract.js ile metin tanıma
      const { data: { text } } = await this.worker.recognize(imageFile);

      // Metni işle ve malzemeleri tespit et
      const detectedIngredients = this.processText(text);

      return detectedIngredients;
    } catch (error) {
      console.error('Image analysis error:', error);
      throw error;
    }
  }

  private processText(text: string): DetectedIngredient[] {
    const ingredients: DetectedIngredient[] = [];
    const allIngredients = this.recipeService.getAllIngredients();

    // Metni normalize et ve kelimelere ayır
    const normalizedText = this.normalizeText(text);
    const words = normalizedText
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .map((word) => this.normalizeText(word));

    // Her kelime için malzeme eşleştirmesi yap
    const matchedIngredients = new Map<string, { ingredient: Ingredient; confidence: number }>();

    for (const word of words) {
      for (const ingredient of allIngredients) {
        const allNames = this.getAllPossibleNames(ingredient);

        for (const name of allNames) {
          // Tam eşleşme
          if (name === word) {
            const existing = matchedIngredients.get(ingredient.id);
            if (!existing || existing.confidence < 0.9) {
              matchedIngredients.set(ingredient.id, { ingredient, confidence: 0.9 });
            }
            break;
          }

          // Kısmi eşleşme (kelime içinde geçiyor mu)
          if (name.includes(word) || word.includes(name)) {
            const existing = matchedIngredients.get(ingredient.id);
            if (!existing || existing.confidence < 0.7) {
              matchedIngredients.set(ingredient.id, { ingredient, confidence: 0.7 });
            }
            break;
          }
        }
      }
    }

    // DetectedIngredient listesine dönüştür
    for (const [id, data] of Array.from(matchedIngredients.entries())) {
      ingredients.push({
        id: `detected-${id}`,
        name: data.ingredient.name,
        confidence: data.confidence,
        matchedIngredient: data.ingredient,
      });
    }

    // Güven skoruna göre sırala
    return ingredients.sort((a, b) => b.confidence - a.confidence);
  }

  private normalizeText(text: string): string {
    // Türkçe karakterleri İngilizce karşılıklarına çevir
    const turkishChars = 'çğıöşüÇĞIİÖŞÜ';
    const englishChars = 'cgiosuCGIIOSU';

    let normalized = text.toLowerCase();
    for (let i = 0; i < turkishChars.length; i++) {
      normalized = normalized.replace(
        new RegExp(turkishChars[i], 'g'),
        englishChars[i]
      );
    }

    return normalized.trim();
  }

  private getAllPossibleNames(ingredient: Ingredient): string[] {
    const names = [ingredient.name.toLowerCase()];
    names.push(...ingredient.synonyms.map((s) => s.toLowerCase()));
    return names;
  }

  async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

