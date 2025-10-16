# Finanzas

Proyecto fullstack para gestión financiera personal.

## Stack utilizado

- **Frontend:** React (Create React App), React Router, Context API
- **Backend:** Node.js, Express, Prisma ORM, JWT, CORS
- **Base de datos:** PostgreSQL

## Instalación rápida

### 1. Clonar el repositorio

```bash
# Clona este repositorio y entra a la carpeta
```

### 2. Backend

```bash
cd backend
npm install
# Configura tu .env con DATABASE_URL
npx prisma migrate dev --name init
npm start
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

---

- El frontend corre en `http://localhost:3000`
- El backend corre en `http://localhost:3001`
