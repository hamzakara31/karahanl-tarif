# 📦 GitHub Repository Oluşturma

"Repository not found" hatası alıyorsanız, GitHub'da henüz repository oluşturmadınız demektir.

## 🔧 Adım Adım

### 1. GitHub'da Repository Oluşturun

1. **https://github.com** adresine gidin
2. **Sağ üstte profil fotoğrafınıza** tıklayın
3. **"+"** > **"New repository"** tıklayın
4. **Repository adı:** `karahanli-tarif` (veya istediğiniz isim)
5. **Description:** "Malzeme analizi ile tarif öneren uygulama" (opsiyonel)
6. **Public** veya **Private** seçin (önerilen: Public)
7. **⚠️ ÖNEMLİ:** "Initialize this repository with a README" kutusunu **İŞARETLEMEYİN**
8. **"Create repository"** butonuna tıklayın

### 2. Repository Oluşturduktan Sonra

PowerShell'de şu komutu çalıştırın:

```powershell
git push -u origin main
```

### 3. Authentication (Kimlik Doğrulama)

İlk kez push ederken GitHub kimlik doğrulaması isteyebilir:

#### Seçenek 1: Personal Access Token (Önerilen)

1. **GitHub'da:**
   - Profil fotoğrafınız > **Settings**
   - Sol menüden **Developer settings**
   - **Personal access tokens** > **Tokens (classic)**
   - **"Generate new token (classic)"** tıklayın
   - **Note:** "Karahanlı Tarif" (açıklama)
   - **Expiration:** 90 days (veya istediğiniz süre)
   - **Scopes:** `repo` kutusunu işaretleyin
   - **"Generate token"** tıklayın
   - **Token'ı kopyalayın** (bir daha gösterilmeyecek!)

2. **PowerShell'de push ederken:**
   - Username: `hamzakara31`
   - Password: **Token'ı yapıştırın** (şifre değil!)

#### Seçenek 2: GitHub CLI

```powershell
# GitHub CLI kurulumu (eğer yoksa)
winget install --id GitHub.cli

# Login olun
gh auth login

# Push edin
git push -u origin main
```

### 4. Push Sonrası

Başarılı olursa:
- Repository'de tüm dosyalarınız görünecek
- Vercel'e deploy edebilirsiniz!

## ✅ Kontrol Listesi

- [ ] GitHub'da repository oluşturuldu
- [ ] Repository adı: `karahanli-tarif` (veya seçtiğiniz isim)
- [ ] "Initialize with README" işaretlenmedi
- [ ] PowerShell'de `git push -u origin main` komutu çalıştırıldı
- [ ] Authentication başarılı oldu
- [ ] Dosyalar GitHub'da görünüyor

## 🚨 Sorun Giderme

### "Repository not found"

- GitHub'da repository oluşturduğunuzdan emin olun
- Repository adının doğru olduğundan emin olun (`karahanli-tarif`)
- GitHub kullanıcı adınızın doğru olduğundan emin olun (`hamzakara31`)

### "Authentication failed"

- Personal Access Token kullanın (şifre değil!)
- Token'ın `repo` iznine sahip olduğundan emin olun
- Token'ın süresinin dolmadığından emin olun

### "Permission denied"

- GitHub'da oturum açtığınızdan emin olun
- Personal Access Token'ın doğru olduğundan emin olun

---

**Önce GitHub'da repository oluşturun, sonra push edin!** 🚀

