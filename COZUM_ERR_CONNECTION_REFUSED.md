# 🔧 ERR_CONNECTION_REFUSED Hatası Çözümü

## ❌ Sorun
"ERR_CONNECTION_REFUSED" hatası alıyorsunuz. Bu, sunucunun çalışmadığı veya bağlantıyı reddettiği anlamına gelir.

## ✅ Çözüm Adımları

### 1. Sunucuyu Yeniden Başlatın

Terminal'de şu adımları takip edin:

1. **Sunucuyu Durdurun**:
   - Terminal'de `Ctrl + C` tuşlarına basın
   - Veya terminal penceresini kapatıp yeniden açın

2. **Yeni Terminal Açın**:
   - Yeni bir terminal/PowerShell penceresi açın
   - Proje klasörüne gidin:
   ```bash
   cd "C:\Users\hamza\Desktop\yemek projesi"
   ```

3. **Sunucuyu Başlatın**:
   ```bash
   npm run dev
   ```

4. **"Ready" Mesajını Bekleyin**:
   Terminal'de şu mesajı görmelisiniz:
   ```
   ▲ Next.js 14.2.33
   - Local:        http://localhost:3000
   ✓ Ready in X.Xs
   ```

### 2. URL'yi Kontrol Edin

Tarayıcıda **tam olarak** şu adresi açın:
```
http://localhost:3000
```

**ÖNEMLİ**: 
- ✅ `http://` ile başlamalı
- ❌ `https://` değil
- ❌ `localhost:3000` değil (http:// eksik)

### 3. Farklı Port Deneyin

Eğer port 3000 çalışmıyorsa, farklı bir port deneyin:

```bash
npm run dev -- -p 3001
```

Sonra tarayıcıda `http://localhost:3001` açın.

### 4. Port Kullanımını Kontrol Edin

Port 3000 başka bir uygulama tarafından kullanılıyor olabilir.

**Kontrol edin**:
```bash
netstat -ano | findstr :3000
```

Eğer bir sonuç görürseniz, o portu kullanan uygulamayı kapatın.

### 5. Firewall Kontrolü

Windows Firewall engelliyor olabilir:

1. **Windows Defender Firewall** açın
2. **Gelen Kuralları** kontrol edin
3. Node.js için izin verin
4. Veya geçici olarak firewall'u kapatın (test için)

### 6. Antivirus Kontrolü

Antivirus yazılımı engelliyor olabilir:

1. Antivirus ayarlarına gidin
2. Node.js için izin verin
3. Veya geçici olarak kapatın (test için)

## 🚀 Hızlı Test

### Adım 1: Terminal'de Kontrol
Terminal'de şu komutu çalıştırın ve çıktıyı kontrol edin:

```bash
npm run dev
```

**Beklenen çıktı**:
```
> yemek-projesi@1.0.0 dev
> next dev

   ▲ Next.js 14.2.33
   - Local:        http://localhost:3000
   - ready started server on 0.0.0.0:3000
   ✓ Starting...
   ✓ Ready in 2.2s
```

### Adım 2: Tarayıcıda Açın
Terminal'de "Ready" mesajını gördükten sonra:

1. Tarayıcıyı açın
2. Adres çubuğuna şunu yazın: `http://localhost:3000`
3. Enter'a basın

### Adım 3: Hala Çalışmıyorsa
Eğer hala "ERR_CONNECTION_REFUSED" hatası alıyorsanız:

1. **Terminal'deki tam çıktıyı** paylaşın
2. **Tarayıcı konsolundaki hataları** paylaşın (F12 > Console)
3. **Port 3000'in kullanımda olup olmadığını** kontrol edin

## 📋 Kontrol Listesi

- [ ] Terminal'de `npm run dev` çalıştırıldı
- [ ] "Ready" mesajı görüldü
- [ ] Tarayıcıda `http://localhost:3000` açıldı (http:// ile)
- [ ] Port 3000 boş
- [ ] Firewall izin veriyor
- [ ] Antivirus engellemiyor

## 💡 İpuçları

1. **Terminal penceresini açık tutun**: Sunucu çalışırken terminal kapanmamalı
2. **Hard refresh**: Ctrl + F5 ile sayfayı yenileyin
3. **Farklı tarayıcı**: Chrome, Firefox, Edge deneyin
4. **Incognito mod**: Tarayıcı cache sorunu olabilir

---

**Terminal'deki tam çıktıyı paylaşırsanız daha spesifik yardım edebilirim!** 🚀

