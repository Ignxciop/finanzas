# Dashboard Protegido - Documentación

## 🎯 Funcionalidades Implementadas

### Backend
- ✅ **Endpoint GET /api/auth/me**: Obtiene datos del usuario autenticado
- ✅ **Middleware de autenticación**: Valida tokens JWT en el backend
- ✅ **GetCurrentUserUseCase**: Caso de uso para obtener usuario actual
- ✅ **5 tests unitarios** para GetCurrentUserUseCase

### Frontend
- ✅ **ProtectedRoute**: Componente que protege rutas validando con backend
- ✅ **DashboardPage**: Página principal del usuario autenticado
- ✅ **authService.getCurrentUser()**: Método para validar autenticación
- ✅ **authService.logout()**: Método para cerrar sesión
- ✅ **Redirección automática** a /dashboard después de login/registro

## 🔐 Flujo de Autenticación

### 1. Registro/Login
```
Usuario → Formulario → Backend (valida) → JWT token → localStorage → Redirect /dashboard
```

### 2. Acceso a Ruta Protegida
```
Usuario → /dashboard → ProtectedRoute → GET /api/auth/me (con token) → Backend valida → Dashboard
```

### 3. Token Inválido o Expirado
```
ProtectedRoute → GET /api/auth/me → Error 401 → Limpia localStorage → Redirect /inicio-sesion
```

## 📁 Estructura de Archivos

### Backend
```
backend/
├── src/
│   ├── application/
│   │   └── use-cases/
│   │       └── GetCurrentUserUseCase.ts     # Obtiene usuario por ID
│   ├── interfaces/
│   │   └── http/
│   │       ├── controllers/
│   │       │   └── AuthController.ts        # Método me()
│   │       ├── routes/
│   │       │   └── auth.routes.ts          # GET /me
│   │       └── middlewares/
│   │           └── authMiddleware.ts       # Valida JWT
│   └── infrastructure/
│       └── mappers/
│           └── UserMapper.ts               # toDTO()
└── tests/
    └── unit/
        └── application/
            └── GetCurrentUserUseCase.test.ts  # 5 tests
```

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   └── routes/
│   │       ├── AppRouter.js              # Ruta /dashboard con ProtectedRoute
│   │       └── ProtectedRoute.js         # Validación con backend
│   ├── features/
│   │   ├── auth/
│   │   │   └── components/
│   │   │       ├── LoginForm.js          # Redirect /dashboard
│   │   │       └── RegisterForm.js       # Redirect /dashboard
│   │   └── dashboard/
│   │       └── pages/
│   │           └── DashboardPage.js      # Página principal
│   └── services/
│       └── authService.js                # getCurrentUser(), logout()
```

## 🚀 Cómo Usar

### 1. Iniciar servidores
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### 2. Probar flujo completo

#### Opción A: Registro
1. Ir a `http://localhost:3000/registro`
2. Completar formulario con:
   - Nombre completo (mín. 3 caracteres)
   - Email válido
   - Contraseña (mín. 6 caracteres)
   - Confirmar contraseña
   - Aceptar términos
3. Click en "Crear Cuenta"
4. **Resultado**: Redirección automática a `/dashboard`

#### Opción B: Login
1. Ir a `http://localhost:3000/inicio-sesion`
2. Ingresar credenciales
3. Click en "Iniciar Sesión"
4. **Resultado**: Redirección automática a `/dashboard`

### 3. Verificar protección de rutas

#### Caso 1: Usuario autenticado
```
Acceder a /dashboard → ProtectedRoute valida con backend → Muestra dashboard
```

#### Caso 2: Usuario no autenticado
```
Acceder a /dashboard → ProtectedRoute valida → Error → Redirect /inicio-sesion
```

#### Caso 3: Token expirado (después de 7 días)
```
Acceder a /dashboard → Backend rechaza token → Limpia localStorage → Redirect /inicio-sesion
```

### 4. Cerrar sesión
1. Dentro del dashboard, click en "Cerrar Sesión"
2. **Resultado**: 
   - localStorage limpio
   - Redirección a página principal "/"

