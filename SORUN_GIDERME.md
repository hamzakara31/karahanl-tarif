# 🔧 Sorun Giderme Kılavuzu

## ❌ Tarayıcıda Açılmıyor

### Adım 1: Terminal/PowerShell'de Kontrol

Terminal'de şu komutu çalıştırın:

```bash
npm run dev
```

**Beklenen çıktı:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

### 🔍 Olası Sorunlar ve Çözümleri

#### Sorun 1: "npm: command not found"
**Hata**: `'npm' is not recognized as an internal or external command`

**Çözüm**: 
1. Node.js kurulu değil. [nodejs.org](https://nodejs.org/) adresinden indirin ve kurun
2. Terminal'i kapatıp yeniden açın
3. Şu komutu çalıştırın:
```bash
node --version
npm --version
```

#### Sorun 2: "Cannot find module"
**Hata**: `Error: Cannot find module '...'`

**Çözüm**: Bağımlılıklar yüklenmemiş. Şu komutu çalıştırın:
```bash
npm install
```

#### Sorun 3: "Port 3000 already in use"
**Hata**: `Error: listen EADDRINUSE: address already in use :::3000`

**Çözüm**: Port 3000 başka bir uygulama tarafından kullanılıyor.

**Seçenek A**: Farklı port kullanın:
```bash
npm run dev -- -p 3001
```
Sonra tarayıcıda [http://localhost:3001](http://localhost:3001) açın.

**Seçenek B**: Port 3000'i kullanan uygulamayı kapatın:
```bash
# Windows'ta
netstat -ano | findstr :3000
taskkill /PID <PID_NUMARASI> /F
```

#### Sorun 4: "Missing dependencies"
**Hata**: `Module not found` veya `Cannot find module`

**Çözüm**: 
1. `node_modules` klasörünü silin
2. `package-lock.json` dosyasını silin (varsa)
3. Yeniden yükleyin:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

#### Sorun 5: "TypeScript errors"
**Hata**: TypeScript hataları

**Çözüm**: Önce build edin:
```bash
npm run build
```

Eğer hata devam ederse, `tsconfig.json` dosyasını kontrol edin.

#### Sorun 6: "Tailwind CSS not working"
**Hata**: Stiller yüklenmiyor

**Çözüm**: 
1. `postcss.config.js` dosyasının var olduğundan emin olun
2. `tailwind.config.js` dosyasını kontrol edin
3. Yeniden başlatın:
```bash
npm run dev
```

## 🚀 Adım Adım Yeniden Kurulum

Eğer hiçbir şey çalışmıyorsa, şu adımları takip edin:

### 1. Proje Klasörüne Gidin

```bash
cd "C:\Users\hamza\Desktop\yemek projesi"
```

### 2. Node Modules'ı Temizleyin

```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json -ErrorAction SilentlyContinue
```

### 3. Bağımlılıkları Yükleyin

```bash
npm install
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

### 5. Tarayıcıda Açın

Terminal'de şu mesajı görmelisiniz:
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
```

Tarayıcınızda **http://localhost:3000** adresini açın.

## 🔍 Hata Mesajı Paylaşın

Eğer hala çalışmıyorsa, terminal'deki **tam hata mesajını** paylaşın. Böylece daha spesifik yardım edebiliriz.

## ✅ Kontrol Listesi

- [ ] Node.js kurulu (`node --version` çalışıyor)
- [ ] npm kurulu (`npm --version` çalışıyor)
- [ ] Proje klasörüne gidildi
- [ ] `npm install` çalıştırıldı (hata yok)
- [ ] `npm run dev` çalıştırıldı
- [ ] Terminal'de "ready started server" mesajı görünüyor
- [ ] Tarayıcıda http://localhost:3000 açıldı

---

**Hata mesajını paylaşırsanız daha spesifik yardım edebilirim!** 🚀

