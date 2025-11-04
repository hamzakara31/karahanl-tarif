# 🚀 GitHub'a Yükleme

GitHub'da repository oluşturduktan sonra şu komutu çalıştırın:

```powershell
git push -u origin main
```

Eğer GitHub'da zaten repository oluşturduysanız, şu komutla yükleyebilirsiniz:

```powershell
git push -u origin main
```

## 🔐 Authentication

İlk kez push ederken GitHub kimlik doğrulaması isteyebilir:

1. **Personal Access Token** kullanın (önerilen)
   - GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
   - "Generate new token" tıklayın
   - "repo" iznini seçin
   - Token'ı kopyalayın
   - Push sırasında şifre yerine token kullanın

2. **GitHub CLI** kullanın
   ```powershell
   gh auth login
   ```

## ✅ Repository Oluşturulduktan Sonra

```powershell
git push -u origin main
```

Bu komut projeyi GitHub'a yükler!

