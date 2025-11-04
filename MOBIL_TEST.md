# 📱 Telefondan Test Etme Rehberi

iPhone'unuzdan uygulamayı test etmek için aşağıdaki adımları izleyin:

## 🔧 Gereksinimler

1. **Bilgisayarınız** uygulamayı çalıştırıyor olmalı (`npm run dev`)
2. **Telefon ve bilgisayar** aynı Wi-Fi ağında olmalı
3. **Bilgisayarınızın IP adresini** bilmelisiniz

## 📋 Adım Adım

### 1. Bilgisayarınızın IP Adresini Bulun

#### Windows:
1. **PowerShell** veya **CMD** açın
2. Şu komutu çalıştırın:
   ```
   ipconfig
   ```
3. **IPv4 Address** değerini bulun (örn: `192.168.1.100`)

#### Mac/Linux:
1. **Terminal** açın
2. Şu komutu çalıştırın:
   ```
   ifconfig
   ```
   veya
   ```
   ip addr
   ```
3. **inet** veya **inet addr** değerini bulun

### 2. Uygulamayı Çalıştırın

Bilgisayarınızda terminalde:
```bash
npm run dev
```

Uygulama genellikle `http://localhost:3000` adresinde çalışır.

### 3. Firewall Ayarlarını Kontrol Edin

Windows Firewall'un port 3000'i engellemediğinden emin olun:

1. **Windows Defender Firewall** açın
2. **Gelişmiş Ayarlar** > **Gelen Kuralları**
3. Port 3000 için bir kural oluşturun (veya geçici olarak devre dışı bırakın)

### 4. Telefondan Bağlanın

1. **Safari** veya **Chrome** açın
2. Adres çubuğuna şunu yazın:
   ```
   http://[BILGISAYARIN_IP_ADRESI]:3000
   ```
   
   Örnek:
   ```
   http://192.168.1.100:3000
   ```

3. **Enter** tuşuna basın
4. Uygulama açılmalı!

### 5. Ana Ekrana Ekle

1. Safari'de **Paylaş** butonuna (⬆️) dokunun
2. **"Ana Ekrana Ekle"** seçeneğini seçin
3. İstediğiniz ismi girin
4. **"Ekle"** butonuna dokunun

## 🚨 Sorun Giderme

### "Bu siteye erişilemiyor" hatası

**Çözüm:**
- Bilgisayar ve telefon aynı Wi-Fi ağında mı? ✅
- Firewall port 3000'i engelliyor mu? 🔍
- IP adresi doğru mu? ✅
- `npm run dev` çalışıyor mu? ✅

### "Bağlantı zaman aşımına uğradı"

**Çözüm:**
1. Bilgisayarınızın IP adresini tekrar kontrol edin
2. Firewall ayarlarını kontrol edin
3. Router'ın "Client Isolation" özelliğini kapatın (eğer varsa)

### Port 3000 çalışmıyor

**Çözüm:**
Farklı bir port kullanın:
```bash
npm run dev -- -p 3001
```

Sonra telefonunuzda:
```
http://[IP_ADRESI]:3001
```

## 💡 İpucu: Kolay Erişim

IP adresinizi değiştirmemek için:
1. **Router ayarlarınızdan** bilgisayarınıza **statik IP** atayın
2. Veya **ngrok** gibi bir servis kullanın (internet üzerinden erişim için)

## 📱 Test Etme

Ana ekrana ekledikten sonra:
1. Ana ekrandaki uygulama ikonuna dokunun
2. Uygulama tam ekran açılmalı
3. Tüm özellikleri test edin:
   - Fotoğraf yükleme
   - Tarif arama
   - Favoriler
   - Dark mode
   - Günlük kalori takibi

## ✅ Başarılı!

Artık iPhone'unuzda uygulamayı kullanabilirsiniz! 🎉

