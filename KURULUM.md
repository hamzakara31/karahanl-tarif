# 📱 iOS Yemek Tarifi Uygulaması - Kurulum Kılavuzu

Bu kılavuz, projeyi Xcode'da çalışır hale getirmek için adım adım talimatlar içerir.

## 🚀 Adım 1: Xcode Projesi Oluşturma

### 1.1 Xcode'u Açın
- Xcode'u başlatın (macOS gereklidir)

### 1.2 Yeni Proje Oluşturun
1. **File > New > Project** seçin (veya `Cmd + Shift + N`)
2. **iOS** sekmesini seçin
3. **App** şablonunu seçin
4. **Next** butonuna tıklayın

### 1.3 Proje Ayarları
Şu bilgileri girin:
- **Product Name**: `YemekProjesi`
- **Team**: Kendi geliştirici takımınızı seçin (veya "None" bırakın)
- **Organization Identifier**: `com.yourname` (örnek: `com.hamza`)
- **Interface**: **SwiftUI** seçin
- **Language**: **Swift** seçin
- **Storage**: **None** seçin
- **Use Core Data**: ❌ İşaretlemeyin
- **Include Tests**: ✅ İşaretleyebilirsiniz (opsiyonel)

5. **Next** butonuna tıklayın
6. Projeyi kaydetmek istediğiniz yeri seçin
7. **Create** butonuna tıklayın

## 📂 Adım 2: Dosyaları Projeye Ekleme

### 2.1 Mevcut Dosyaları Kopyalama
1. Xcode'da sol panelde proje adına sağ tıklayın
2. **Add Files to "YemekProjesi"...** seçin
3. Finder'da `YemekProjesi` klasörünü bulun
4. Tüm alt klasörleri seçin:
   - `App`
   - `Models`
   - `Views`
   - `ViewModels`
   - `Services`
   - `Utilities`
5. Şu seçenekleri işaretleyin:
   - ✅ **Copy items if needed**
   - ✅ **Create groups** (Create folder references DEĞİL)
   - ✅ **Add to targets: YemekProjesi**
6. **Add** butonuna tıklayın

### 2.2 Dosya Yapısını Kontrol Edin
Sol panelde şu yapıyı görmelisiniz:

```
YemekProjesi
├── YemekProjesiApp.swift (silin veya YemekApp.swift ile değiştirin)
├── App/
│   └── YemekApp.swift
├── Models/
│   ├── Ingredient.swift
│   └── Recipe.swift
├── Views/
│   ├── HomeView.swift
│   ├── RecipeListView.swift
│   └── RecipeDetailView.swift
├── ViewModels/
│   ├── ImageAnalyzerViewModel.swift
│   └── RecipeViewModel.swift
├── Services/
│   ├── ImageAnalysisService.swift
│   └── RecipeService.swift
└── Utilities/
    ├── ImageProcessor.swift
    └── Extensions.swift
```

## ⚙️ Adım 3: Proje Ayarlarını Yapılandırma

### 3.1 Ana Uygulama Dosyasını Değiştirme
1. Xcode'da `YemekProjesiApp.swift` dosyasını bulun
2. İçeriğini `YemekApp.swift` ile değiştirin veya dosyayı silin
3. `YemekApp.swift` dosyasının `@main` attribute'una sahip olduğundan emin olun

### 3.2 Info.plist Ayarları
1. **Info.plist** dosyasını bulun (veya **Target Settings > Info** sekmesi)
2. Şu izinleri ekleyin:

**Info.plist'e ekle:**
```xml
<key>NSCameraUsageDescription</key>
<string>Yemek malzemelerini analiz etmek için kameraya erişim gerekiyor.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Fotoğraf seçmek için galeri erişimi gerekiyor.</string>
```

**Veya Target Settings'te:**
1. Proje ayarlarında **Info** sekmesine gidin
2. **Custom iOS Target Properties** bölümüne şu anahtarları ekleyin:
   - `Privacy - Camera Usage Description`: "Yemek malzemelerini analiz etmek için kameraya erişim gerekiyor."
   - `Privacy - Photo Library Usage Description`: "Fotoğraf seçmek için galeri erişimi gerekiyor."

