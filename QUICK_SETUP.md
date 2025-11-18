# ⚡ Configuración Rápida - Email y Recuperación de Contraseña

## 🎯 Lo que necesitas hacer AHORA

### 1. Configurar Gmail (5 minutos)

#### Paso 1: Habilitar 2FA
1. Ve a https://myaccount.google.com/security
2. Click en "Verificación en 2 pasos"
3. Sigue los pasos para activarla

#### Paso 2: Generar App Password
1. Ve a https://myaccount.google.com/apppasswords
2. Nombre: **Sistema Finanzas**
3. Copia el password de 16 caracteres (algo como: `abcd efgh ijkl mnop`)

#### Paso 3: Actualizar .env
```bash
cd backend
nano .env  # o usa tu editor favorito
```

Agrega/actualiza estas líneas:
```bash
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM="Sistema de Finanzas <noreply@finanzas.com>"

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:** Reemplaza:
- `tu-email@gmail.com` con tu email real
- `abcd efgh ijkl mnop` con el App Password que copiaste

### 2. Reiniciar Backend

```bash
cd backend
npm run dev
```

Deberías ver en consola:
```
✅ Backend listo para recibir peticiones
🔗 CORS permitido desde: http://localhost:3000
```

### 3. Probar el Sistema

#### Test Rápido de Registro

1. **Iniciar frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Registrarse**:
   - Ve a http://localhost:3000/registro
   - Registra un usuario con TU email real
   - Deberías ver en consola del backend:
     ```
     Email de verificación enviado automáticamente a: tu@email.com
     ```

3. **Verificar email**:
   - Abre tu correo (puede tardar 1-2 minutos)
   - Busca email de "Sistema de Finanzas"
   - Click en botón "Verificar Email"
   - Deberías ver página de éxito ✅

#### Test Rápido de Recuperación

1. **Olvidar contraseña**:
   - Ve a http://localhost:3000/inicio-sesion
   - Click en "¿Olvidaste tu contraseña?"
   - Ingresa tu email
   - Click "Enviar instrucciones"

2. **Restablecer**:
   - Abre tu correo
   - Click en botón "Restablecer Contraseña"
   - Ingresa nueva contraseña (mínimo 8 caracteres)
   - Confirma la contraseña
   - Click "Restablecer contraseña"
   - Deberías ver éxito y redirigir a login ✅

3. **Login con nueva contraseña**:
   - Inicia sesión con la nueva contraseña
   - Deberías entrar al dashboard ✅

---

## 🚨 Si algo falla

### Email no llega

1. **Revisa spam/correo no deseado**
2. **Verifica consola del backend** → debe decir "Email enviado"
3. **Verifica App Password** → debe ser de 16 caracteres sin espacios en `.env`
4. **Espera 2-3 minutos** → a veces Gmail tarda

### Error "Error al enviar email"

**Solución:**
```bash
cd backend
npm run dev
```

Verifica el error exacto en consola. Causas comunes:
- ❌ App Password incorrecto
- ❌ 2FA no activado en Gmail
- ❌ Variables mal escritas en .env
- ❌ Firewall bloqueando puerto 587

### Token inválido

**Solución:**
- Los tokens de verificación expiran en **24 horas**
- Los tokens de reset expiran en **1 hora**
- Cada token solo se puede usar **1 vez**
- Solicita un nuevo token si el tuyo expiró

---

## 📋 Checklist Final

- [ ] 2FA activado en Gmail
- [ ] App Password generado y copiado
- [ ] Variables agregadas a `backend/.env`
- [ ] Backend reiniciado con `npm run dev`
- [ ] Frontend corriendo con `npm start`
- [ ] Test de registro completado
- [ ] Email de verificación recibido
- [ ] Test de recuperación completado
- [ ] Email de reset recibido
- [ ] Login con nueva contraseña exitoso

---

## 🎉 ¡Listo!

Si todos los checks están ✅, tu sistema de email y recuperación de contraseña está funcionando correctamente.

### Documentación completa
Para más detalles, ver: `EMAIL_VERIFICATION.md`

### Endpoints disponibles
```
POST /api/email/send-verification
POST /api/email/verify
POST /api/email/forgot-password
POST /api/email/reset-password
```

### Páginas disponibles
```
/verificar-email?token=xxx
/olvidar-contrasena
/restablecer-contrasena?token=xxx
```

---

**🔐 Recuerda:** Nunca commitees el archivo `.env` con tus credenciales reales. El `.gitignore` ya lo tiene excluido.
