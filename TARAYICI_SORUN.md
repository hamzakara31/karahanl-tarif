# 🌐 Tarayıcı Sorun Giderme

Sunucu çalışıyor ama tarayıcıda açılmıyor. Şu adımları takip edin:

## 🔍 Adım 1: Tarayıcıda Ne Görüyorsunuz?

### A) "This site can't be reached" veya "Bağlanılamıyor"
**Çözüm**: URL'yi kontrol edin:
- ✅ Doğru: `http://localhost:3000`
- ❌ Yanlış: `https://localhost:3000` (https değil http olmalı)
- ❌ Yanlış: `localhost:3000` (http:// ekleyin)

### B) Boş/Beyaz Sayfa
**Çözüm**: Tarayıcı konsolunu açın (F12) ve hataları kontrol edin.

### C) "ERR_CONNECTION_REFUSED"
**Çözüm**: Sunucu çalışmıyor olabilir. Terminal'de `npm run dev` çalıştırın.

### D) Sayfa yükleniyor ama içerik görünmüyor
**Çözüm**: Tarayıcı konsolunda JavaScript hataları olabilir.

## 🔧 Adım 2: Tarayıcı Konsolunu Kontrol Edin

1. **F12** tuşuna basın (veya sağ tık > "İncele/Inspect")
2. **Console** sekmesine gidin
3. **Kırmızı hataları** kontrol edin
4. Hata mesajlarını paylaşın

## 🔄 Adım 3: Tarayıcıyı Yenileyin

1. **Ctrl + F5** (Hard refresh)
2. Veya **Ctrl + Shift + R**

## 🌐 Adım 4: Farklı Tarayıcı Deneyin

- **Chrome** deneyin
- **Firefox** deneyin
- **Edge** deneyin

## 🔍 Adım 5: URL'yi Kontrol Edin

Terminal'de şu mesajı görmelisiniz:
```
- Local:        http://localhost:3000
```

Tarayıcıda **tam olarak** şu adresi açın:
```
http://localhost:3000
```

**NOT**: `https://` değil, `http://` olmalı!

## 🚫 Adım 6: Firewall/Antivirus Kontrolü

Windows Firewall veya antivirus yazılımı engelliyor olabilir.

### Firewall'u Geçici Olarak Kontrol Edin:
1. Windows Defender Firewall'u geçici olarak kapatın
2. Tekrar deneyin
3. Çalışırsa, firewall'a izin verin

## 🔄 Adım 7: Sunucuyu Yeniden Başlatın

1. Terminal'de **Ctrl + C** ile sunucuyu durdurun
2. Tekrar başlatın:
```bash
npm run dev
```

## 🧪 Adım 8: Basit Test Sayfası

Eğer hala çalışmıyorsa, şu basit test sayfasını deneyelim:

1. `app/page.tsx` dosyasını geçici olarak şununla değiştirin:
```tsx
export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Test Sayfası</h1>
      <p>Eğer bunu görüyorsanız, Next.js çalışıyor!</p>
    </div>
  );
}
```

2. Tarayıcıyı yenileyin
3. Eğer çalışırsa, sorun ana sayfa kodunda olabilir

## 📋 Kontrol Listesi

- [ ] URL doğru: `http://localhost:3000` (http:// ile)
- [ ] Terminal'de "Ready" mesajı var
- [ ] Tarayıcı konsolunda hata yok
- [ ] Farklı tarayıcı denendi
- [ ] Hard refresh yapıldı (Ctrl + F5)
- [ ] Firewall kontrol edildi
- [ ] Sunucu yeniden başlatıldı

## 💬 Hata Mesajını Paylaşın

Lütfen şunları paylaşın:
1. **Tarayıcıda ne görüyorsunuz?** (ekran görüntüsü ideal)
2. **Tarayıcı konsolundaki hatalar** (F12 > Console)
3. **Terminal'deki son mesajlar**

Böylece daha spesifik yardım edebilirim!

---

**En önemli kontrol**: URL'de `http://` var mı? `https://` değil!

