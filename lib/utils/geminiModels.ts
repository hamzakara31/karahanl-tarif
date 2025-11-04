// Gemini API mevcut modelleri kontrol etmek için yardımcı fonksiyon

export async function getAvailableGeminiModels(apiKey: string): Promise<string[]> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('API anahtarı geçersiz veya modeller listelenemedi');
    }

    const data = await response.json();
    const models = data.models
      ?.filter((model: any) => 
        model.supportedGenerationMethods?.includes('generateContent')
      )
      ?.map((model: any) => model.name.replace('models/', '')) || [];

    return models;
  } catch (error) {
    console.error('Model listesi alınamadı:', error);
    return [];
  }
}

// Görüntü analizi için önerilen modeller (sırayla denenecek)
export const VISION_MODELS = [
  'gemini-pro-vision',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.5-flash-latest',
];

