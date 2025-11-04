# 🔧 Git Yapılandırması

Git'i kullanmadan önce kullanıcı bilgilerinizi ayarlamanız gerekiyor.

## ⚙️ Adım Adım

### 1. Git Kullanıcı Bilgilerini Ayarlayın

**PowerShell veya CMD'de:**

```powershell
# Email adresinizi ayarlayın (GitHub email'iniz ile)
git config --global user.email "ornek@email.com"

# İsminizi ayarlayın
git config --global user.name "Adınız Soyadınız"
```

**Örnek:**
```powershell
git config --global user.email "hamza@example.com"
git config --global user.name "Hamza"
```

### 2. GitHub Repository URL'sini Güncelleyin

Repository URL'sindeki `KULLANICI_ADI` kısmını kendi GitHub kullanıcı adınızla değiştirin:

```powershell
# Önce mevcut remote'u kaldırın
git remote remove origin

# Doğru URL ile ekleyin (KULLANICI_ADI yerine kendi kullanıcı adınızı yazın)
git remote add origin https://github.com/KULLANICI_ADI/karahanli-tarif.git

# Veya direkt değiştirin
git remote set-url origin https://github.com/KULLANICI_ADI/karahanli-tarif.git
```

### 3. Dosyaları Commit Edin

```powershell
# Tüm dosyaları ekleyin
git add .

# Commit yapın
git commit -m "Initial commit - Karahanlı Tarif"

# Branch'i main olarak ayarlayın
git branch -M main
```

### 4. GitHub'a Yükleyin

```powershell
# GitHub'a push edin
git push -u origin main
```

## ✅ Kontrol

```powershell
# Git yapılandırmanızı kontrol edin
git config --global user.email
git config --global user.name

# Remote URL'i kontrol edin
git remote -v
```

## 🚨 Sorun Giderme

### "Author identity unknown" hatası

```powershell
git config --global user.email "email@example.com"
git config --global user.name "İsminiz"
```

### "Repository not found" hatası

- GitHub repository URL'sini kontrol edin
- Repository'nin var olduğundan emin olun
- GitHub kullanıcı adınızın doğru olduğundan emin olun

### "Permission denied" hatası

- GitHub'da oturum açtığınızdan emin olun
- Personal Access Token gerekebilir (GitHub Settings > Developer settings > Personal access tokens)

---

**Not:** `KULLANICI_ADI` yerine kendi GitHub kullanıcı adınızı yazmayı unutmayın!

