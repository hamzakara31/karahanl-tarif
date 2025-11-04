//
//  RecipeService.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation
import Combine

/// Tarif servisi - tarif veritabanı yönetimi
class RecipeService: ObservableObject {
    @Published var allRecipes: [Recipe] = []
    @Published var allIngredients: [Ingredient] = []
    
    init() {
        loadData()
    }
    
    /// Verileri yükler (JSON dosyalarından veya API'den)
    func loadData() {
        loadIngredients()
        loadRecipes()
    }
    
    /// Malzemeleri yükler
    private func loadIngredients() {
        // Yerel malzeme listesi (başlangıç için)
        allIngredients = defaultIngredients()
    }
    
    /// Tarifleri yükler
    private func loadRecipes() {
        // Yerel tarif listesi (başlangıç için)
        allRecipes = defaultRecipes()
    }
    
    /// Tüm malzemeleri döndürür
    func getAllIngredients() -> [Ingredient] {
        return allIngredients
    }
    
    /// Tespit edilen malzemelerle eşleşen tarifleri bulur
    func findRecipes(for detectedIngredients: [DetectedIngredient]) -> [Recipe] {
        guard !detectedIngredients.isEmpty else {
            return []
        }
        
        // Her tarif için eşleşme skorunu hesapla
        let recipesWithScores = allRecipes.map { recipe in
            (recipe: recipe, score: recipe.matchScore(with: detectedIngredients))
        }
        
        // Eşleşme skoru %30'dan fazla olan tarifleri filtrele
        let matchedRecipes = recipesWithScores
            .filter { $0.score >= 30.0 }
            .sorted { first, second in
                // Önce eşleşme skoruna göre, sonra basitlik skoruna göre sırala
                if first.score != second.score {
                    return first.score > second.score
                }
                return first.recipe.simplicityScore > second.recipe.simplicityScore
            }
            .map { $0.recipe }
        
        return matchedRecipes
    }
    
    /// ID'ye göre tarif bulur
    func getRecipe(by id: UUID) -> Recipe? {
        return allRecipes.first { $0.id == id }
    }
    
    /// Varsayılan malzeme listesi
    private func defaultIngredients() -> [Ingredient] {
        return [
            Ingredient(name: "Domates", synonyms: ["tomato", "tomat"], category: .vegetables),
            Ingredient(name: "Soğan", synonyms: ["onion"], category: .vegetables),
            Ingredient(name: "Sarımsak", synonyms: ["garlic"], category: .vegetables),
            Ingredient(name: "Biber", synonyms: ["pepper", "bell pepper"], category: .vegetables),
            Ingredient(name: "Patlıcan", synonyms: ["eggplant", "aubergine"], category: .vegetables),
            Ingredient(name: "Kabak", synonyms: ["zucchini", "courgette"], category: .vegetables),
            Ingredient(name: "Havuç", synonyms: ["carrot"], category: .vegetables),
            Ingredient(name: "Patates", synonyms: ["potato"], category: .vegetables),
            Ingredient(name: "Salatalık", synonyms: ["cucumber"], category: .vegetables),
            Ingredient(name: "Marul", synonyms: ["lettuce"], category: .vegetables),
            Ingredient(name: "Maydanoz", synonyms: ["parsley"], category: .vegetables),
            Ingredient(name: "Dereotu", synonyms: ["dill"], category: .vegetables),
            Ingredient(name: "Limon", synonyms: ["lemon"], category: .fruits),
            Ingredient(name: "Yumurta", synonyms: ["egg"], category: .dairy),
            Ingredient(name: "Süt", synonyms: ["milk"], category: .dairy),
            Ingredient(name: "Peynir", synonyms: ["cheese"], category: .dairy),
            Ingredient(name: "Yoğurt", synonyms: ["yogurt", "yoghurt"], category: .dairy),
            Ingredient(name: "Et", synonyms: ["meat", "beef"], category: .meat),
            Ingredient(name: "Tavuk", synonyms: ["chicken"], category: .meat),
            Ingredient(name: "Balık", synonyms: ["fish"], category: .meat),
            Ingredient(name: "Pilav", synonyms: ["rice"], category: .grains),
            Ingredient(name: "Makarna", synonyms: ["pasta"], category: .grains),
            Ingredient(name: "Ekmek", synonyms: ["bread"], category: .grains),
            Ingredient(name: "Un", synonyms: ["flour"], category: .grains),
            Ingredient(name: "Şeker", synonyms: ["sugar"], category: .spices),
            Ingredient(name: "Tuz", synonyms: ["salt"], category: .spices),
            Ingredient(name: "Karabiber", synonyms: ["black pepper", "pepper"], category: .spices),
            Ingredient(name: "Zeytinyağı", synonyms: ["olive oil"], category: .other),
            Ingredient(name: "Ayçiçek Yağı", synonyms: ["sunflower oil"], category: .other),
            Ingredient(name: "Domates Salçası", synonyms: ["tomato paste"], category: .other),
            Ingredient(name: "Biber Salçası", synonyms: ["pepper paste"], category: .other),
        ]
    }
    
