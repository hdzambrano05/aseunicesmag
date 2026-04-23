# 🚀 ASEUNICESMAG - Sistema Fullstack

Aplicación web fullstack desarrollada con **Laravel (Backend)** y **Next.js (Frontend)**, orientada a la gestión eficiente de procesos y servicios.

---

## 📌 Tecnologías utilizadas

### 🔙 Backend
- PHP
- Laravel
- MySQL / PostgreSQL
- API REST

### 🎨 Frontend
- React
- Next.js
- TypeScript
- CSS

---

## 📂 Estructura del proyecto

aseunicesmag/
│
├── backend-cartera/     # API en Laravel
└── frontend-cartera/    # Aplicación en Next.js

---

## ⚙️ Instalación y configuración

### 🔧 Clonar el repositorio


git clone https://github.com/hdzambrano05/aseunicesmag.git

cd aseunicesmag


---

### 🔙 Configuración Backend (Laravel)


cd backend-cartera
composer install
cp .env.example .env
php artisan key:generate


Configura la base de datos en el archivo `.env`

Luego ejecuta:


php artisan migrate
php artisan serve


Backend disponible en:

http://127.0.0.1:8000


---

### 🎨 Configuración Frontend (Next.js)


cd frontend-cartera
npm install
npm run dev


Frontend disponible en:

http://localhost:3000


---

## 🔗 Conexión Frontend - Backend

Crear archivo `.env.local` en `frontend-cartera`:


NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api


---

## ✨ Funcionalidades

- 🔐 Autenticación de usuarios  
- 🔄 Consumo de API REST  
- 📊 Gestión de datos  
- 📱 Interfaz moderna  

---

## 📦 Buenas prácticas

- No subir `.env`  
- No subir `node_modules` ni `/vendor`  
- Usar `.gitignore`  

---

## 👩‍💻 Autor

Harold Zambrano

---

## 📄 Licencia

Proyecto académico
