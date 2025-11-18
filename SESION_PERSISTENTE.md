# Persistencia de Sesión - Documentación

## 🎯 Funcionalidad Implementada

Se implementó un sistema completo de **persistencia de sesión** que permite a los usuarios mantener su sesión activa incluso después de cerrar el navegador, utilizando el checkbox "Recordarme" en el login.

## 🔑 Características Principales

### 1. Checkbox "Recordarme"
- ✅ **Marcado**: La sesión se guarda en `localStorage` (persistente)
- ✅ **No marcado**: La sesión se guarda en `sessionStorage` (temporal)

### 2. Comportamiento del Storage

#### localStorage (Recordarme = true)
```javascript
// Datos guardados de forma persistente
localStorage.setItem('token', 'JWT_TOKEN')
localStorage.setItem('user', '{"id":"123","name":"..."}')
localStorage.setItem('rememberMe', 'true')

// Persiste después de:
✅ Cerrar pestaña
✅ Cerrar navegador
✅ Reiniciar computadora
```

#### sessionStorage (Recordarme = false)
```javascript
// Datos guardados solo durante la sesión del navegador
sessionStorage.setItem('token', 'JWT_TOKEN')
sessionStorage.setItem('user', '{"id":"123","name":"..."}')
sessionStorage.setItem('rememberMe', 'false')

// Se elimina después de:
❌ Cerrar pestaña
❌ Cerrar navegador
```

## 🏗️ Arquitectura Implementada

### AuthContext (Context API)
Nuevo archivo: `frontend/src/context/AuthContext.js`

**Responsabilidades:**
- Manejar el estado global de autenticación
- Verificar sesión al cargar la aplicación
- Gestionar login/logout/register
- Decidir entre localStorage y sessionStorage

**Estado:**
```javascript
{
  user: { id, name, email } | null,
  isAuthenticated: boolean,
  loading: boolean
}
```

**Métodos:**
```javascript
login(credentials, rememberMe)    // Login con opción de recordar
register(userData)                // Registro (siempre persiste)
logout()                          // Cierra sesión y limpia storages
```

### Componentes Actualizados

#### 1. LoginForm.js
```javascript
const { login } = useAuth();
const [rememberMe, setRememberMe] = useState(false);

// Checkbox conectado
<input 
  type="checkbox"
  checked={rememberMe}
  onChange={(e) => setRememberMe(e.target.checked)}
/>

// Submit
await login(credentials, rememberMe);
```

#### 2. RegisterForm.js
```javascript
const { register } = useAuth();

// El registro siempre persiste la sesión
await register(userData);
```

#### 3. DashboardPage.js
```javascript
const { user, logout } = useAuth();

// Usuario disponible desde el contexto
// No necesita llamar a getCurrentUser()
```

#### 4. Navbar.js
```javascript
const { isAuthenticated, user, logout } = useAuth();

// Muestra botones diferentes según autenticación
{isAuthenticated ? (
  <span>Hola, {user?.name}</span>
  <button onClick={logout}>Cerrar Sesión</button>
) : (
  <Link to="/inicio-sesion">Iniciar Sesión</Link>
  <Link to="/registro">Registrarse</Link>
)}
```

#### 5. ProtectedRoute.js
```javascript
const { isAuthenticated, loading } = useAuth();

// Simplificado - usa el estado del contexto
// No necesita validar en cada montaje
```

## 🔄 Flujo de Autenticación

### Caso 1: Login CON "Recordarme"
```
1. Usuario marca checkbox ✅
2. Usuario ingresa credenciales
3. Backend valida → retorna JWT
4. AuthContext guarda en localStorage
5. isAuthenticated = true
6. Redirect a /dashboard

[Usuario cierra navegador]

7. Usuario vuelve a abrir la app
8. AuthContext verifica localStorage
9. Encuentra token → valida con backend
10. isAuthenticated = true
11. Usuario sigue autenticado ✅
```

### Caso 2: Login SIN "Recordarme"
```
1. Usuario NO marca checkbox ❌
2. Usuario ingresa credenciales
3. Backend valida → retorna JWT
4. AuthContext guarda en sessionStorage
5. isAuthenticated = true
6. Redirect a /dashboard

[Usuario cierra navegador]

7. Usuario vuelve a abrir la app
8. AuthContext verifica localStorage → vacío
9. AuthContext verifica sessionStorage → vacío
10. isAuthenticated = false
11. Usuario debe loguearse de nuevo ❌
```

### Caso 3: Registro
```
1. Usuario completa formulario
2. Backend crea cuenta → retorna JWT
3. AuthContext guarda en localStorage (siempre persiste)
4. isAuthenticated = true
5. Redirect a /dashboard

[Usuario cierra navegador]

6. Usuario vuelve → sesión persiste ✅
```

### Caso 4: Token Expirado
```
1. Usuario vuelve después de 7+ días
2. AuthContext verifica storage → encuentra token
3. Valida con backend → 401 Unauthorized
4. AuthContext limpia ambos storages
5. isAuthenticated = false
6. Redirect a /inicio-sesion
```

## 📁 Estructura de Archivos

### Nuevos Archivos
```
frontend/src/
└── context/
    └── AuthContext.js          ⭐ Nuevo - Context de autenticación
```

