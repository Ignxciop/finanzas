# Backend - Sistema de Finanzas

Backend desarrollado con arquitectura hexagonal (Clean Architecture) para una aplicación de gestión financiera personal.

## 🏗️ Arquitectura

El proyecto sigue la arquitectura hexagonal con las siguientes capas:

### Domain (Dominio)
- **Entities**: Entidades del negocio (User)
- **Value Objects**: Objetos de valor inmutables (Email, Password, UserName)
- **Repositories**: Interfaces de los repositorios (puertos)

### Application (Aplicación)
- **Use Cases**: Casos de uso del negocio (RegisterUserUseCase)
- **DTOs**: Data Transfer Objects

### Infrastructure (Infraestructura)
- **Database**: Prisma ORM y repositorios concretos
- **Security**: JWT y hash de contraseñas
- **Config**: Configuración de variables de entorno
- **Mappers**: Conversión entre capas

### Interfaces (Adaptadores de entrada)
- **HTTP**: Express, controladores, rutas y middlewares

## 🚀 Tecnologías

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **Jest** - Testing

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate
```

## 🎯 Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start

# Tests
npm test
npm run test:watch
npm run test:unit

# Prisma
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## 🔌 Endpoints

### Auth
- `POST /api/auth/register` - Registrar nuevo usuario

**Body:**
```json
{
  "name": "José Núñez",
  "email": "jose@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "José Núñez",
      "email": "jose@example.com"
    },
    "token": "jwt_token"
  }
}
```

## 🧪 Testing

El proyecto incluye tests unitarios para:
- Value Objects (Email, Password, UserName)
- Entities (User)
- Use Cases (RegisterUserUseCase)

```bash
npm test
```

## 📁 Estructura del proyecto

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   └── repositories/
│   ├── application/
│   │   ├── use-cases/
│   │   └── dto/
│   ├── infrastructure/
│   │   ├── db/
│   │   ├── config/
│   │   ├── security/
│   │   ├── mappers/
│   │   └── errors/
│   ├── interfaces/
│   │   └── http/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── middlewares/
│   └── app.ts
├── tests/
│   └── unit/
└── package.json
```

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Autenticación JWT
- Validación de datos en value objects
- CORS configurado

## 👨‍💻 Desarrollador

**José Núñez**
