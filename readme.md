# Müşteri Yönetimi Projesi

Bu proje **Angular 18.2** ve **Node.js 22.4** teknolojileri kullanılarak geliştirilmiştir.

---

## Projeyi Klonlamak

Aşağıdaki komutu terminalde çalıştırarak projeyi klonlayabilirsiniz:

```bash
git clone https://github.com/kaangemalmaz/customer-management.git
```

Klonlama işlemi tamamlandıktan sonra projeyi Visual Studio Code ile açmak için:

```
cd customer-management
code .
```

## Backend Yapılandırması

Çalıştırmadan önce backend klasörüne geçerek .env dosyasındaki aşağıdaki ayarları gözden geçirmeniz gerekmektedir:

##### PORT: Uygulamanın çalışacağı port numarası

##### DATABASE_URL: PostgreSQL bağlantı adresi

##### JWT_SECRET: JWT gizli anahtarı

##### DEFAULT_USERNAME: Varsayılan kullanıcı adı

##### DEFAULT_PASSWORD: Varsayılan şifre

```
Backend'i Başlatmak
cd .\backend\
npm install
npm run dev
```

```
Frontend Yapılandırması
Frontend Angular uygulamasını başlatmak için:
cd .\frontend\
npm install
ng serve -o
```

Eğer backend için farklı bir port kullandıysanız, frontend/src/environments/ altındaki environment.ts ve environment.prod.ts dosyalarında bulunan API URL’lerinin PORTUNU güncellemeniz gerekmektedir.
