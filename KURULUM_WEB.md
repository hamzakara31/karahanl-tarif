# 🚀 Web Uygulaması Kurulum Kılavuzu

Windows'ta web uygulamasını çalıştırmak için adım adım talimatlar.

## 📋 Ön Gereksinimler

### 1. Node.js Kurulumu

1. **Node.js İndir**: [https://nodejs.org/](https://nodejs.org/) adresinden Node.js LTS versiyonunu indirin
2. **Kurulum**: İndirdiğiniz `.msi` dosyasını çalıştırın ve kurulum sihirbazını takip edin
3. **Doğrulama**: Terminal/PowerShell'de şu komutu çalıştırın:

```bash
node --version
```

Çıktı `v18.x.x` veya üzeri olmalı.

```bash
npm --version
```

Çıktı `9.x.x` veya üzeri olmalı.

## 🚀 Adım 1: Projeyi Hazırlama

### 1.1 Proje Klasörüne Gidin

```bash
cd "C:\Users\hamza\Desktop\yemek projesi"
```

### 1.2 Bağımlılıkları Yükleyin

```bash
npm install
```

Bu komut tüm gerekli paketleri yükleyecektir. İlk yükleme birkaç dakika sürebilir.

## 🎯 Adım 2: Geliştirme Sunucusunu Başlatma

### 2.1 Sunucuyu Başlatın

```bash
npm run dev
```

### 2.2 Tarayıcıda Açın

Terminal'de şu mesajı göreceksiniz:

```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## ✅ Test Etme

### 1. Ana Sayfayı Kontrol Edin
- Uygulama açıldığında "Yemek Tarifi" başlığını görmelisiniz
- "Fotoğraf Seç veya Sürükle-Bırak" alanını görmelisiniz

### 2. Fotoğraf Yükleme Testi
1. Bir fotoğraf seçin (malzeme listesi içeren bir görüntü)
2. "Analiz Et" butonuna tıklayın
3. Tespit edilen malzemeler görünecek
4. Eşleşen tarifler listelenecek

### 3. Tarif Detayı Testi
1. Bir tarife tıklayın
2. Detay sayfasında malzemeler ve yapılış adımları görünmeli

## 🐛 Olası Hatalar ve Çözümleri

### Hata: "npm: command not found"
**Çözüm**: Node.js'in düzgün kurulduğundan emin olun. Terminal'i yeniden başlatın.

### Hata: "EACCES: permission denied"
**Çözüm**: Terminal'i yönetici olarak çalıştırın veya farklı bir klasörde çalıştırın.

### Hata: "Module not found"
**Çözüm**: 
```bash
rm -rf node_modules
npm install
```

### Hata: "Port 3000 already in use"
**Çözüm**: Farklı bir port kullanın:
```bash
npm run dev -- -p 3001
```

### Hata: "Tesseract.js yüklenemedi"
**Çözüm**: İnternet bağlantınızı kontrol edin. Tesseract.js ilk kullanımda model dosyalarını indirir.

## 📦 Production Build (İsteğe Bağlı)

### Build Oluşturma

```bash
npm run build
```

### Production Sunucusunu Başlatma

```bash
npm start
```

## 🌐 Deployment (İsteğe Bağlı)

### Vercel'e Deploy Etme

1. **Vercel Hesabı Oluşturun**: [https://vercel.com](https://vercel.com)

2. **Vercel CLI Kurulumu**:
```bash
npm i -g vercel
```

3. **Deploy Etme**:
```bash
vercel
```

4. **Talimatları Takip Edin**: Vercel size adım adım rehberlik edecek

### Netlify'e Deploy Etme

1. **Netlify Hesabı Oluşturun**: [https://netlify.com](https://netlify.com)

2. **Netlify CLI Kurulumu**:
```bash
npm i -g netlify-cli
```

3. **Build ve Deploy**:
```bash
npm run build
netlify deploy --prod
```

## 💡 İpuçları

### Geliştirme Modunda Hot Reload

Dosyaları değiştirdiğinizde sayfa otomatik olarak yenilenecektir. Terminal'i açık tutun.

### Tarayıcı Konsolunu Kullanma

Tarayıcıda F12 tuşuna basarak geliştirici konsolunu açabilirsiniz. Hataları ve logları burada görebilirsiniz.

### Performance İzleme

Next.js otomatik olarak performans metriklerini gösterir. Terminal'de `○` (Static) ve `λ` (Dynamic) işaretlerini göreceksiniz.

## 📚 Sonraki Adımlar

1. **Yeni Tarifler Ekle**: `lib/services/recipeService.ts` dosyasına yeni tarifler ekleyin
2. **Yeni Malzemeler Ekle**: Aynı dosyada malzeme listesini genişletin
3. **UI İyileştirmeleri**: `components/` klasöründeki bileşenleri özelleştirin
4. **API Entegrasyonu**: Cloud API'ler ekleyerek görüntü analizini iyileştirin

## ✅ Kontrol Listesi

- [ ] Node.js kuruldu
- [ ] npm install çalıştırıldı
- [ ] npm run dev başarıyla çalıştı
- [ ] Tarayıcıda uygulama açıldı
- [ ] Fotoğraf yükleme çalışıyor
- [ ] Analiz çalışıyor
- [ ] Tarifler görüntüleniyor
- [ ] Tarif detay sayfası çalışıyor

---

**Başarılar! 🎉 Uygulamanız çalışıyor olmalı!**

