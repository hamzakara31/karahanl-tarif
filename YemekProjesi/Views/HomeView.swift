//
//  HomeView.swift
//  YemekProjesi
//
//  Created on iOS
//

import SwiftUI
import PhotosUI

/// Ana ekran
struct HomeView: View {
    @EnvironmentObject var recipeService: RecipeService
    @EnvironmentObject var imageAnalysisService: ImageAnalysisService
    @State private var viewModel: ImageAnalyzerViewModel?
    @State private var selectedPhotoItem: PhotosPickerItem?
    @State private var showingRecipeList = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.appBackground
                    .ignoresSafeArea()
                
                if let viewModel = viewModel {
                    contentView(viewModel: viewModel)
                } else {
                    ProgressView()
                }
            }
            .onAppear {
                if viewModel == nil {
                    viewModel = ImageAnalyzerViewModel(
                        imageAnalysisService: imageAnalysisService,
                        recipeService: recipeService
                    )
                }
            }
        }
    }
    
    @ViewBuilder
    private func contentView(viewModel: ImageAnalyzerViewModel) -> some View {
        VStack(spacing: 24) {
            // Başlık
            VStack(spacing: 8) {
                Text("🍳 Yemek Tarifi")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(.appPrimary)
                
                Text("Malzemelerinizi analiz edin, tarifinizi bulun!")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            .padding(.top, 40)
            
            Spacer()
            
            // Fotoğraf seçme alanı
            VStack(spacing: 16) {
                if let image = viewModel.selectedImage {
                            // Seçilen görüntü
                            Image(uiImage: image)
                                .resizable()
                                .scaledToFit()
                                .frame(maxHeight: 300)
                                .cornerRadius(16)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 16)
                                        .stroke(Color.appPrimary, lineWidth: 2)
                                )
                                .padding()
                            
                            // Analiz durumu
                            if viewModel.isAnalyzing {
                                ProgressView()
                                    .scaleEffect(1.5)
                                Text("Malzemeler analiz ediliyor...")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            } else if !viewModel.detectedIngredients.isEmpty {
                                VStack(spacing: 8) {
                                    Text("✅ \(viewModel.detectedIngredients.count) malzeme tespit edildi")
                                        .font(.headline)
                                        .foregroundColor(.green)
                                    
                                    if !viewModel.matchedRecipes.isEmpty {
                                        Text("📝 \(viewModel.matchedRecipes.count) tarif bulundu")
                                            .font(.subheadline)
                                            .foregroundColor(.appPrimary)
                                    }
                                }
                            }
                        } else {
                            // Fotoğraf seçme butonu
                            PhotosPicker(selection: $selectedPhotoItem, matching: .images) {
                                VStack(spacing: 16) {
                                    Image(systemName: "camera.fill")
                                        .font(.system(size: 60))
                                        .foregroundColor(.appPrimary)
                                    
                                    Text("Fotoğraf Seç")
                                        .font(.headline)
                                        .foregroundColor(.white)
                                }
                                .frame(width: 200, height: 200)
                                .background(Color.appPrimary)
                                .cornerRadius(20)
                                .shadow(color: Color.appPrimary.opacity(0.3), radius: 10, x: 0, y: 5)
                            }
                        }
                    }
                    
                    Spacer()
                    
                    // Tespit edilen malzemeler
                    if !viewModel.detectedIngredients.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Tespit Edilen Malzemeler")
                                .font(.headline)
                                .padding(.horizontal)
                            
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 12) {
                                    ForEach(viewModel.detectedIngredients) { ingredient in
                                        IngredientChip(ingredient: ingredient)
                                    }
                                }
                                .padding(.horizontal)
                            }
                        }
                    }
                    
                    // Tarif listesi butonu
                    if !viewModel.matchedRecipes.isEmpty {
                        Button(action: {
                            showingRecipeList = true
                        }) {
                            HStack {
                                Text("Tarifleri Görüntüle")
                                    .font(.headline)
                                    .foregroundColor(.white)
                                Image(systemName: "arrow.right")
                                    .foregroundColor(.white)
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.appPrimary)
                            .cornerRadius(12)
                        }
                        .padding(.horizontal)
                        .padding(.bottom)
                    }
                }
            }
            .navigationDestination(isPresented: $showingRecipeList) {
                if let viewModel = viewModel {
                    RecipeListView(recipes: viewModel.matchedRecipes)
                }
            }
            .onChange(of: selectedPhotoItem) { newItem in
                if let newItem = newItem, let viewModel = viewModel {
                    viewModel.loadImage(from: newItem)
                }
            }
        }
    }
}

/// Malzeme chip görünümü
struct IngredientChip: View {
    let ingredient: DetectedIngredient
    
    var body: some View {
        HStack(spacing: 6) {
            Text(ingredient.name)
                .font(.caption)
                .fontWeight(.medium)
            
            if ingredient.confidence > 0.7 {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 12))
                    .foregroundColor(.green)
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(Color.appPrimary.opacity(0.1))
        .foregroundColor(.appPrimary)
        .cornerRadius(20)
    }
}

#Preview {
    HomeView()
        .environmentObject(RecipeService())
        .environmentObject(ImageAnalysisService(recipeService: RecipeService()))
}

