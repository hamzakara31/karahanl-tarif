// Gemini API mevcut modelleri kontrol etmek için yardımcı fonksiyon

export async function checkAvailableGeminiModels(apiKey: string): Promise<string[]> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API anahtarı geçersiz');
    }

    const data = await response.json();
    const models = data.models
      ?.filter((model: any) => 
        model.supportedGenerationMethods?.includes('generateContent')
      )
      ?.map((model: any) => model.name.replace('models/', '')) || [];

    return models;
  } catch (error: any) {
    console.error('Model listesi alınamadı:', error);
    throw error;
  }
}

// Görüntü desteği olan modelleri filtrele
export function filterVisionModels(models: string[]): string[] {
  // Gemini modellerinde görüntü desteği olanlar genellikle "vision" veya "flash" içerir
  return models.filter(model => 
    model.includes('vision') || 
    model.includes('flash') || 
    model.includes('pro') && !model.includes('text')
  );
}

