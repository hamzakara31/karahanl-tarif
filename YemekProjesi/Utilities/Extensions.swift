//
//  Extensions.swift
//  YemekProjesi
//
//  Created on iOS
//

import Foundation
import SwiftUI

// MARK: - String Extensions
extension String {
    /// Türkçe karakterleri İngilizce karşılıklarına çevirir (normalizasyon için)
    func normalize() -> String {
        let turkishChars = "çğıöşüÇĞIİÖŞÜ"
        let englishChars = "cgiosuCGIIOSU"
        
        var normalized = self
        for (index, char) in turkishChars.enumerated() {
            normalized = normalized.replacingOccurrences(of: String(char), with: String(englishChars[englishChars.index(englishChars.startIndex, offsetBy: index)]))
        }
        return normalized
    }
    
    /// String'i küçük harfe çevirir ve normalize eder (karşılaştırma için)
    func normalizedForComparison() -> String {
        return self.lowercased().normalize().trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

// MARK: - Color Extensions
extension Color {
    /// Uygulama ana renkleri
    static let appPrimary = Color(red: 1.0, green: 0.6, blue: 0.0) // Turuncu
    static let appSecondary = Color(red: 0.9, green: 0.3, blue: 0.1) // Kırmızı-turuncu
    static let appBackground = Color(red: 0.98, green: 0.98, blue: 0.98) // Açık gri
    static let appCardBackground = Color.white
}

// MARK: - View Extensions
extension View {
    /// Yuvarlak köşeli kart stilini uygular
    func cardStyle() -> some View {
        self
            .background(Color.appCardBackground)
            .cornerRadius(16)
            .shadow(color: Color.black.opacity(0.1), radius: 8, x: 0, y: 4)
    }
    
    /// Yumuşak animasyon için modifier
    func smoothAnimation() -> some View {
        self.animation(.spring(response: 0.3, dampingFraction: 0.7), value: UUID())
    }
}

