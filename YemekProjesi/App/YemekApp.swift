//
//  YemekApp.swift
//  YemekProjesi
//
//  Created on iOS
//

import SwiftUI

@main
struct YemekApp: App {
    // Servisleri oluştur
    @StateObject private var recipeService = RecipeService()
    @StateObject private var imageAnalysisService: ImageAnalysisService
    
    init() {
        // ImageAnalysisService'i RecipeService ile başlat
        let recipeService = RecipeService()
        let imageAnalysisService = ImageAnalysisService(recipeService: recipeService)
        _recipeService = StateObject(wrappedValue: recipeService)
        _imageAnalysisService = StateObject(wrappedValue: imageAnalysisService)
    }
    
    var body: some Scene {
        WindowGroup {
            HomeView()
                .environmentObject(recipeService)
                .environmentObject(imageAnalysisService)
        }
    }
}

