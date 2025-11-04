//
//  RecipeDetailView.swift
//  YemekProjesi
//
//  Created on iOS
//

import SwiftUI

/// Tarif detay görünümü
struct RecipeDetailView: View {
    let recipe: Recipe
    @Environment(\.dismiss) var dismiss
    @State private var isFavorite = false
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // Başlık
                    VStack(alignment: .leading, spacing: 8) {
                        Text(recipe.title)
                            .font(.system(size: 32, weight: .bold))
                            .foregroundColor(.primary)
                        
                        Text(recipe.description)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    
                    // Bilgiler
                    HStack(spacing: 20) {
                        InfoCard(
                            icon: "clock",
                            title: "Hazırlık",
                            value: "\(recipe.prepTime) dk"
                        )
                        
                        InfoCard(
                            icon: "flame",
                            title: "Pişirme",
                            value: "\(recipe.cookTime) dk"
                        )
                        
                        InfoCard(
                            icon: "chart.bar",
                            title: "Zorluk",
                            value: recipe.difficulty.rawValue
                        )
                        
                        InfoCard(
                            icon: "person.2",
                            title: "Kişi",
                            value: "\(recipe.servings)"
                        )
                    }
                    
                    Divider()
                    
                    // Malzemeler
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Malzemeler")
                            .font(.headline)
                        
                        ForEach(recipe.ingredients, id: \.name) { ingredient in
                            HStack {
                                Image(systemName: "circle.fill")
                                    .font(.system(size: 6))
                                    .foregroundColor(.appPrimary)
                                
                                Text("\(ingredient.amount) \(ingredient.unit ?? "") \(ingredient.name)")
                                    .font(.body)
                            }
                            .padding(.vertical, 4)
                        }
                    }
                    
                    Divider()
                    
                    // Yapılışı
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Yapılışı")
                            .font(.headline)
                        
                        ForEach(Array(recipe.instructions.enumerated()), id: \.offset) { index, instruction in
                            HStack(alignment: .top, spacing: 12) {
                                Text("\(index + 1)")
                                    .font(.headline)
                                    .foregroundColor(.white)
                                    .frame(width: 30, height: 30)
                                    .background(Color.appPrimary)
                                    .clipShape(Circle())
                                
                                Text(instruction)
                                    .font(.body)
                                    .fixedSize(horizontal: false, vertical: true)
                                
                                Spacer()
                            }
                            .padding(.vertical, 8)
                        }
                    }
                    
                    // Etiketler
                    if !recipe.tags.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Etiketler")
                                .font(.headline)
                            
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 8) {
                                    ForEach(recipe.tags, id: \.self) { tag in
                                        Text(tag)
                                            .font(.caption)
                                            .padding(.horizontal, 12)
                                            .padding(.vertical, 6)
                                            .background(Color.appPrimary.opacity(0.1))
                                            .foregroundColor(.appPrimary)
                                            .cornerRadius(12)
                                    }
                                }
                            }
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Tarif Detayı")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        isFavorite.toggle()
                    }) {
                        Image(systemName: isFavorite ? "heart.fill" : "heart")
                            .foregroundColor(isFavorite ? .red : .primary)
                    }
                }
                
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Kapat") {
                        dismiss()
                    }
                }
            }
        }
    }
}

/// Bilgi kartı görünümü
struct InfoCard: View {
    let icon: String
    let title: String
    let value: String
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.appPrimary)
            
            Text(value)
                .font(.headline)
                .foregroundColor(.primary)
            
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.appCardBackground)
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.05), radius: 4, x: 0, y: 2)
    }
}

#Preview {
    RecipeDetailView(recipe: Recipe(
        title: "Menemen",
        description: "Klasik Türk menemeni",
        ingredients: [
            RecipeIngredient(name: "Domates", amount: "3", unit: "adet"),
            RecipeIngredient(name: "Yumurta", amount: "4", unit: "adet")
        ],
        instructions: [
            "Soğanı küp küp doğrayın.",
            "Biberleri ince şeritler halinde kesin.",
            "Domatesleri küp küp doğrayın."
        ],
        prepTime: 10,
        cookTime: 15,
        difficulty: .easy,
        servings: 2,
        category: .mainDish,
        tags: ["kahvaltı", "kolay"]
    ))
}

