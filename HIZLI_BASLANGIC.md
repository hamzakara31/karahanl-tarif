# 🚀 Hızlı Başlangıç - Telefondan Test

## 📱 iPhone'unuzdan Test Etme

### Adım 1: Bilgisayarınızda Uygulamayı Çalıştırın

Terminalde şu komutu çalıştırın:
```bash
npm run dev
```

**Not:** Uygulama `http://localhost:3000` adresinde çalışacak.

### Adım 2: Firewall'u Kontrol Edin (İlk Kez)

Windows Firewall port 3000'i engelliyor olabilir. İlk kez kullanıyorsanız:

1. **Windows Defender Firewall** açın
2. **"Gelen bağlantı izni ver"** seçeneğini seçin (Node.js için)
3. Veya geçici olarak **"Güvenlik duvarını kapat"** (test için)

### Adım 3: Telefonunuzdan Bağlanın

1. **iPhone'unuzu** açın
2. **Safari** veya **Chrome** açın
3. Adres çubuğuna şunu yazın:
   ```
   http://192.168.31.244:3000
   ```
4. **"Git"** veya **Enter** tuşuna basın
5. ✅ Uygulama açılmalı!

### Adım 4: Ana Ekrana Ekle

1. Safari'de **Paylaş** butonuna (⬆️) dokunun
2. **"Ana Ekrana Ekle"** seçeneğini seçin
3. İstediğiniz ismi girin (örn: "Karahanlı Tarif")
4. **"Ekle"** butonuna dokunun
5. ✅ Artık ana ekranınızdan açabilirsiniz!

## ⚠️ Önemli Notlar

- **Telefon ve bilgisayar aynı Wi-Fi ağında olmalı**
- **Bilgisayarınızda `npm run dev` çalışıyor olmalı**
- **Firewall port 3000'i engellememeli**

## 🚨 Sorun Mu Var?

### "Bu siteye erişilemiyor" hatası:

1. **Aynı Wi-Fi ağında mısınız?** ✅
2. **Firewall ayarlarını kontrol edin** 🔍
3. **IP adresi doğru mu?** (192.168.31.244)
4. **`npm run dev` çalışıyor mu?** ✅

### Port 3000 çalışmıyorsa:

Farklı bir port kullanın:
```bash
npm run dev -- -p 3001
```

Sonra telefonunuzda:
```
http://192.168.31.244:3001
```

## ✅ Başarılı!

Artık iPhone'unuzda uygulamayı kullanabilirsiniz! 🎉

