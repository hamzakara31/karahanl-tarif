//
//  ImageAnalyzerViewModel.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation
import SwiftUI
import Combine
import PhotosUI

/// Görüntü analizi ViewModel
class ImageAnalyzerViewModel: ObservableObject {
    @Published var selectedImage: UIImage?
    @Published var detectedIngredients: [DetectedIngredient] = []
    @Published var matchedRecipes: [Recipe] = []
    @Published var isAnalyzing = false
    @Published var errorMessage: String?
    @Published var selectedPhotoItem: PhotosPickerItem?
    
    private let imageAnalysisService: ImageAnalysisService
    private let recipeService: RecipeService
    private var cancellables = Set<AnyCancellable>()
    
    init(imageAnalysisService: ImageAnalysisService, recipeService: RecipeService) {
        self.imageAnalysisService = imageAnalysisService
        self.recipeService = recipeService
        
        // ImageAnalysisService'den gelen güncellemeleri dinle
        imageAnalysisService.$detectedIngredients
            .assign(to: \.detectedIngredients, on: self)
            .store(in: &cancellables)
        
        imageAnalysisService.$isAnalyzing
            .assign(to: \.isAnalyzing, on: self)
            .store(in: &cancellables)
        
        imageAnalysisService.$errorMessage
            .assign(to: \.errorMessage, on: self)
            .store(in: &cancellables)
    }
    
    /// Seçilen fotoğrafı yükler ve analiz eder
    func loadImage(from item: PhotosPickerItem) {
        selectedPhotoItem = item
        
        item.loadTransferable(type: Data.self) { [weak self] result in
            guard let self = self else { return }
            
            switch result {
            case .success(let data):
                if let data = data, let image = UIImage(data: data) {
                    DispatchQueue.main.async {
                        self.selectedImage = image
                        self.analyzeImage(image)
                    }
                }
            case .failure(let error):
                DispatchQueue.main.async {
                    self.errorMessage = "Fotoğraf yüklenirken hata oluştu: \(error.localizedDescription)"
                }
            }
        }
    }
    
    /// Görüntüyü analiz eder
    func analyzeImage(_ image: UIImage) {
        imageAnalysisService.analyzeImage(image)
        
        // Analiz tamamlandığında tarifleri bul
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.findRecipes()
        }
    }
    
    /// Tespit edilen malzemelerle eşleşen tarifleri bulur
    func findRecipes() {
        matchedRecipes = recipeService.findRecipes(for: detectedIngredients)
    }
    
    /// Temizler (yeni analiz için)
    func clear() {
        selectedImage = nil
        detectedIngredients = []
        matchedRecipes = []
        errorMessage = nil
        selectedPhotoItem = nil
    }
}

