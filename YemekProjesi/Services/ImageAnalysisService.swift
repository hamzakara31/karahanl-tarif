//
//  ImageAnalysisService.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation
import UIKit
import Vision
import Combine

/// Görüntü analizi servisi
class ImageAnalysisService: ObservableObject {
    @Published var detectedIngredients: [DetectedIngredient] = []
    @Published var isAnalyzing = false
    @Published var errorMessage: String?
    
    private let recipeService: RecipeService
    
    init(recipeService: RecipeService) {
        self.recipeService = recipeService
    }
    
    /// Görüntüyü analiz eder ve malzemeleri tespit eder
    func analyzeImage(_ image: UIImage) {
        isAnalyzing = true
        errorMessage = nil
        detectedIngredients = []
        
        // Vision Framework ile metin tanıma
        detectText(in: image) { [weak self] textResults in
            guard let self = self else { return }
            
            // Metin sonuçlarını malzeme olarak işle
            let ingredients = self.processTextResults(textResults)
            
            // Vision ile görüntü kategorilendirme (opsiyonel)
            self.classifyImage(image) { [weak self] classifications in
                guard let self = self else { return }
                
                // Kategorileri de malzeme olarak ekle
                let allIngredients = ingredients + classifications
                
                DispatchQueue.main.async {
                    self.detectedIngredients = allIngredients
                    self.isAnalyzing = false
                }
            }
        }
    }
    
    /// Vision Framework ile metin tanıma
    private func detectText(in image: UIImage, completion: @escaping ([String]) -> Void) {
        guard let cgImage = image.cgImage else {
            completion([])
            return
        }
        
        let request = VNRecognizeTextRequest { request, error in
            guard let observations = request.results as? [VNRecognizedTextObservation],
                  error == nil else {
                completion([])
                return
            }
            
            var detectedTexts: [String] = []
            for observation in observations {
                guard let topCandidate = observation.topCandidates(1).first else { continue }
                detectedTexts.append(topCandidate.string)
            }
            
            completion(detectedTexts)
        }
        
        // Türkçe ve İngilizce dil desteği
        request.recognitionLanguages = ["tr-TR", "en-US"]
        request.recognitionLevel = .accurate
        
        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        do {
            try handler.perform([request])
        } catch {
            print("Text recognition error: \(error)")
            completion([])
        }
    }
    
    /// Görüntü sınıflandırma (malzeme tespiti için)
    private func classifyImage(_ image: UIImage, completion: @escaping ([DetectedIngredient]) -> Void) {
        guard let cgImage = image.cgImage else {
            completion([])
            return
        }
        
        // Yemek ve malzeme kategorileri için özel model kullanılabilir
        // Şimdilik basit bir yaklaşım kullanıyoruz
        
        // Malzeme isimlerini içeren bir sözlük (basit yaklaşım)
        let commonIngredients = [
            "domates", "soğan", "sarımsak", "biber", "patlıcan", "kabak", "havuç",
            "patates", "salatalık", "marul", "maydanoz", "dereotu", "limon",
            "yumurta", "süt", "peynir", "yoğurt", "et", "tavuk", "balık",
            "pilav", "makarna", "ekmek", "un", "şeker", "tuz", "karabiber",
            "zeytinyağı", "ayçiçek yağı", "domates salçası", "biber salçası"
        ]
        
        // Görüntü analizi için daha gelişmiş bir model gerekli
        // Şimdilik boş dizi döndürüyoruz
        completion([])
    }
    
    /// Metin sonuçlarını işleyip malzeme listesine çevirir
    private func processTextResults(_ texts: [String]) -> [DetectedIngredient] {
        var ingredients: [DetectedIngredient] = []
        
        // Tüm malzemeleri al
        let allIngredients = recipeService.getAllIngredients()
        
        for text in texts {
            let normalizedText = text.normalizedForComparison()
            
            // Her kelimeyi kontrol et
            let words = normalizedText.components(separatedBy: .whitespacesAndNewlines)
                .filter { !$0.isEmpty && $0.count > 2 }
            
            for word in words {
                // Malzeme listesinde eşleşme ara
                if let matchedIngredient = allIngredients.first(where: { ingredient in
                    ingredient.allPossibleNames().contains { name in
                        name.contains(word) || word.contains(name)
                    }
                }) {
                    // Eşleşme bulundu, güven skoru hesapla
                    let confidence = calculateConfidence(word: word, ingredient: matchedIngredient)
                    
                    // Zaten eklenmemişse ekle
                    if !ingredients.contains(where: { $0.matchedIngredient?.id == matchedIngredient.id }) {
                        ingredients.append(DetectedIngredient(
                            name: matchedIngredient.name,
                            confidence: confidence,
                            matchedIngredient: matchedIngredient
                        ))
                    }
                }
            }
        }
        
        return ingredients.sorted { $0.confidence > $1.confidence }
    }
    
    /// Güven skorunu hesaplar
    private func calculateConfidence(word: String, ingredient: Ingredient) -> Double {
        let normalizedWord = word.normalizedForComparison()
        let ingredientNames = ingredient.allPossibleNames()
        
        // Tam eşleşme = yüksek güven
        if ingredientNames.contains(where: { $0 == normalizedWord }) {
            return 0.9
        }
        
        // Kısmi eşleşme = orta güven
        if ingredientNames.contains(where: { $0.contains(normalizedWord) || normalizedWord.contains($0) }) {
            return 0.7
        }
        
        return 0.5
    }
}

