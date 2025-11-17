# Prueba de Integración Frontend-Backend

## Registro de Usuario

### 1. Asegúrate de que ambos servidores estén corriendo

**Backend:**
```bash
cd backend
npm run dev
# Debe estar corriendo en http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm start
# Debe estar corriendo en http://localhost:3000
```

### 2. Proceso de prueba

1. Abre el navegador en `http://localhost:3000`
2. Haz clic en "Registrarse" en la navbar
3. Completa el formulario con:
   - **Nombre**: José Núñez (mínimo 3 caracteres)
   - **Email**: jose@example.com (formato válido)
   - **Contraseña**: password123 (mínimo 6 caracteres)
   - **Confirmar contraseña**: password123 (debe coincidir)
   - ✅ Marca "Acepto los términos y condiciones"
4. Haz clic en "Crear Cuenta"

### 3. Flujo completo

```
Frontend (RegisterForm.js)
    ↓
    Validaciones del formulario
    ↓
    authService.register({ name, email, password })
    ↓
    POST http://localhost:5000/api/auth/register
    ↓
Backend (AuthController.js)
    ↓
    RegisterUserUseCase.execute()
    ↓
    Validaciones de Value Objects
    ↓
    Hash de contraseña con bcrypt
    ↓
    Guardar en base de datos (Prisma)
    ↓
    Generar JWT token
    ↓
    Respuesta: { user, token }
    ↓
Frontend
    ↓
    Guardar token en localStorage
    ↓
    Guardar user en localStorage
    ↓
    Redirección a "/" (home)
```

### 4. Verificación en la base de datos

Abre Prisma Studio para verificar el usuario creado:

```bash
cd backend
npm run prisma:studio
# Abre http://localhost:5555
```

En Prisma Studio:
- Ve a la tabla `users`
- Deberías ver tu usuario con:
  - ✅ id (UUID)
  - ✅ name
  - ✅ email
  - ✅ password (hasheado con bcrypt)
  - ✅ createdAt
  - ✅ updatedAt

### 5. Verificación en el navegador

**localStorage:**
Abre DevTools → Application → Local Storage → http://localhost:3000

Deberías ver:
```
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
user: {"id":"...","name":"José Núñez","email":"jose@example.com"}
```

### 6. Errores esperados y cómo manejarlos

**Error: "El correo electrónico ya está registrado"**
- Significa que el email ya existe en la base de datos
- Usa otro email o elimina el usuario de la base de datos

**Error: "Network request failed"**
- Verifica que el backend esté corriendo en puerto 5000
- Verifica que CORS esté configurado correctamente

**Error de validación (400)**
- El backend validará nuevamente todos los campos
- Los mensajes de error del backend se mostrarán en el frontend

### 7. Pruebas sugeridas

**Validaciones del frontend:**
1. ❌ Intentar registrar con email inválido → Error antes de enviar
2. ❌ Intentar registrar con contraseña corta → Error antes de enviar
3. ❌ Intentar registrar sin aceptar términos → Error antes de enviar
4. ❌ Intentar registrar con contraseñas que no coinciden → Error antes de enviar

**Validaciones del backend:**
1. ✅ Registro exitoso con datos válidos
2. ❌ Email duplicado → Error 409 del backend
3. ❌ Email con formato inválido → Error 400 del backend
4. ❌ Nombre con caracteres especiales → Error 400 del backend

## Estructura de respuesta del backend

**Éxito (201):**
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

**Error (400/409/500):**
```json
{
  "success": false,
  "message": "El correo electrónico ya está registrado"
}
```

## Archivos modificados

### Frontend
- ✅ `src/services/authService.js` - Servicio de autenticación
- ✅ `src/features/auth/components/RegisterForm.js` - Formulario conectado
- ✅ `.env` - Variables de entorno
- ✅ `.env.example` - Ejemplo de variables

### Backend
- ✅ Ya implementado completamente
- ✅ Endpoint: POST /api/auth/register
- ✅ Validaciones en Value Objects
- ✅ Hash de contraseñas
- ✅ Generación de JWT
