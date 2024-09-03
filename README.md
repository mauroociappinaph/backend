# Proyecto Backend con NestJS

Este proyecto es una aplicación backend desarrollada con el framework NestJS. Utiliza varias bibliotecas y herramientas para proporcionar una estructura modular y funcionalidades específicas, como autenticación JWT, manejo de errores, configuración de Prisma para la base de datos, entre otros.

## Estructura del Proyecto

El proyecto sigue una estructura modular, donde cada funcionalidad se encuentra en su propio módulo. A continuación se detalla la estructura del proyecto:

├── src
│ ├── auth # Módulo de autenticación
│ │ ├── auth.module.ts
│ │ ├── auth.service.ts
│ │ ├── jwt-payload.interface.ts
│ │ └── jwt.strategy.ts
│ ├── config # Configuraciones generales
│ │ └── winston-logger.config.ts
│ ├── constant # Constantes del proyecto
│ │ ├── cors.ts
│ │ └── index.ts
│ ├── entrepreneurs # Módulo de emprendedores
│ │ ├── dto
│ │ │ ├── create-entrepreneur.dto.ts
│ │ │ └── update-entrepreneur.dto.ts
│ │ ├── entities
│ │ │ └── entrepreneur.entity.ts
│ │ ├── entrepreneurs.controller.spec.ts
│ │ ├── entrepreneurs.controller.ts
│ │ ├── entrepreneurs.module.ts
│ │ ├── entrepreneurs.service.spec.ts
│ │ └── entrepreneurs.service.ts
│ ├── prisma # Configuración de Prisma
│ │ └── prisma.service.ts
│ ├── products # Módulo de productos
│ │ ├── dto
│ │ │ ├── create-product.dto.ts
│ │ │ ├── product.dto.ts
│ │ │ └── update-product.dto.ts
│ │ ├── entities
│ │ │ └── product.entity.ts
│ │ ├── products.controller.spec.ts
│ │ ├── products.controller.ts
│ │ ├── products.module.ts
│ │ ├── products.service.spec.ts
│ │ └── products.service.ts
│ ├── user # Módulo de usuarios
│ │ ├── dto
│ │ │ ├── create-user.dto.ts
│ │ │ └── update-user.dto.ts
│ │ ├── entities
│ │ │ └── user.entity.ts
│ │ ├── user.controller.spec.ts
│ │ ├── user.controller.ts
│ │ ├── user.module.ts
│ │ ├── user.service.spec.ts
│ │ └── user.service.ts
│ ├── common # Funciones y filtros comunes
│ │ └── filters
│ │ └── http-exception.filter.ts
│ ├── app.module.ts # Módulo principal de la aplicación
│ └── main.ts # Punto de entrada de la aplicación
└── package.json # Dependencias y scripts del proyecto

## Dependencias Principales

El proyecto utiliza las siguientes dependencias:

- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`: Dependencias fundamentales de NestJS.
- `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`: Para la implementación de autenticación basada en JWT.
- `@nestjs/swagger`: Para la documentación de la API.
- `@prisma/client`, `prisma`: ORM para la gestión de la base de datos.
- `bcrypt`: Para la encriptación de contraseñas.
- `class-validator`, `class-transformer`: Para la validación y transformación de datos.
- `winston`, `nest-winston`: Para el manejo y configuración de logs.
- `morgan`: Middleware de logging para solicitudes HTTP.
- `jsonwebtoken`: Para la creación y verificación de JWT.

## Scripts Disponibles

En el archivo `package.json`, se encuentran definidos los siguientes scripts:

- `build`: Compila el proyecto usando NestJS.
- `format`: Aplica Prettier para formatear el código.
- `start`: Inicia la aplicación en modo de producción.
- `start:dev`: Inicia la aplicación en modo de desarrollo con monitoreo de cambios.
- `start:debug`: Inicia la aplicación en modo de depuración.
- `lint`: Ejecuta ESLint para comprobar y corregir errores de estilo.
- `test`, `test:watch`, `test:cov`, `test:debug`, `test:e2e`: Scripts relacionados con la ejecución de pruebas usando Jest.

## Configuración Inicial

Para iniciar el proyecto, sigue los siguientes pasos:

1. **Instalar Dependencias**: Ejecuta el comando `npm install` para instalar todas las dependencias necesarias.
2. **Configurar Variables de Entorno**: Crea un archivo `.env` en la raíz del proyecto con las variables necesarias, como `JWT_SECRET`, configuración de base de datos, etc.
3. **Iniciar Prisma**: Ejecuta `npx prisma migrate dev` para aplicar las migraciones de Prisma.
4. **Iniciar la Aplicación**: Usa `npm run start:dev` para iniciar la aplicación en modo de desarrollo.

## Autenticación

La autenticación en esta aplicación se maneja utilizando JWT (JSON Web Token). Asegúrate de definir una clave secreta en tu archivo `.env` para que la autenticación funcione correctamente:

```plaintext
JWT_SECRET=tu_clave_secreta_aqui
```