## 🔍 Validaciones

### Backend (authMiddleware.ts)
```typescript
✅ Verifica header Authorization
✅ Valida formato "Bearer <token>"
✅ Decodifica y verifica JWT
✅ Valida expiración del token
✅ Inyecta user en req (userId, email)
❌ Sin token → 401 Unauthorized
❌ Token inválido → 401 Unauthorized
❌ Token expirado → 401 Unauthorized
```

### Frontend (ProtectedRoute.js)
```javascript
✅ Llama GET /api/auth/me con token
✅ Valida respuesta del backend
✅ Muestra loading mientras valida
✅ Limpia localStorage si falla
❌ Error en validación → Redirect /inicio-sesion
```

## 📊 Tests

### Ejecutar tests
```bash
cd backend
npm test
```

### Cobertura GetCurrentUserUseCase
- ✅ Retorna usuario cuando existe
- ✅ Lanza NotFoundError cuando no existe
- ✅ Llama repository con userId correcto
- ✅ Maneja errores del repository
- ✅ Retorna propiedades correctas (sin password)

**Total: 53 tests pasando** (48 anteriores + 5 nuevos)

## 🎨 Dashboard UI

### Header
- Título "Dashboard"
- Mensaje de bienvenida con nombre del usuario
- Botón "Cerrar Sesión"

### Contenido
- **Información de la Cuenta**: ID, nombre, email
- **Cards de Funcionalidades**: Cuentas, Transacciones, Reportes (próximamente)

### Estados
- **Loading**: Spinner mientras carga usuario
- **Autenticado**: Muestra dashboard completo
- **No autenticado**: Redirect automático

## 🔐 Seguridad

### Principios implementados
1. **Validación en Backend**: Toda autenticación pasa por el servidor
2. **Frontend Minimal**: Solo guarda token, no valida lógica de negocio
3. **Token en Header**: JWT enviado como Bearer token
4. **Limpieza de localStorage**: Se limpia en logout y errores de auth
5. **Expiración de tokens**: JWT expira en 7 días
6. **Middleware reutilizable**: authMiddleware para proteger rutas futuras

### No implementado (futuras mejoras)
- ⏰ Refresh tokens
- 🔄 Renovación automática de token
- 📱 Remember me persistente
- 🚪 Logout en backend (blacklist)
- 🔒 Rate limiting

## 🛣️ Rutas de la Aplicación

### Públicas
- `/` - HomePage
- `/inicio-sesion` - LoginPage
- `/registro` - RegisterPage
- `/terminos` - TermsPage
- `/privacidad` - PrivacyPage
- `/contacto` - ContactPage
- `/ayuda` - HelpPage

### Protegidas (requieren autenticación)
- `/dashboard` - DashboardPage ⚡

## 📝 Notas Técnicas

### localStorage
```javascript
// Guardado (después de login/registro)
localStorage.setItem('token', 'eyJhbGc...')
localStorage.setItem('user', '{"id":"123","name":"..."}')

// Lectura (en ProtectedRoute y Dashboard)
const token = localStorage.getItem('token')

// Limpieza (logout o error de auth)
localStorage.removeItem('token')
localStorage.removeItem('user')
```

### API Calls
```javascript
// Validar autenticación
GET /api/auth/me
Headers: { Authorization: 'Bearer <token>' }
Response: { success: true, data: { id, name, email } }
```

## 🎯 Próximos Pasos Sugeridos

1. **Funcionalidades financieras**
   - Crear modelo de Cuentas
   - Crear modelo de Transacciones
   - Implementar CRUD de cuentas

2. **Mejoras de autenticación**
   - Refresh tokens
   - Remember me
   - Reseteo de contraseña

3. **Dashboard**
   - Gráficos de gastos
   - Resumen financiero
   - Últimas transacciones

4. **Testing**
   - Tests de integración
   - Tests E2E con Cypress
   - Tests del ProtectedRoute

---

**Desarrollado por**: José Núñez  
**Fecha**: 17 de noviembre de 2025  
**Stack**: React + Express + TypeScript + Prisma + PostgreSQL