    /// Varsayılan tarif listesi
    private func defaultRecipes() -> [Recipe] {
        return [
            // Menemen
            Recipe(
                title: "Menemen",
                description: "Klasik Türk menemeni, domates, biber ve yumurta ile hazırlanan lezzetli bir kahvaltı yemeği.",
                ingredients: [
                    RecipeIngredient(name: "Domates", amount: "3", unit: "adet"),
                    RecipeIngredient(name: "Biber", amount: "2", unit: "adet"),
                    RecipeIngredient(name: "Soğan", amount: "1", unit: "adet"),
                    RecipeIngredient(name: "Yumurta", amount: "4", unit: "adet"),
                    RecipeIngredient(name: "Zeytinyağı", amount: "2", unit: "yemek kaşığı"),
                    RecipeIngredient(name: "Tuz", amount: "1", unit: "çay kaşığı"),
                    RecipeIngredient(name: "Karabiber", amount: "yarım", unit: "çay kaşığı")
                ],
                instructions: [
                    "Soğanı küp küp doğrayın.",
                    "Biberleri ince şeritler halinde kesin.",
                    "Domatesleri küp küp doğrayın.",
                    "Tavaya zeytinyağını alın, soğanı ekleyip kavurun.",
                    "Biberleri ekleyip birkaç dakika daha kavurun.",
                    "Domatesleri ekleyip suyunu çekene kadar pişirin.",
                    "Tuz ve karabiber ekleyin.",
                    "Yumurtaları kırıp karıştırın, pişirin.",
                    "Sıcak servis yapın."
                ],
                prepTime: 10,
                cookTime: 15,
                difficulty: .easy,
                servings: 2,
                category: .mainDish,
                tags: ["kahvaltı", "kolay", "hızlı"]
            ),
            
            // Domates Çorbası
            Recipe(
                title: "Domates Çorbası",
                description: "Sıcacık ve lezzetli domates çorbası, kış günleri için ideal.",
                ingredients: [
                    RecipeIngredient(name: "Domates", amount: "5", unit: "adet"),
                    RecipeIngredient(name: "Soğan", amount: "1", unit: "adet"),
                    RecipeIngredient(name: "Sarımsak", amount: "2", unit: "diş"),
                    RecipeIngredient(name: "Un", amount: "2", unit: "yemek kaşığı"),
                    RecipeIngredient(name: "Et Suyu", amount: "2", unit: "su bardağı"),
                    RecipeIngredient(name: "Zeytinyağı", amount: "2", unit: "yemek kaşığı"),
                    RecipeIngredient(name: "Tuz", amount: "1", unit: "çay kaşığı"),
                    RecipeIngredient(name: "Karabiber", amount: "yarım", unit: "çay kaşığı")
                ],
                instructions: [
                    "Domatesleri haşlayıp kabuklarını soyun.",
                    "Soğan ve sarımsağı küp küp doğrayın.",
                    "Tavada zeytinyağı ile soğan ve sarımsağı kavurun.",
                    "Unu ekleyip kavurun.",
                    "Domatesleri ekleyip ezerek pişirin.",
                    "Et suyunu ekleyip kaynatın.",
                    "Blender'dan geçirin.",
                    "Tuz ve karabiber ekleyip tekrar kaynatın.",
                    "Sıcak servis yapın."
                ],
                prepTime: 15,
                cookTime: 25,
                difficulty: .easy,
                servings: 4,
                category: .soup,
                tags: ["çorba", "kış", "sıcak"]
            ),
            
            // Salata
            Recipe(
                title: "Karışık Salata",
                description: "Taze ve sağlıklı karışık salata, her öğüne uygun.",
                ingredients: [
                    RecipeIngredient(name: "Marul", amount: "1", unit: "baş"),
                    RecipeIngredient(name: "Salatalık", amount: "2", unit: "adet"),
                    RecipeIngredient(name: "Domates", amount: "2", unit: "adet"),
                    RecipeIngredient(name: "Soğan", amount: "yarım", unit: "adet"),
                    RecipeIngredient(name: "Maydanoz", amount: "yarım", unit: "demet"),
                    RecipeIngredient(name: "Zeytinyağı", amount: "3", unit: "yemek kaşığı"),
                    RecipeIngredient(name: "Limon", amount: "1", unit: "adet"),
                    RecipeIngredient(name: "Tuz", amount: "1", unit: "çay kaşığı")
                ],
                instructions: [
                    "Marulu yıkayıp doğrayın.",
                    "Salatalığı dilimleyin.",
                    "Domatesi küp küp doğrayın.",
                    "Soğanı ince halkalar halinde kesin.",
                    "Maydanozu ince doğrayın.",
                    "Tüm malzemeleri karıştırın.",
                    "Zeytinyağı, limon suyu ve tuz ile sos hazırlayın.",
                    "Salatanın üzerine sosu dökün ve karıştırın.",
                    "Servis yapın."
                ],
                prepTime: 10,
                cookTime: 0,
                difficulty: .easy,
                servings: 4,
                category: .salad,
                tags: ["salata", "sağlıklı", "hızlı"]
            ),
            
            // Yumurta Salatası
            Recipe(
                title: "Yumurta Salatası",
                description: "Basit ve lezzetli yumurta salatası, kahvaltı veya atıştırmalık olarak ideal.",
                ingredients: [
                    RecipeIngredient(name: "Yumurta", amount: "4", unit: "adet"),
                    RecipeIngredient(name: "Maydanoz", amount: "yarım", unit: "demet"),
                    RecipeIngredient(name: "Zeytinyağı", amount: "2", unit: "yemek kaşığı"),
                    RecipeIngredient(name: "Limon", amount: "yarım", unit: "adet"),
                    RecipeIngredient(name: "Tuz", amount: "yarım", unit: "çay kaşığı"),
                    RecipeIngredient(name: "Karabiber", amount: "yarım", unit: "çay kaşığı")
                ],
                instructions: [
                    "Yumurtaları haşlayın ve soğutun.",
                    "Yumurtaları küp küp doğrayın.",
                    "Maydanozu ince doğrayın.",
                    "Yumurta ve maydanozu karıştırın.",
                    "Zeytinyağı, limon suyu, tuz ve karabiber ekleyin.",
                    "Karıştırıp servis yapın."
                ],
                prepTime: 5,
                cookTime: 10,
                difficulty: .easy,
                servings: 2,
                category: .salad,
                tags: ["yumurta", "kahvaltı", "kolay"]
            ),
            
            // Domates Soslu Makarna
            Recipe(
                title: "Domates Soslu Makarna",
                description: "Klasik ve lezzetli domates soslu makarna, herkesin sevdiği bir tarif.",
                ingredients: [
                    RecipeIngredient(name: "Makarna", amount: "400", unit: "gram"),
                    RecipeIngredient(name: "Domates", amount: "4", unit: "adet"),
                    RecipeIngredient(name: "Sarımsak", amount: "3", unit: "diş"),
                    RecipeIngredient(name: "Soğan", amount: "1", unit: "adet"),
                    RecipeIngredient(name: "Zeytinyağı", amount: "3", unit: "yemek kaşığı"),
                    RecipeIngredient(name: "Tuz", amount: "1", unit: "çay kaşığı"),
                    RecipeIngredient(name: "Karabiber", amount: "yarım", unit: "çay kaşığı"),
                    RecipeIngredient(name: "Maydanoz", amount: "yarım", unit: "demet")
                ],
                instructions: [
                    "Makarnayı tuzlu suda haşlayın.",
                    "Soğan ve sarımsağı küp küp doğrayın.",
                    "Domatesleri küp küp doğrayın.",
                    "Tavada zeytinyağı ile soğan ve sarımsağı kavurun.",
                    "Domatesleri ekleyip suyunu çekene kadar pişirin.",
                    "Tuz ve karabiber ekleyin.",
                    "Haşlanmış makarnayı sos ile karıştırın.",
                    "Maydanoz ile süsleyip servis yapın."
                ],
                prepTime: 10,
                cookTime: 20,
                difficulty: .easy,
                servings: 4,
                category: .mainDish,
                tags: ["makarna", "kolay", "hızlı"]
            )
        ]
    }
}