### 3.3 Minimum iOS Versiyonu
1. **Target Settings > General** sekmesine gidin
2. **Deployment Info** bölümünde **iOS** versiyonunu **16.0** olarak ayarlayın

## 🔧 Adım 4: Build Ayarları

### 4.1 Swift Version
1. **Target Settings > Build Settings** sekmesine gidin
2. **Swift Language Version**'ı **Swift 5** olarak ayarlayın

### 4.2 Framework'ler
Aşağıdaki framework'ler otomatik olarak eklenmiş olmalı:
- SwiftUI
- PhotosUI
- Vision
- AVFoundation

Kontrol etmek için:
1. **Target Settings > General > Frameworks, Libraries, and Embedded Content**
2. Eğer eksikse, **+** butonuna tıklayıp ekleyin

## 🧪 Adım 5: Projeyi Test Etme

### 5.1 Build Etme
1. **Product > Build** seçin (veya `Cmd + B`)
2. Hata varsa düzeltin

### 5.2 Simulator'da Çalıştırma
1. Üst menüden bir simulator seçin (örn: iPhone 15)
2. **Product > Run** seçin (veya `Cmd + R`)
3. Uygulama simulator'da açılmalı

### 5.3 Gerçek Cihazda Test (Opsiyonel)
1. iPhone'unuzu Mac'e bağlayın
2. Üst menüden cihazınızı seçin
3. **Signing & Capabilities** sekmesinde geliştirici hesabınızı seçin
4. **Product > Run** seçin

## 🐛 Olası Hatalar ve Çözümleri

### Hata: "Cannot find 'RecipeService' in scope"
**Çözüm**: Dosyaların doğru şekilde projeye eklendiğinden emin olun. Build Settings'te **Swift Compiler - Search Paths** kontrol edin.

### Hata: "PhotosPicker is unavailable"
**Çözüm**: Minimum iOS versiyonunun 16.0 olduğundan emin olun.

### Hata: "Vision framework not found"
**Çözüm**: Framework'lerin projeye eklendiğinden emin olun.

### Hata: "Missing Info.plist keys"
**Çözüm**: Kamera ve galeri izinlerini Info.plist'e eklediğinizden emin olun.

## 📱 Adım 6: İlk Kullanım

1. Uygulamayı açın
2. **Fotoğraf Seç** butonuna tıklayın
3. Galeriden bir fotoğraf seçin (veya kamera ile çekin)
4. Uygulama malzemeleri analiz edecek
5. Tespit edilen malzemelerle eşleşen tarifler listelenecek
6. Bir tarife tıklayarak detaylı bilgileri görüntüleyin

## 🎨 Özelleştirme

### Yeni Tarifler Ekleme
`RecipeService.swift` dosyasındaki `defaultRecipes()` metoduna yeni tarifler ekleyebilirsiniz.

### Yeni Malzemeler Ekleme
`RecipeService.swift` dosyasındaki `defaultIngredients()` metoduna yeni malzemeler ekleyebilirsiniz.

### UI Renklerini Değiştirme
`Extensions.swift` dosyasındaki `Color` extension'ında renkleri değiştirebilirsiniz.

## 📚 Sonraki Adımlar

1. **Cloud API Entegrasyonu**: Daha iyi malzeme tanıma için OpenAI GPT-4 Vision veya Google Cloud Vision API ekleyin
2. **Core ML Modeli**: Özel eğitilmiş bir model ekleyin
3. **Veritabanı**: Firebase veya Core Data ile tarif veritabanı oluşturun
4. **Favoriler**: UserDefaults veya Core Data ile favoriler özelliğini kalıcı hale getirin

## ✅ Kontrol Listesi

- [ ] Xcode projesi oluşturuldu
- [ ] Tüm dosyalar projeye eklendi
- [ ] Info.plist izinleri eklendi
- [ ] Minimum iOS versiyonu 16.0 olarak ayarlandı
- [ ] Proje başarıyla build edildi
- [ ] Simulator'da çalıştırıldı
- [ ] Fotoğraf seçme özelliği çalışıyor
- [ ] Malzeme analizi çalışıyor
- [ ] Tarif listesi görüntüleniyor

---

**Başarılar! 🎉**

