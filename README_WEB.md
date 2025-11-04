# 🍳 Yemek Tarifi Web Uygulaması

Windows'ta geliştirilebilen, kullanıcının yüklediği fotoğraflardaki malzemeleri analiz ederek, o malzemelerle yapılabilecek basit ve kolay yemek/tatlı tarifleri öneren modern web uygulaması.

## ✨ Özellikler

- 📸 **Fotoğraf Yükleme**: Sürükle-bırak veya dosya seçme ile fotoğraf yükleme
- 🔍 **Görüntü Analizi**: Tesseract.js ile metin tanıma (OCR) ve malzeme tespiti
- 📝 **Akıllı Eşleştirme**: Tespit edilen malzemelerle eşleşen tarifleri bulma
- 🎨 **Modern UI**: Tailwind CSS ile tasarlanmış, responsive ve kullanıcı dostu arayüz
- 📖 **Detaylı Tarifler**: Adım adım yapılış, malzeme listesi ve hazırlık bilgileri
- ⚡ **Hızlı**: Next.js ile optimize edilmiş performans

## 🛠️ Teknolojiler

- **Next.js 14**: React framework (App Router)
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Modern CSS framework
- **Tesseract.js**: OCR (Optical Character Recognition) - metin tanıma
- **Lucide React**: Modern ikonlar

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

veya

```bash
yarn install
```

### 2. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

veya

```bash
yarn dev
```

### 3. Tarayıcıda Açın

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📱 Kullanım

1. **Ana Sayfa**: Uygulamayı açın
2. **Fotoğraf Yükle**: Sürükle-bırak veya "Dosya Seç" butonuna tıklayarak bir fotoğraf yükleyin
3. **Analiz Et**: "Analiz Et" butonuna tıklayın
4. **Malzemeleri Gör**: Tespit edilen malzemeler ekranda görünecek
5. **Tarifleri İncele**: Eşleşen tarifler listelenecek
6. **Tarif Detayı**: Bir tarife tıklayarak detaylı bilgileri görüntüleyin

## 🏗️ Proje Yapısı

```
yemek-projesi/
├── app/
│   ├── layout.tsx          # Ana layout
│   ├── page.tsx            # Ana sayfa
│   ├── globals.css         # Global stiller
│   └── recipe/
│       └── [id]/
│           └── page.tsx    # Tarif detay sayfası
├── components/
│   ├── ImageUpload.tsx     # Fotoğraf yükleme bileşeni
│   ├── DetectedIngredients.tsx  # Tespit edilen malzemeler
│   ├── RecipeCard.tsx      # Tarif kartı
│   └── RecipeList.tsx      # Tarif listesi
├── lib/
│   └── services/
│       ├── imageAnalysisService.ts  # Görüntü analizi servisi
│       └── recipeService.ts          # Tarif servisi
├── types/
│   └── models.ts           # TypeScript modelleri
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.js
```

## 🔧 Geliştirme

### Yeni Tarif Ekleme

`lib/services/recipeService.ts` dosyasındaki `loadRecipes()` metoduna yeni tarifler ekleyebilirsiniz.

### Yeni Malzeme Ekleme

`lib/services/recipeService.ts` dosyasındaki `loadIngredients()` metoduna yeni malzemeler ekleyebilirsiniz.

### Görüntü Analizi İyileştirme

`lib/services/imageAnalysisService.ts` dosyasında görüntü analizi algoritmasını geliştirebilirsiniz. Daha gelişmiş sonuçlar için:

- **Google Cloud Vision API**: Daha iyi OCR ve görüntü analizi
- **OpenAI GPT-4 Vision API**: Gelişmiş görüntü anlama
- **Clarifai Food API**: Özel yemek tanıma API'si

## 📦 Build ve Deployment

### Production Build

```bash
npm run build
```

### Production Sunucusunu Başlatma

```bash
npm start
```

### Deployment

#### Vercel (Önerilen)

```bash
npm i -g vercel
vercel
```

#### Netlify

Netlify dashboard'dan projeyi bağlayın veya Netlify CLI kullanın.

#### Diğer Platformlar

- **Railway**: Otomatik deployment
- **Render**: Kolay kurulum
- **AWS Amplify**: Enterprise çözüm

## 🎨 Özelleştirme

### Renkleri Değiştirme

`tailwind.config.js` dosyasındaki renkleri değiştirebilirsiniz:

```javascript
colors: {
  primary: {
    DEFAULT: '#FF9800', // Ana renk
    light: '#FFB74D',
    dark: '#F57C00',
  },
}
```

### Stil Değişiklikleri

`app/globals.css` dosyasında global stilleri değiştirebilirsiniz.

## 🐛 Bilinen Sorunlar

1. **Tesseract.js İlk Yükleme**: İlk analiz biraz uzun sürebilir (model yükleme)
2. **Büyük Görüntüler**: Çok büyük görüntüler analiz için optimize edilmeli
3. **Türkçe Karakter Tanıma**: Tesseract.js Türkçe desteği sınırlı olabilir

## 🔮 Gelecek Özellikler

- [ ] Cloud API entegrasyonu (daha iyi malzeme tanıma)
- [ ] Kullanıcı hesapları ve favoriler
- [ ] Tarif arama ve filtreleme
- [ ] Tarif paylaşma özelliği
- [ ] Beslenme bilgileri
- [ ] Video tarifleri
- [ ] Çoklu dil desteği
- [ ] Offline mod desteği (PWA)

## 📝 Notlar

- **Tesseract.js**: İlk analiz biraz uzun sürebilir çünkü OCR modeli yüklenir
- **Tarayıcı Desteği**: Modern tarayıcılar gereklidir (Chrome, Firefox, Safari, Edge)
- **Görüntü Formatları**: PNG, JPG, GIF formatları desteklenir

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Bu proje Windows'ta iOS uygulaması geliştiremeyenler için web alternatifi olarak oluşturulmuştur.

---

**Başarılar! 🎉**

