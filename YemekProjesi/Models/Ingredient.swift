//
//  Ingredient.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation

/// Malzeme modeli
struct Ingredient: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var synonyms: [String] // Eş anlamlı kelimeler (örn: "domates" için ["tomato", "tomat"])
    var category: IngredientCategory
    var imageName: String? // İkon veya görsel adı
    
    init(id: UUID = UUID(), name: String, synonyms: [String] = [], category: IngredientCategory = .other, imageName: String? = nil) {
        self.id = id
        self.name = name
        self.synonyms = synonyms
        self.category = category
        self.imageName = imageName
    }
    
    /// Malzeme adını ve sinonimlerini içeren tüm olası eşleşmeleri döndürür
    func allPossibleNames() -> [String] {
        var names = [name.lowercased()]
        names.append(contentsOf: synonyms.map { $0.lowercased() })
        return names
    }
}

/// Malzeme kategorileri
enum IngredientCategory: String, Codable, CaseIterable {
    case vegetables = "Sebzeler"
    case fruits = "Meyveler"
    case meat = "Et"
    case dairy = "Süt Ürünleri"
    case grains = "Tahıllar"
    case spices = "Baharatlar"
    case other = "Diğer"
    
    var icon: String {
        switch self {
        case .vegetables: return "leaf.fill"
        case .fruits: return "apple.logo"
        case .meat: return "fork.knife"
        case .dairy: return "drop.fill"
        case .grains: return "circle.grid.2x2.fill"
        case .spices: return "flame.fill"
        case .other: return "circle.fill"
        }
    }
}

/// Tespit edilen malzeme (görüntü analizinden sonra)
struct DetectedIngredient: Identifiable, Hashable {
    let id: UUID
    let name: String
    let confidence: Double // 0.0 - 1.0 arası güven skoru
    var matchedIngredient: Ingredient? // Eşleşen malzeme modeli
    
    init(id: UUID = UUID(), name: String, confidence: Double, matchedIngredient: Ingredient? = nil) {
        self.id = id
        self.name = name
        self.confidence = confidence
        self.matchedIngredient = matchedIngredient
    }
}