### Archivos Modificados
```
frontend/src/
├── index.js                    ✏️ Agregado AuthProvider
├── services/
│   └── authService.js          ✏️ Soporte sessionStorage + getToken()
├── app/
│   └── routes/
│       └── ProtectedRoute.js   ✏️ Usa AuthContext
├── features/
│   ├── auth/
│   │   └── components/
│   │       ├── LoginForm.js    ✏️ Checkbox + useAuth
│   │       └── RegisterForm.js ✏️ useAuth
│   └── dashboard/
│       └── pages/
│           └── DashboardPage.js ✏️ useAuth
└── ui/
    └── layout/
        └── Navbar.js            ✏️ Muestra usuario + logout
```

## 🔒 Seguridad

### Validación en Backend
```javascript
// AuthContext SIEMPRE valida con backend al cargar
useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      // Valida con GET /api/auth/me
      const response = await authService.getCurrentUser();
      setUser(response.data);
      setIsAuthenticated(true);
    }
  };
  
  checkAuth();
}, []);
```

### Limpieza de Datos
```javascript
// Al hacer logout se limpian AMBOS storages
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('rememberMe');
}
```

### Token en Header
```javascript
// authService busca token en ambos storages
getToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

// Siempre envía en Authorization header
headers: {
  'Authorization': `Bearer ${token}`
}
```

## 🧪 Cómo Probar

### Prueba 1: Recordarme = true
```bash
1. Ir a http://localhost:3000/inicio-sesion
2. Marcar ✅ "Recordarme"
3. Iniciar sesión
4. Verificar que estás en /dashboard
5. Abrir DevTools → Application → Local Storage
   - Debe contener: token, user, rememberMe: "true"
6. Cerrar completamente el navegador
7. Volver a abrir http://localhost:3000
8. ✅ Debes seguir autenticado (Navbar muestra tu nombre)
```

### Prueba 2: Recordarme = false
```bash
1. Hacer logout si estás autenticado
2. Ir a /inicio-sesion
3. NO marcar ❌ "Recordarme"
4. Iniciar sesión
5. Verificar que estás en /dashboard
6. Abrir DevTools → Application → Session Storage
   - Debe contener: token, user, rememberMe: "false"
7. Cerrar completamente el navegador
8. Volver a abrir http://localhost:3000
9. ❌ NO debes estar autenticado (Navbar muestra botones de login)
```

### Prueba 3: Navbar Dinámica
```bash
1. Estando NO autenticado:
   - Navbar muestra: "Iniciar Sesión" y "Registrarse"
   - NO muestra: Dashboard, Transacciones, etc.

2. Después de login:
   - Navbar muestra: "Hola, [Nombre]" y "Cerrar Sesión"
   - Muestra: Dashboard, Transacciones, Presupuesto, Reportes
```

### Prueba 4: Protección de Rutas
```bash
1. Sin autenticación, ir a http://localhost:3000/dashboard
2. ✅ Debe redirigir a /inicio-sesion

3. Después de login, ir a /dashboard
4. ✅ Debe mostrar el dashboard
```

## 🎨 UX Mejoradas

### Loading State
```javascript
// Mientras AuthContext verifica la sesión
if (loading) {
  return <Spinner text="Verificando autenticación..." />
}
```

### Navbar Contextual
```javascript
// Usuario autenticado
- Muestra nombre del usuario
- Botón "Cerrar Sesión" en rojo
- Links a funcionalidades (Dashboard, etc.)

// Usuario no autenticado
- Botón "Iniciar Sesión"
- Botón "Registrarse"
```

### Persistencia Transparente
```javascript
// El usuario NO necesita saber sobre tokens o storage
// Solo marca "Recordarme" y la app maneja todo
```

## 📊 Datos Guardados

### localStorage / sessionStorage
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": "{\"id\":\"123e4567-e89b-12d3-a456-426614174000\",\"name\":\"José Núñez\",\"email\":\"jose@example.com\"}",
  "rememberMe": "true"
}
```

## 🔧 Configuración

### AuthProvider en index.js
```javascript
import { AuthProvider } from './context/AuthContext';

<AuthProvider>
  <App />
</AuthProvider>
```

### useAuth Hook
```javascript
// En cualquier componente
import { useAuth } from '../context/AuthContext';

const { user, isAuthenticated, loading, login, logout, register } = useAuth();
```

## ⚡ Ventajas de Esta Implementación

1. **Context API**: Estado global sin prop drilling
2. **Validación en Backend**: Seguridad garantizada
3. **Dual Storage**: Soporte para sesiones persistentes y temporales
4. **UX Mejorada**: Navbar dinámica, loading states
5. **Código Limpio**: Componentes sin lógica de autenticación
6. **Escalable**: Fácil agregar refresh tokens, etc.

## 🚀 Próximas Mejoras Posibles

1. **Refresh Tokens**: Renovar token antes de expirar
2. **Remember Me Avanzado**: Configurar duración personalizada
3. **Multi-dispositivo**: Sincronizar sesiones
4. **Activity Tracking**: Cerrar sesión por inactividad
5. **Security**: Detección de sesiones sospechosas

---

**Desarrollado por**: José Núñez  
**Fecha**: 18 de noviembre de 2025  
**Stack**: React Context API + localStorage/sessionStorage + JWT
