//
//  Recipe.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation

/// Tarif modeli
struct Recipe: Identifiable, Codable, Hashable {
    let id: UUID
    var title: String
    var description: String
    var ingredients: [RecipeIngredient]
    var instructions: [String]
    var prepTime: Int // Hazırlık süresi (dakika)
    var cookTime: Int // Pişirme süresi (dakika)
    var difficulty: Difficulty
    var servings: Int // Kaç kişilik
    var category: RecipeCategory
    var imageName: String?
    var tags: [String]
    
    init(
        id: UUID = UUID(),
        title: String,
        description: String,
        ingredients: [RecipeIngredient],
        instructions: [String],
        prepTime: Int,
        cookTime: Int,
        difficulty: Difficulty,
        servings: Int,
        category: RecipeCategory,
        imageName: String? = nil,
        tags: [String] = []
    ) {
        self.id = id
        self.title = title
        self.description = description
        self.ingredients = ingredients
        self.instructions = instructions
        self.prepTime = prepTime
        self.cookTime = cookTime
        self.difficulty = difficulty
        self.servings = servings
        self.category = category
        self.imageName = imageName
        self.tags = tags
    }
    
    /// Toplam süre (hazırlık + pişirme)
    var totalTime: Int {
        prepTime + cookTime
    }
    
    /// Basitlik skoru (düşük süre ve kolay zorluk = yüksek skor)
    var simplicityScore: Double {
        let timeScore = 100.0 - Double(totalTime)
        let difficultyScore: Double = {
            switch difficulty {
            case .easy: return 100.0
            case .medium: return 50.0
            case .hard: return 0.0
            }
        }()
        return (timeScore * 0.6) + (difficultyScore * 0.4)
    }
    
    /// Bu tarifin malzemeleriyle, verilen malzemelerin eşleşme skorunu hesaplar
    func matchScore(with ingredients: [DetectedIngredient]) -> Double {
        let recipeIngredientNames = self.ingredients.map { $0.name.lowercased() }
        var matchCount = 0
        
        for detectedIngredient in ingredients {
            let detectedNames = detectedIngredient.matchedIngredient?.allPossibleNames() ?? [detectedIngredient.name.lowercased()]
            
            for recipeName in recipeIngredientNames {
                if detectedNames.contains(where: { $0.contains(recipeName) || recipeName.contains($0) }) {
                    matchCount += 1
                    break
                }
            }
        }
        
        // Eşleşme yüzdesi: (eşleşen malzeme sayısı / toplam tarif malzemesi sayısı) * 100
        if recipeIngredientNames.isEmpty {
            return 0.0
        }
        
        let matchPercentage = Double(matchCount) / Double(recipeIngredientNames.count)
        return matchPercentage * 100.0
    }
}

/// Tarif malzemesi (miktar ve birim ile)
struct RecipeIngredient: Codable, Hashable {
    var name: String
    var amount: String // "2", "1/2", "200" gibi
    var unit: String? // "adet", "gram", "yemek kaşığı" gibi
    
    init(name: String, amount: String, unit: String? = nil) {
        self.name = name
        self.amount = amount
        self.unit = unit
    }
}

/// Zorluk seviyesi
enum Difficulty: String, Codable, CaseIterable {
    case easy = "Kolay"
    case medium = "Orta"
    case hard = "Zor"
    
    var color: String {
        switch self {
        case .easy: return "green"
        case .medium: return "orange"
        case .hard: return "red"
        }
    }
}

/// Tarif kategorisi
enum RecipeCategory: String, Codable, CaseIterable {
    case mainDish = "Ana Yemek"
    case dessert = "Tatlı"
    case salad = "Salata"
    case soup = "Çorba"
    case appetizer = "Aperatif"
    case drink = "İçecek"
    case snack = "Atıştırmalık"
    case other = "Diğer"
    
    var icon: String {
        switch self {
        case .mainDish: return "fork.knife"
        case .dessert: return "birthday.cake.fill"
        case .salad: return "leaf.fill"
        case .soup: return "bowl.fill"
        case .appetizer: return "cup.and.saucer.fill"
        case .drink: return "drop.fill"
        case .snack: return "circle.fill"
        case .other: return "square.fill"
        }
    }
}

