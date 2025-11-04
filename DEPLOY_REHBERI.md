# 🚀 Yayınlama (Deploy) Rehberi

Uygulamanızı internete yayınlamak için aşağıdaki adımları izleyin.

## 📋 Seçenekler

### 1. Vercel (Önerilen - Ücretsiz ve Kolay)

Vercel Next.js uygulamaları için en iyi seçenektir. Ücretsiz ve otomatik deploy.

#### Adım Adım:

1. **GitHub'a Yükleyin**
   - GitHub hesabı oluşturun (eğer yoksa): https://github.com
   - Yeni bir repository oluşturun
   - Projenizi GitHub'a yükleyin:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/kullaniciadi/yemek-projesi.git
     git push -u origin main
     ```

2. **Vercel'e Kaydolun**
   - https://vercel.com adresine gidin
   - "Sign Up" ile kaydolun (GitHub ile giriş yapabilirsiniz)

3. **Projeyi Deploy Edin**
   - Vercel dashboard'da "Add New Project" tıklayın
   - GitHub repository'nizi seçin
   - Framework Preset: Next.js (otomatik algılanır)
   - Root Directory: `.` (nokta)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)
   - Environment Variables: **ÖNEMLİ!** API anahtarlarınızı ekleyin:
     - `GEMINI_API_KEY` veya `OPENAI_API_KEY` (eğer backend'de kullanacaksanız)
   - "Deploy" butonuna tıklayın
   - 2-3 dakika içinde deploy tamamlanır!

4. **Sonuç**
   - Uygulamanız `https://yemek-projesi.vercel.app` gibi bir URL'de yayınlanır
   - Her `git push` sonrası otomatik deploy yapılır

### 2. Netlify (Alternatif)

Netlify da ücretsiz ve kolay.

#### Adım Adım:

1. **GitHub'a Yükleyin** (yukarıdaki gibi)

2. **Netlify'e Kaydolun**
   - https://netlify.com adresine gidin
   - "Sign up" ile kaydolun

3. **Projeyi Deploy Edin**
   - "Add new site" > "Import an existing project"
   - GitHub repository'nizi seçin
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Environment Variables ekleyin
   - "Deploy site" tıklayın

### 3. Railway (Başka Bir Alternatif)

Railway ücretsiz tier sunuyor.

#### Adım Adım:

1. **GitHub'a Yükleyin**

2. **Railway'e Kaydolun**
   - https://railway.app adresine gidin
   - GitHub ile giriş yapın

3. **Projeyi Deploy Edin**
   - "New Project" > "Deploy from GitHub repo"
   - Repository'nizi seçin
   - Otomatik Next.js algılanır
   - Environment Variables ekleyin

## ⚠️ Önemli Notlar

### Environment Variables (Çevre Değişkenleri)

**LocalStorage kullanıyorsanız**, API anahtarları kullanıcı tarafından girilir, bu yüzden environment variable'a gerek yok!

Ancak eğer backend'de API anahtarı kullanmak isterseniz:

1. Vercel/Netlify dashboard'da:
   - Settings > Environment Variables
   - `GEMINI_API_KEY` veya `OPENAI_API_KEY` ekleyin

2. Kodda kullanım:
   ```typescript
   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
   ```

### Build Ayarları

Next.js projeleri için genellikle otomatik ayarlar yeterlidir:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## 🔧 Deployment Öncesi Kontrol Listesi

1. ✅ `.env.local` dosyasını `.gitignore`'a ekleyin (hassas bilgiler için)
2. ✅ `package.json`'da tüm dependencies mevcut
3. ✅ `next.config.js` doğru yapılandırılmış
4. ✅ API anahtarları kullanıcı tarafından giriliyor (localStorage) - bu iyi!
5. ✅ Production build test edin: `npm run build`

## 🚀 Hızlı Başlangıç (Vercel)

```bash
# 1. Projeyi build edin (test için)
npm run build

# 2. GitHub'a yükleyin
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/kullaniciadi/yemek-projesi.git
git push -u origin main

# 3. Vercel'e gidin ve GitHub'dan import edin
# https://vercel.com/new
```

## 📱 Mobil Erişim

Deploy ettikten sonra:
- URL'yi iPhone'unuzda açın
- Safari'de "Ana Ekrana Ekle" ile uygulamayı ekleyin
- Artık her yerden erişebilirsiniz!

## 💡 İpuçları

1. **Custom Domain**: Vercel'de ücretsiz custom domain ekleyebilirsiniz
2. **Preview Deployments**: Her pull request'te otomatik preview URL oluşturulur
3. **Analytics**: Vercel Analytics ücretsiz eklenebilir
4. **SSL**: Otomatik HTTPS sertifikası verilir

## ❓ Sorun Giderme

### Build Hatası

```bash
# Local'de test edin
npm run build
```

### API Hatası

- API anahtarları localStorage'da saklanıyor, bu yüzden environment variable'a gerek yok
- Kullanıcılar ilk açılışta API anahtarlarını girecek

### İmage Hatası

- `next.config.js`'de `images.unoptimized: true` var, bu production'da sorun olabilir
- Vercel'de otomatik optimize edilir

---

**En Kolay Yol:** Vercel + GitHub kombinasyonu! 🚀

