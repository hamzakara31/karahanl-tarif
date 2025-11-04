//
//  RecipeListView.swift
//  YemekProjesi
//
//  Created on iOS
//

import SwiftUI

/// Tarif listesi görünümü
struct RecipeListView: View {
    let recipes: [Recipe]
    @State private var selectedRecipe: Recipe?
    
    var body: some View {
        ZStack {
            Color.appBackground
                .ignoresSafeArea()
            
            if recipes.isEmpty {
                VStack(spacing: 16) {
                    Image(systemName: "book.closed")
                        .font(.system(size: 60))
                        .foregroundColor(.secondary)
                    Text("Tarif bulunamadı")
                        .font(.headline)
                        .foregroundColor(.secondary)
                }
            } else {
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(recipes) { recipe in
                            RecipeCard(recipe: recipe)
                                .onTapGesture {
                                    selectedRecipe = recipe
                                }
                        }
                    }
                    .padding()
                }
            }
        }
        .navigationTitle("Tarifler")
        .navigationBarTitleDisplayMode(.large)
        .sheet(item: $selectedRecipe) { recipe in
            RecipeDetailView(recipe: recipe)
        }
    }
}

/// Tarif kartı görünümü
struct RecipeCard: View {
    let recipe: Recipe
    @State private var isFavorite = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Başlık ve favori butonu
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(recipe.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text(recipe.description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }
                
                Spacer()
                
                Button(action: {
                    isFavorite.toggle()
                }) {
                    Image(systemName: isFavorite ? "heart.fill" : "heart")
                        .foregroundColor(isFavorite ? .red : .secondary)
                }
            }
            
            Divider()
            
            // Bilgiler
            HStack(spacing: 16) {
                Label("\(recipe.prepTime + recipe.cookTime) dk", systemImage: "clock")
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                Label(recipe.difficulty.rawValue, systemImage: "chart.bar")
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                Label("\(recipe.servings) kişi", systemImage: "person.2")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            // Malzemeler önizleme
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(recipe.ingredients.prefix(5), id: \.name) { ingredient in
                        Text(ingredient.name)
                            .font(.caption2)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.appPrimary.opacity(0.1))
                            .foregroundColor(.appPrimary)
                            .cornerRadius(8)
                    }
                    
                    if recipe.ingredients.count > 5 {
                        Text("+\(recipe.ingredients.count - 5)")
                            .font(.caption2)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.secondary.opacity(0.1))
                            .foregroundColor(.secondary)
                            .cornerRadius(8)
                    }
                }
            }
        }
        .padding()
        .cardStyle()
    }
}

#Preview {
    NavigationStack {
        RecipeListView(recipes: [
            Recipe(
                title: "Menemen",
                description: "Klasik Türk menemeni",
                ingredients: [
                    RecipeIngredient(name: "Domates", amount: "3"),
                    RecipeIngredient(name: "Yumurta", amount: "4")
                ],
                instructions: ["Adım 1", "Adım 2"],
                prepTime: 10,
                cookTime: 15,
                difficulty: .easy,
                servings: 2,
                category: .mainDish
            )
        ])
    }
}

