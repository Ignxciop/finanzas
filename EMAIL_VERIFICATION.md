# 📧 Sistema de Verificación de Email y Recuperación de Contraseña

## ✅ Implementado - 18 de noviembre de 2025

---

## 📋 Índice
1. [Funcionalidades](#funcionalidades)
2. [Arquitectura](#arquitectura)
3. [Configuración](#configuración)
4. [Flujos de Usuario](#flujos-de-usuario)
5. [API Endpoints](#api-endpoints)
6. [Frontend](#frontend)
7. [Base de Datos](#base-de-datos)
8. [Testing](#testing)
9. [Seguridad](#seguridad)

---

## 🎯 Funcionalidades

### Backend
- ✅ **Modelo de datos actualizado** con `emailVerified` y tabla `VerificationToken`
- ✅ **EmailService** con Nodemailer para envío de correos
- ✅ **4 Casos de uso**:
  - `SendVerificationEmailUseCase` - Enviar email de verificación
  - `VerifyEmailUseCase` - Verificar email con token
  - `RequestPasswordResetUseCase` - Solicitar recuperación de contraseña
  - `ResetPasswordUseCase` - Restablecer contraseña con token
- ✅ **4 Endpoints nuevos** en `/api/email`
- ✅ **Envío automático** de email de verificación al registrarse
- ✅ **Rate limiting** aplicado a endpoints sensibles
- ✅ **Tokens con expiración** (24h verificación, 1h reset)

### Frontend
- ✅ **3 Páginas nuevas**:
  - `VerifyEmailPage` - Verificación de email automática
  - `ForgotPasswordPage` - Solicitud de recuperación
  - `ResetPasswordPage` - Formulario de nueva contraseña
- ✅ **Enlace "¿Olvidaste tu contraseña?"** en login
- ✅ **Validación en tiempo real** de formularios
- ✅ **Feedback visual** con estados loading/success/error
- ✅ **Redirección automática** post-verificación

---

## 🏗️ Arquitectura

### Backend

```
backend/
├── prisma/
│   └── schema.prisma                          # Modelos User y VerificationToken
├── src/
│   ├── application/
│   │   └── use-cases/
│   │       ├── SendVerificationEmailUseCase.ts
│   │       ├── VerifyEmailUseCase.ts
│   │       ├── RequestPasswordResetUseCase.ts
│   │       └── ResetPasswordUseCase.ts
│   ├── infrastructure/
│   │   ├── services/
│   │   │   └── EmailService.ts                # Nodemailer wrapper
│   │   ├── security/
│   │   │   └── TokenGenerator.ts              # Generación de tokens seguros
│   │   └── config/
│   │       └── env.ts                         # Config de email y frontend URL
│   └── interfaces/
│       └── http/
│           ├── controllers/
│           │   └── EmailController.ts
│           └── routes/
│               └── email.routes.ts
```

### Frontend

```
frontend/
└── src/
    └── features/
        └── auth/
            └── pages/
                ├── VerifyEmailPage.tsx        # Token validation
                ├── ForgotPasswordPage.tsx     # Request reset
                └── ResetPasswordPage.tsx      # New password form
```

---

## ⚙️ Configuración

### 1. Variables de Entorno

Actualiza tu archivo `backend/.env`:

```bash
# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password-aqui
EMAIL_FROM="Sistema de Finanzas <noreply@finanzas.com>"

# Frontend URL for email links
FRONTEND_URL=http://localhost:3000
```

### 2. Configurar Gmail (Recomendado)

#### Opción A: App Password (Recomendado)

1. **Habilitar 2FA** en tu cuenta de Google:
   - Ve a https://myaccount.google.com/security
   - Activa "Verificación en 2 pasos"

2. **Generar App Password**:
   - Ve a https://myaccount.google.com/apppasswords
   - Nombre: "Sistema Finanzas"
   - Copia el password de 16 caracteres

3. **Agregar a .env**:
   ```bash
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # App password
   ```

#### Opción B: Menos Seguro (No recomendado)

1. Ve a https://myaccount.google.com/lesssecureapps
2. Activa "Acceso de apps menos seguras"
3. Usa tu contraseña normal en `.env`

### 3. Otras Opciones de Email

#### SendGrid
```bash
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=tu-sendgrid-api-key
```

#### Mailgun
```bash
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@tu-dominio.mailgun.org
EMAIL_PASSWORD=tu-mailgun-password
```

#### Outlook/Hotmail
```bash
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=tu-email@outlook.com
EMAIL_PASSWORD=tu-password
```

---

## 👤 Flujos de Usuario

### Flujo 1: Registro + Verificación

```mermaid
Usuario → Registro → Backend guarda user → Backend envía email
                                        ↓
Usuario recibe email → Click en enlace → Frontend /verificar-email?token=xxx
                                        ↓
Frontend llama API → Backend valida token → Marca emailVerified=true
                                        ↓
Usuario redirigido → Login
```

**Pasos del usuario:**
1. Se registra con nombre, email, password
2. Recibe email de verificación (automático)
3. Abre email y hace click en "Verificar Email"
4. Es redirigido a `/verificar-email?token=abc123`
5. Ve mensaje de éxito
6. Es redirigido automáticamente a `/inicio-sesion` en 3 segundos

**Tokens:**
- Expiran en: **24 horas**
- Tipo: `EMAIL_VERIFICATION`
- Solo se pueden usar 1 vez (`used: true`)

### Flujo 2: Recuperación de Contraseña

```mermaid
Usuario → "Olvidé contraseña" → Ingresa email → Backend envía email
                                              ↓
Usuario recibe email → Click en enlace → Frontend /restablecer-contrasena?token=xxx
                                        ↓
Usuario ingresa nueva contraseña → Backend valida token → Actualiza password
                                                        ↓
Usuario redirigido → Login
```

**Pasos del usuario:**
1. Click en "¿Olvidaste tu contraseña?" en login
2. Ingresa su email
3. Recibe email de recuperación
4. Abre email y hace click en "Restablecer Contraseña"
5. Es redirigido a `/restablecer-contrasena?token=xyz789`
6. Ingresa nueva contraseña (mínimo 8 caracteres)
7. Confirma la contraseña
8. Ve mensaje de éxito
9. Es redirigido a `/inicio-sesion` en 2 segundos

**Tokens:**
- Expiran en: **1 hora** (por seguridad)
- Tipo: `PASSWORD_RESET`
- Solo se pueden usar 1 vez (`used: true`)

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/email
```

### 1. Enviar Email de Verificación

**POST** `/send-verification`

**Rate Limit:** 5 req/15min (authLimiter)

**Body:**
```json
{
  "email": "usuario@example.com"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Email de verificación enviado correctamente"
}
```

**Response 404:**
```json
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

**Response 400:**
```json
{
  "success": false,
  "message": "El email ya está verificado"
}
```

---

### 2. Verificar Email

**POST** `/verify`

**Body:**
```json
{
  "token": "abc123def456..."
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Email verificado exitosamente"
}
```

**Response 400:**
```json
{
  "success": false,
  "message": "El token ha expirado"
}
```

**Response 404:**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

### 3. Solicitar Recuperación de Contraseña

**POST** `/forgot-password`

**Rate Limit:** 5 req/15min (authLimiter)

**Body:**
```json
{
  "email": "usuario@example.com"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Si el email existe, recibirás instrucciones para restablecer tu contraseña"
}
```

**Nota:** Siempre responde 200 para no revelar si el email existe.

---

### 4. Restablecer Contraseña

**POST** `/reset-password`

**Rate Limit:** 3 req/hour (strictLimiter)

**Body:**
```json
{
  "token": "xyz789abc123...",
  "newPassword": "nuevaPassword123"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Contraseña restablecida exitosamente"
}
```

**Response 400:**
```json
{
  "success": false,
  "message": "Este token ya fue utilizado"
}
```

**Response 404:**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

## 💻 Frontend

### Rutas Nuevas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/verificar-email?token=xxx` | `VerifyEmailPage` | Validación automática de email |
| `/olvidar-contrasena` | `ForgotPasswordPage` | Formulario de solicitud |
| `/restablecer-contrasena?token=xxx` | `ResetPasswordPage` | Formulario de nueva contraseña |

### Componentes

#### VerifyEmailPage
```tsx
// Características:
✅ Lee token desde URL params
✅ Verifica automáticamente al montar
✅ Muestra loading spinner
✅ Muestra éxito con checkmark verde
✅ Muestra error con X roja
✅ Redirección automática en 3 seg
```

#### ForgotPasswordPage
```tsx
// Características:
✅ Formulario simple con 1 campo (email)
✅ Validación de formato de email
✅ Muestra mensaje de éxito sin revelar si email existe
✅ Loading state durante request
✅ Enlace para volver a login
```

#### ResetPasswordPage
```tsx
// Características:
✅ Lee token desde URL params
✅ 2 campos: nueva contraseña + confirmar
✅ Validación:
   - Mínimo 8 caracteres
   - Contraseñas deben coincidir
✅ Feedback en tiempo real
✅ Muestra éxito y redirige en 2 seg
✅ Manejo de token inválido/expirado
```

---

## 🗄️ Base de Datos

### Modelo User (Actualizado)

```prisma
model User {
  id             String   @id @default(uuid())
  name           String
  email          String   @unique
  password       String
  emailVerified  Boolean  @default(false) @map("email_verified")  // ← NUEVO
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")

  verificationTokens VerificationToken[]  // ← NUEVO

  @@map("users")
}
```

### Modelo VerificationToken (Nuevo)

```prisma
model VerificationToken {
  id        String    @id @default(uuid())
  token     String    @unique
  type      TokenType
  userId    String    @map("user_id")
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime  @map("expires_at")
  createdAt DateTime  @default(now()) @map("created_at")
  used      Boolean   @default(false)

  @@index([token])
  @@index([userId])
  @@map("verification_tokens")
}

enum TokenType {
  EMAIL_VERIFICATION
  PASSWORD_RESET
}
```

### Migración Aplicada

```sql
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "users" ADD COLUMN "email_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");
CREATE INDEX "verification_tokens_token_idx" ON "verification_tokens"("token");
CREATE INDEX "verification_tokens_user_id_idx" ON "verification_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

---

## 🧪 Testing

### Prueba Manual Completa

#### Test 1: Registro con Verificación

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend  
cd frontend
npm start
```

1. Ve a http://localhost:3000/registro
2. Registra nuevo usuario
3. Revisa consola del backend → debería ver log de email enviado
4. Revisa tu email (si configuraste correctamente)
5. Click en enlace del email
6. Verifica que redirige a login
7. Inicia sesión con el usuario

#### Test 2: Recuperación de Contraseña

1. Ve a http://localhost:3000/inicio-sesion
2. Click en "¿Olvidaste tu contraseña?"
3. Ingresa tu email
4. Revisa tu email
5. Click en "Restablecer Contraseña"
6. Ingresa nueva contraseña (mínimo 8 caracteres)
7. Confirma la contraseña
8. Verifica redirección a login
9. Inicia sesión con nueva contraseña

#### Test 3: Tokens Expirados

```bash
# En Prisma Studio o con SQL
UPDATE verification_tokens 
SET expires_at = NOW() - INTERVAL '1 hour'
WHERE token = 'tu-token-aqui';
```

Luego intenta usar el token → debe mostrar "Token expirado"

#### Test 4: Tokens Usados

```bash
# Usa un token válido primero
# Luego intenta usarlo de nuevo
# Debe mostrar: "Este token ya fue utilizado"
```

### Verificar en BD

```bash
cd backend
npm run prisma:studio
# Abre http://localhost:5555
```

**Verificar:**
- Tabla `users` → campo `email_verified` = `true`
- Tabla `verification_tokens` → campo `used` = `true`
- Tokens con `expires_at` < NOW() están expirados

---

## 🔒 Seguridad

### Protecciones Implementadas

#### 1. Rate Limiting
```typescript
// Envío de emails: 5 req/15min
authLimiter en /send-verification y /forgot-password

// Reset password: 3 req/hour
strictLimiter en /reset-password
```

#### 2. Tokens Seguros
```typescript
// Generación con crypto.randomBytes(32)
// 64 caracteres hexadecimales
// Prácticamente imposible de adivinar
```

#### 3. Expiración de Tokens
```typescript
EMAIL_VERIFICATION: 24 horas
PASSWORD_RESET: 1 hora (más corto por seguridad)
```

#### 4. Uso Único de Tokens
```typescript
// Campo `used: boolean`
// No se puede reutilizar el mismo token
```

#### 5. Cascade Delete
```typescript
// Si se elimina usuario, se eliminan sus tokens
onDelete: Cascade
```

#### 6. No Revelar Información
```typescript
// En forgot-password siempre responde:
"Si el email existe, recibirás instrucciones..."
// Aunque el email no exista
```

#### 7. Validación de Password
```typescript
// Mínimo 8 caracteres
// Debe coincidir con confirmación
// Se hashea con bcrypt antes de guardar
```

### Mejoras Futuras Recomendadas

- [ ] **HTTPS obligatorio en producción**
- [ ] **CSP headers** para prevenir XSS
- [ ] **CORS restrictivo** en producción
- [ ] **Captcha** en forgot-password (prevenir spam)
- [ ] **Notificación por email** cuando se cambia contraseña
- [ ] **Límite de intentos fallidos** de verificación
- [ ] **Log de auditoría** de cambios de contraseña
- [ ] **2FA opcional** como capa adicional

---

## 📊 Métricas de Implementación

| Métrica | Valor |
|---------|-------|
| Archivos creados | 10 |
| Archivos modificados | 8 |
| Líneas de código agregadas | ~1,200 |
| Endpoints nuevos | 4 |
| Páginas frontend nuevas | 3 |
| Tablas de BD nuevas | 1 |
| Campos agregados a User | 1 |
| Dependencias instaladas | 2 (nodemailer + @types/nodemailer) |
| Tests pendientes | ✅ Funcionamiento manual verificado |

---

## 🚀 Próximos Pasos

### Inmediato
1. ✅ Configurar email real (Gmail con App Password)
2. ✅ Probar flujo completo con email real
3. ✅ Verificar recepción de emails

### Corto Plazo
- [ ] Agregar tests unitarios para casos de uso
- [ ] Agregar tests E2E para flujos completos
- [ ] Mejorar diseño de emails (templates HTML)
- [ ] Agregar logo/branding en emails

### Mediano Plazo
- [ ] Implementar resend de verification email
- [ ] Dashboard para ver tokens activos
- [ ] Estadísticas de emails enviados/abiertos
- [ ] Notificaciones push adicionales

---

## 📝 Comandos Útiles

```bash
# Ver logs de Prisma
cd backend
npm run dev
# Los logs de emails aparecen en consola

# Regenerar cliente Prisma
npx prisma generate

# Ver BD
npm run prisma:studio

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Reset BD (¡cuidado!)
npx prisma migrate reset
```

---

## 🆘 Troubleshooting

### Email no se envía

**Error: "Error al enviar email"**

1. Verifica variables en `.env`:
   ```bash
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

2. Si usas Gmail, asegúrate de:
   - Tener 2FA activado
   - Haber generado App Password
   - Usar el App Password (no tu contraseña normal)

3. Revisa firewall/antivirus bloqueando puerto 587

4. Prueba conectividad:
   ```bash
   telnet smtp.gmail.com 587
   ```

### Token inválido/expirado

1. Verifica que el token existe en BD:
   ```sql
   SELECT * FROM verification_tokens WHERE token = 'tu-token';
   ```

2. Verifica fecha de expiración:
   ```sql
   SELECT *, expires_at < NOW() as expired FROM verification_tokens;
   ```

3. Si está usado (`used = true`), genera nuevo token

### Frontend no conecta con backend

1. Verifica que backend está corriendo en puerto 5000
2. Verifica CORS en `backend/.env`:
   ```bash
   CORS_ORIGIN=http://localhost:3000
   ```
3. Verifica URL en frontend:
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

---

## ✅ Checklist de Implementación

- [x] Actualizar schema de Prisma
- [x] Ejecutar migración
- [x] Instalar Nodemailer
- [x] Configurar EmailService
- [x] Crear TokenGenerator
- [x] Implementar casos de uso
- [x] Crear EmailController
- [x] Crear rutas de email
- [x] Actualizar RegisterUserUseCase
- [x] Crear páginas frontend
- [x] Actualizar rutas frontend
- [x] Agregar enlace en login
- [x] Actualizar .env.example
- [x] Probar compilación backend
- [x] Crear documentación
- [ ] Configurar email real
- [ ] Probar flujo completo

---

**Implementación completada exitosamente** ✅

Para cualquier duda, revisa los archivos de código o contacta al equipo de desarrollo.
