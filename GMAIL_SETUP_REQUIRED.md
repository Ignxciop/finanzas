╔══════════════════════════════════════════════════════════════════════╗
║  ⚠️  ACCIÓN REQUERIDA: Configuración de Gmail                       ║
╔══════════════════════════════════════════════════════════════════════╗

Tu correo ya está configurado en el sistema:
📧 finanzas.verificacion.noreply@gmail.com
🔑 Contraseña: finanzasproyecto2025

Pero DEBES completar estos pasos para que funcione:

┌──────────────────────────────────────────────────────────────────────┐
│ OPCIÓN 1: App Password (RECOMENDADO - MÁS SEGURO)                   │
└──────────────────────────────────────────────────────────────────────┘

1️⃣  Inicia sesión en Gmail:
   → https://mail.google.com
   → Usuario: finanzas.verificacion.noreply@gmail.com
   → Contraseña: finanzasproyecto2025

2️⃣  Activa la verificación en 2 pasos:
   → Ve a: https://myaccount.google.com/security
   → Busca "Verificación en 2 pasos"
   → Click "Comenzar" y sigue los pasos
   → Necesitarás un número de teléfono

3️⃣  Genera una contraseña de aplicación:
   → Ve a: https://myaccount.google.com/apppasswords
   → Selecciona "Correo" y "Otro (nombre personalizado)"
   → Escribe: "Sistema Finanzas Backend"
   → Click "Generar"
   → Copia la contraseña de 16 caracteres (ejemplo: abcd efgh ijkl mnop)

4️⃣  Actualiza backend/.env con el App Password:
   ```
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
   (Sin espacios, todo junto)

┌──────────────────────────────────────────────────────────────────────┐
│ OPCIÓN 2: Acceso de apps menos seguras (NO RECOMENDADO)             │
└──────────────────────────────────────────────────────────────────────┘

Si la opción 1 no funciona (Gmail a veces la desactiva):

1️⃣  Ve a: https://myaccount.google.com/lesssecureapps

2️⃣  Activa "Permitir aplicaciones menos seguras"

3️⃣  La contraseña actual (finanzasproyecto2025) funcionará tal cual

⚠️  NOTA: Google puede bloquear esta opción en cualquier momento.

┌──────────────────────────────────────────────────────────────────────┐
│ ✅ Verificar que funciona                                            │
└──────────────────────────────────────────────────────────────────────┘

Después de completar la configuración:

1. Reinicia el backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Deberías ver en consola:
   ```
   ✅ Backend listo para recibir peticiones
   ```

3. Registra un usuario de prueba con TU email personal:
   - Ve a: http://localhost:3000/registro
   - Usa tu email personal para recibir la verificación
   - Revisa tu bandeja de entrada

4. Si recibes el email, ¡funciona! 🎉

┌──────────────────────────────────────────────────────────────────────┐
│ 🚨 Problemas comunes                                                 │
└──────────────────────────────────────────────────────────────────────┘

❌ "Error al enviar email"
   → Verifica que completaste el paso 3 o 4
   → Revisa que no haya espacios extra en .env
   → Asegúrate que 2FA esté activado (para App Password)

❌ "Invalid login: 535-5.7.8 Username and Password not accepted"
   → Usaste la contraseña normal en vez del App Password
   → O no activaste "apps menos seguras"

❌ Email no llega
   → Espera 2-3 minutos
   → Revisa spam/correo no deseado
   → Verifica consola del backend (debe decir "Email enviado")

┌──────────────────────────────────────────────────────────────────────┐
│ 📋 Estado Actual del Sistema                                         │
└──────────────────────────────────────────────────────────────────────┘

✅ Correo configurado en .env
✅ EmailService implementado
✅ Todos los endpoints creados
✅ Frontend con páginas de verificación
⏳ PENDIENTE: Activar 2FA y generar App Password en Gmail

Una vez completes los pasos de arriba, el sistema estará 100% funcional.

┌──────────────────────────────────────────────────────────────────────┐
│ 🔐 Seguridad                                                          │
└──────────────────────────────────────────────────────────────────────┘

✅ Este correo es SOLO para notificaciones automáticas
✅ NO lo uses para comunicación humana
✅ El archivo .env está en .gitignore (no se sube a GitHub)
✅ Nunca compartas el App Password

════════════════════════════════════════════════════════════════════════

📚 Documentación completa: EMAIL_VERIFICATION.md
⚡ Guía rápida: QUICK_SETUP.md
