//
//  RecipeViewModel.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation
import SwiftUI
import Combine

/// Tarif ViewModel
class RecipeViewModel: ObservableObject {
    @Published var recipes: [Recipe] = []
    @Published var favoriteRecipeIds: Set<UUID> = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let recipeService: RecipeService
    private var cancellables = Set<AnyCancellable>()
    
    init(recipeService: RecipeService) {
        self.recipeService = recipeService
        
        // RecipeService'den gelen güncellemeleri dinle
        recipeService.$allRecipes
            .assign(to: \.recipes, on: self)
            .store(in: &cancellables)
        
        loadRecipes()
    }
    
    /// Tarifleri yükler
    func loadRecipes() {
        isLoading = true
        // RecipeService zaten verileri yüklüyor, sadece güncellemeleri dinliyoruz
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [weak self] in
            self?.isLoading = false
        }
    }
    
    /// Favoriye ekler/çıkarır
    func toggleFavorite(_ recipe: Recipe) {
        if favoriteRecipeIds.contains(recipe.id) {
            favoriteRecipeIds.remove(recipe.id)
        } else {
            favoriteRecipeIds.insert(recipe.id)
        }
    }
    
    /// Favori mi kontrol eder
    func isFavorite(_ recipe: Recipe) -> Bool {
        return favoriteRecipeIds.contains(recipe.id)
    }
    
    /// Favori tarifleri döndürür
    var favoriteRecipes: [Recipe] {
        return recipes.filter { favoriteRecipeIds.contains($0.id) }
    }
}

