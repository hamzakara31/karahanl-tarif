# 🚀 Hızlı Deploy Rehberi

Uygulamanızı internete yayınlamak için en kolay yol: **Vercel**

## 📋 Adım Adım (5 Dakika)

### 1. GitHub'a Yükleyin

```bash
# Terminalde proje klasöründe:
git init
git add .
git commit -m "Initial commit"
```

**GitHub'da:**
1. https://github.com adresine gidin
2. Yeni repository oluşturun (örnek: `karahanli-tarif`)
3. Repository URL'ini kopyalayın
4. Terminalde:

```bash
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/karahanli-tarif.git
git push -u origin main
```

### 2. Vercel'e Deploy Edin

1. **https://vercel.com** adresine gidin
2. **"Sign Up"** ile kaydolun (GitHub ile giriş yapabilirsiniz)
3. **"Add New Project"** tıklayın
4. **GitHub repository'nizi** seçin
5. **"Deploy"** butonuna tıklayın
6. **2-3 dakika** içinde hazır!

### 3. Sonuç

- Uygulamanız `https://karahanli-tarif.vercel.app` gibi bir URL'de yayınlanır
- Her `git push` sonrası otomatik güncellenir
- **Ücretsiz** ve **SSL sertifikası** otomatik verilir

## 📱 Mobilde Kullanım

1. iPhone'unuzda URL'yi açın
2. Safari'de **Paylaş** butonuna dokunun
3. **"Ana Ekrana Ekle"** seçin
4. Artık her yerden erişebilirsiniz!

## ✅ Önemli Notlar

- **API Anahtarları**: Kullanıcılar ilk açılışta API anahtarlarını girecek (localStorage'da saklanır)
- **Environment Variables**: Gerekmez! (API anahtarları kullanıcı tarafından giriliyor)
- **Ücretsiz**: Vercel ücretsiz tier yeterli
- **Otomatik Güncelleme**: Her `git push` sonrası otomatik deploy

## 🎉 Başarılı!

Artık uygulamanız internette yayında! 🚀

---

**Sorun mu var?** `DEPLOY_REHBERI.md` dosyasına bakın.

