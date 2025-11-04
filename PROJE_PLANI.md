# iOS Yemek Tarifi Uygulaması - Detaylı Proje Planı

## 🎯 Proje Özeti
Kullanıcının çektiği fotoğraflardaki malzemeleri analiz ederek, o malzemelerle yapılabilecek basit ve kolay yemek/tatlı tarifleri öneren iOS uygulaması.

## 📋 Teknoloji Stack'i

### 1. **iOS Geliştirme**
- **SwiftUI**: Modern, deklaratif UI framework
- **Swift 5.9+**: Ana programlama dili
- **iOS 16.0+**: Minimum iOS versiyonu

### 2. **Görüntü Analizi (Computer Vision)**
- **Core ML**: Apple'ın machine learning framework'ü (yerel işleme)
- **Vision Framework**: Görüntü analizi için
- **Cloud ML API**: Daha gelişmiş analiz için (opsiyonel)
  - **Google Vision API** veya
  - **OpenAI GPT-4 Vision API** veya
  - **Clarifai Food API**

### 3. **Backend & Veritabanı** (Opsiyonel)
- **Firebase**: Kullanıcı verileri, tarif veritabanı
- **Supabase**: Alternatif backend çözümü
- **Yerel SQLite**: Basit tarif saklama

### 4. **Tarif Veritabanı**
- **Yerel JSON dosyası**: Başlangıç için
- **API entegrasyonu**: 
  - Spoonacular API (yemek tarifleri)
  - Edamam Recipe API

## 🗺️ Proje Yapısı

```
yemek-projesi/
├── YemekProjesi/
│   ├── App/
│   │   ├── YemekApp.swift
│   │   └── AppDelegate.swift
│   ├── Models/
│   │   ├── Ingredient.swift
│   │   ├── Recipe.swift
│   │   └── DetectedIngredient.swift
│   ├── Views/
│   │   ├── CameraView.swift
│   │   ├── PhotoPickerView.swift
│   │   ├── RecipeListView.swift
│   │   ├── RecipeDetailView.swift
│   │   └── HomeView.swift
│   ├── ViewModels/
│   │   ├── ImageAnalyzerViewModel.swift
│   │   ├── RecipeViewModel.swift
│   │   └── CameraViewModel.swift
│   ├── Services/
│   │   ├── ImageAnalysisService.swift
│   │   ├── RecipeService.swift
│   │   └── MLModelService.swift
│   ├── Utilities/
│   │   ├── ImageProcessor.swift
│   │   └── Extensions.swift
│   └── Resources/
│       ├── Assets.xcassets
│       ├── Recipes.json
│       └── Ingredients.json
├── README.md
└── YemekProjesi.xcodeproj
```

## 🚀 Geliştirme Adımları

### **Faz 1: Temel Proje Yapısı**
1. ✅ Xcode projesi oluşturma
2. ✅ SwiftUI proje yapısı
3. ✅ Temel modeller (Ingredient, Recipe)
4. ✅ Temel view'lar (Home, Camera, Recipe List)

### **Faz 2: Kamera ve Fotoğraf İşleme**
1. ✅ Kamera erişimi (AVFoundation)
2. ✅ Fotoğraf seçme (PhotosPicker)
3. ✅ Görüntü önizleme
4. ✅ Görüntü işleme ve optimizasyon

### **Faz 3: Görüntü Analizi**
1. ✅ Vision Framework entegrasyonu
2. ✅ Core ML model entegrasyonu (opsiyonel)
3. ✅ Cloud API entegrasyonu (opsiyonel)
4. ✅ Malzeme tanıma algoritması
5. ✅ Güven skoru hesaplama

### **Faz 4: Tarif Sistemi**
1. ✅ Yerel tarif veritabanı oluşturma
2. ✅ Malzeme eşleştirme algoritması
3. ✅ Tarif filtreleme ve sıralama
4. ✅ Tarif detay sayfası
5. ✅ API entegrasyonu (opsiyonel)

