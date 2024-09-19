# Backend Application

## 📖 Descripción

Este proyecto es un backend desarrollado con **NestJS** y **TypeScript** que incluye funcionalidades de autenticación, manejo de caché, gestión de usuarios y productos, integración con **Cloudinary** para la subida de imágenes y uso de **Prisma** para interactuar con la base de datos. Además, utiliza **Redis** para el almacenamiento en caché y **JWT** para la autenticación segura.

## ✨ Características Principales

- **Autenticación JWT** con Passport y NestJS.
- **Gestión de caché** con Redis y Cache Manager.
- **ORM** con Prisma para gestionar la base de datos.
- **Subida y gestión de imágenes** con Cloudinary.
- **Logging** eficiente con Winston y Morgan.
- **Testeo** con Jest y Supertest.
- Manejo de usuarios, productos y otros recursos de manera eficiente.

## 📋 Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

- **Node.js** (versión 14 o superior)
- **npm** o **pnpm** como gestor de paquetes
- **Redis** (para almacenamiento en caché)
- **PostgreSQL** o cualquier otra base de datos compatible con Prisma

## 🚀 Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/mauroociappinaph/backend
   ```

2. Dirígete al directorio del proyecto:

   ```bash
   cd backend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   # o
   pnpm install
   ```

4. Configura la base de datos y Redis en el archivo `.env`.

   Configuración `.env`:

   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=tu_clave_secreta_aqui
   CLOUDINARY_NAME= emprendeart_img
   CLOUDINARY_API_KEY= 456967315687326
   CLOUDINARY_API_SECRET= JvH4A6RhMv85J8DZlnE6p6G_mM0
   ```

5. Genera el esquema de Prisma:

   ```bash
   npx prisma generate
   ```

6. Realiza las migraciones de la base de datos:

   ```bash
   npx prisma migrate dev
   ```

## 💻 Ejecución del Proyecto

Para iniciar el servidor en modo desarrollo, utiliza el siguiente comando:

```bash
npm run start:dev
```

El servidor estará disponible en [http://localhost:4000](http://localhost:4000).

### Comandos adicionales:

- **Compilar el proyecto**:

  ```bash
  npm run build
  ```

- **Ejecutar en producción**:

  ```bash
  npm run start:prod
  ```

- **Ejecutar los tests**:

  ```bash
  npm run test
  ```

- **Ver la cobertura de tests**:

  ```bash
  npm run test:cov
  ```

## 📚 Estructura del Proyecto

```
├── src/
│   ├── auth/               # Módulo de autenticación
│   ├── cloudinary/         # Integración con Cloudinary
│   ├── common/             # Módulos y utilidades comunes
│   ├── config/             # Configuraciones del proyecto
│   ├── products/           # Módulo de productos
│   ├── entrepreneurs/      # Módulo de emprendedores
│   └── app.module.ts       # Módulo raíz de la aplicación
├── prisma/                 # Archivos de configuración de Prisma
├── http-requests/          # Archivos relacionados a peticiones HTTP
├── package.json            # Dependencias y scripts del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **NestJS**: Framework para el desarrollo del lado del servidor con Node.js.
- **TypeScript**: Superconjunto de JavaScript que añade tipos estáticos.
- **Prisma**: ORM para la gestión de base de datos.
- **Redis**: Almacenamiento en caché.
- **JWT**: Autenticación segura con JSON Web Tokens.
- **Passport.js**: Middleware de autenticación.
- **Cloudinary**: Gestión de imágenes.
- **Winston**: Librería para logging.
- **Jest**: Framework de testing.
- **Supertest**: Testing de endpoints HTTP.
