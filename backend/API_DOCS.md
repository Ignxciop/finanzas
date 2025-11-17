# API Endpoints - Sistema de Finanzas

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Health Check
**GET** `/health`

Verifica el estado del servidor.

**Response 200 OK:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-17T19:54:00.000Z"
}
```

---

### 2. Registro de Usuario
**POST** `/api/auth/register`

Registra un nuevo usuario en el sistema.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "José Núñez",
  "email": "jose@example.com",
  "password": "password123"
}
```

**Validaciones:**
- `name`: mínimo 3 caracteres, máximo 100, solo letras y espacios
- `email`: formato válido de email
- `password`: mínimo 6 caracteres

**Response 201 Created:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "José Núñez",
      "email": "jose@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error 400 Bad Request:**
```json
{
  "success": false,
  "message": "El nombre debe tener al menos 3 caracteres"
}
```

**Error 409 Conflict:**
```json
{
  "success": false,
  "message": "El correo electrónico ya está registrado"
}
```

---

## Autenticación

Para endpoints protegidos, incluir el token JWT en el header:

```
Authorization: Bearer {token}
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Error de validación |
| 401 | Unauthorized - Token inválido o expirado |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: email duplicado) |
| 500 | Internal Server Error - Error del servidor |

---

## Ejemplo de uso con cURL

### Registro
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "José Núñez",
    "email": "jose@example.com",
    "password": "password123"
  }'
```

### Health Check
```bash
curl http://localhost:5000/health
```

---

## Testing en Postman/Insomnia

### Colección para importar:

1. Crear nueva colección llamada "Finanzas API"
2. Agregar variable de entorno:
   - `base_url`: `http://localhost:5000`
3. Importar los endpoints mencionados arriba

### Variables de entorno sugeridas:
- `base_url`: http://localhost:5000
- `token`: (se guardará automáticamente después del registro)
