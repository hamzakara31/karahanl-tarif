# 📦 GitHub'a Yükleme Rehberi

Uygulamanızı GitHub'a yüklemek için aşağıdaki adımları izleyin.

## 🔧 Adım Adım

### 1. GitHub Hesabı Oluşturun

1. https://github.com adresine gidin
2. "Sign up" ile yeni hesap oluşturun
3. Email'inizi doğrulayın

### 2. Yeni Repository Oluşturun

1. GitHub'da sağ üstte **"+"** > **"New repository"** tıklayın
2. Repository adı: `karahanli-tarif` (veya istediğiniz isim)
3. **Public** veya **Private** seçin
4. **"Initialize this repository with a README"** kutusunu **işaretlemeyin**
5. **"Create repository"** tıklayın

### 3. Projeyi GitHub'a Yükleyin

**Terminalde (PowerShell veya CMD) proje klasöründe:**

```powershell
# 1. Git'i başlatın (eğer başlatılmadıysa)
git init

# 2. Tüm dosyaları ekleyin
git add .

# 3. İlk commit yapın
git commit -m "Initial commit - Karahanlı Tarif"

# 4. Ana branch'i ayarlayın
git branch -M main

# 5. GitHub repository'nizi ekleyin (URL'yi kendi repository'nizle değiştirin)
git remote add origin https://github.com/KULLANICI_ADI/karahanli-tarif.git

# 6. GitHub'a yükleyin
git push -u origin main
```

**Not:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın.

### 4. Vercel'e Deploy Edin

1. **https://vercel.com** adresine gidin
2. **"Sign Up"** ile kaydolun (GitHub ile giriş yapabilirsiniz)
3. **"Add New Project"** tıklayın
4. GitHub repository'nizi seçin
5. Framework Preset: **Next.js** (otomatik algılanır)
6. **"Deploy"** butonuna tıklayın
7. **2-3 dakika** içinde hazır!

### 5. Sonuç

- Uygulamanız `https://karahanli-tarif.vercel.app` gibi bir URL'de yayınlanır
- Her `git push` sonrası otomatik güncellenir
- **Ücretsiz** ve **HTTPS** otomatik verilir

## 📝 Güncelleme

Projeyi güncelledikten sonra:

```powershell
git add .
git commit -m "Yeni özellikler eklendi"
git push
```

Vercel otomatik olarak yeni versiyonu deploy eder!

## ✅ Kontrol Listesi

- [ ] GitHub hesabı oluşturuldu
- [ ] Repository oluşturuldu
- [ ] Proje GitHub'a yüklendi
- [ ] Vercel hesabı oluşturuldu
- [ ] Vercel'e deploy edildi
- [ ] URL çalışıyor

## 🎉 Başarılı!

Artık uygulamanız internette yayında! 🚀

---

**Sorun mu var?** `DEPLOY_REHBERI.md` dosyasına bakın.

