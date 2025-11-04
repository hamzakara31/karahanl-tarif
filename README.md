# 🍳 Karahanlı Tarif

Fotoğraflardaki malzemeleri analiz ederek tarif öneren web uygulaması.

## ✨ Özellikler

- 📸 **Çoklu Fotoğraf Yükleme**: Birden fazla fotoğraf yükleyebilirsiniz
- 🤖 **AI Destekli Analiz**: Google Gemini veya OpenAI GPT-4 Vision ile malzeme analizi
- 📊 **Beslenme Takibi**: Günlük kalori, protein, karbonhidrat, yağ takibi
- ❤️ **Favoriler**: Beğendiğiniz tarifleri favorilere ekleyin
- 🌙 **Dark Mode**: Açık/koyu tema desteği
- 📱 **PWA**: Ana ekrana eklenebilir, uygulama gibi kullanılabilir
- 🔍 **Arama ve Filtreleme**: Tarifleri kategorilere, zorluk seviyesine göre filtreleyin
- ✅ **Yaptım Sistemi**: Yaptığınız tarifleri işaretleyin, günlük kalori takibi yapın

## 🚀 Hızlı Başlangıç

### Yerel Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcıda açın
http://localhost:3000
```

### Production Build

```bash
# Production build oluşturun
npm run build

# Production sunucusunu başlatın
npm start
```

## 📱 Mobil Kullanım

1. **iPhone'unuzda** Safari ile uygulamayı açın
2. **Paylaş** butonuna (⬆️) dokunun
3. **"Ana Ekrana Ekle"** seçeneğini seçin
4. Uygulama ana ekranınıza eklenecek!

## 🔑 API Anahtarları

Uygulama ilk açılışta API anahtarı isteyecektir:

- **Google Gemini API Key**: https://makersuite.google.com/app/apikey
- **OpenAI API Key**: https://platform.openai.com/api-keys

API anahtarınız localStorage'da saklanır ve yalnızca tarayıcınızda kalır.

## 🛠️ Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Tesseract.js** - OCR (opsiyonel)
- **Google Gemini API** - AI görüntü analizi
- **OpenAI GPT-4 Vision** - AI görüntü analizi (alternatif)
- **PWA** - Progressive Web App

## 📦 Yayınlama

Detaylı yayınlama rehberi için `DEPLOY_REHBERI.md` dosyasına bakın.

### Hızlı Deploy (Vercel)

1. GitHub'a yükleyin
2. https://vercel.com adresine gidin
3. Repository'nizi import edin
4. Deploy edin!

## 📄 Lisans

Bu proje kişisel kullanım içindir.

---

**Not**: Bu uygulama AI API'leri kullanır. API anahtarlarınızı güvende tutun!