### **Faz 5: Kullanıcı Arayüzü**
1. ✅ Modern ve kullanıcı dostu UI tasarımı
2. ✅ Animasyonlar ve geçişler
3. ✅ Dark mode desteği
4. ✅ Responsive tasarım

### **Faz 6: İyileştirmeler**
1. ✅ Favoriler sistemi
2. ✅ Tarif geçmişi
3. ✅ Paylaşım özelliği
4. ✅ Hata yönetimi
5. ✅ Loading states
6. ✅ Offline desteği

## 🔧 Teknik Detaylar

### **Görüntü Analizi Yaklaşımları**

#### Seçenek 1: Vision Framework + Text Recognition
- Görüntüdeki metinleri okuma (malzeme etiketleri)
- Basit ve hızlı
- Sınırlı doğruluk

#### Seçenek 2: Core ML Custom Model
- Özel eğitilmiş model
- Yerel işleme (privacy)
- Model eğitimi gerektirir

#### Seçenek 3: Cloud API (Önerilen)
- **OpenAI GPT-4 Vision**: En gelişmiş, yüksek maliyet
- **Google Cloud Vision**: İyi sonuçlar, orta maliyet
- **Clarifai Food Model**: Özel yemek tanıma, uygun fiyat

### **Tarif Eşleştirme Algoritması**
1. Tespit edilen malzemeleri al
2. Her malzeme için sinonimleri bul
3. Tarif veritabanında arama yap
4. Eşleşme skorunu hesapla (ne kadar çok malzeme eşleşiyorsa o kadar yüksek)
5. Eksik malzemeleri göster
6. Basitlik skoruna göre sırala

## 📱 Özellikler

### **Temel Özellikler**
- 📸 Kamera ile fotoğraf çekme
- 🖼️ Galeriden fotoğraf seçme
- 🔍 Malzeme analizi
- 📝 Tarif listesi
- 📖 Tarif detayları
- ⭐ Favoriler

### **Gelişmiş Özellikler** (İleride)
- 🔔 Malzeme bildirimleri
- 📊 Beslenme bilgileri
- 🎥 Video tarifleri
- 🌍 Çoklu dil desteği
- 👥 Sosyal paylaşım

## 🎨 UI/UX Tasarım Prensipleri
- **Minimalist**: Temiz ve basit arayüz
- **Renkler**: Sıcak, yemek temalı renkler (turuncu, kırmızı, sarı)
- **Tipografi**: Okunabilir fontlar
- **İkonlar**: SF Symbols kullanımı
- **Animasyonlar**: Yumuşak geçişler

## 📦 Gerekli Framework'ler
- SwiftUI
- AVFoundation (Kamera)
- PhotosUI (Fotoğraf seçme)
- Vision (Görüntü analizi)
- Core ML (Opsiyonel)
- Combine (Reactive programming)

## 🔐 Güvenlik ve Gizlilik
- Fotoğraflar yerel olarak işlenir (opsiyonel)
- API anahtarları güvenli saklanır
- Kullanıcı verileri şifrelenir
- GDPR uyumluluğu

## 📊 Başarı Metrikleri
- ✅ Malzeme tanıma doğruluğu > %80
- ✅ Tarif eşleştirme doğruluğu > %75
- ✅ Uygulama açılış süresi < 2 saniye
- ✅ Fotoğraf analiz süresi < 5 saniye

## 🗓️ Tahmini Süre
- **Faz 1-2**: 2-3 gün
- **Faz 3**: 3-5 gün
- **Faz 4**: 2-3 gün
- **Faz 5**: 2-3 gün
- **Faz 6**: 2-3 gün
- **Toplam**: 11-17 gün

## 🚀 Hemen Başlayalım!
Projeye başlamak için hazırız. İlk adım olarak temel proje yapısını oluşturacağız.

