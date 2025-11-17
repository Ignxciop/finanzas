# Frontend - Sistema de Finanzas

Frontend desarrollado con React para una aplicación de gestión financiera personal.

## 🏗️ Arquitectura

El proyecto sigue una estructura basada en features con separación clara de responsabilidades:

### Estructura de carpetas

```
src/
├── app/                        # Configuración principal de la app
│   ├── App.js                 # Componente raíz
│   └── routes/
│       └── AppRouter.js       # Definición de rutas
├── features/                   # Features por dominio
│   ├── auth/                  # Autenticación
│   │   ├── components/        # Componentes de auth
│   │   │   ├── LoginForm.js
│   │   │   └── RegisterForm.js
│   │   └── pages/             # Páginas de auth
│   │       ├── LoginPage.js
│   │       ├── RegisterPage.js
│   │       ├── TermsPage.js
│   │       ├── PrivacyPage.js
│   │       ├── ContactPage.js
│   │       └── HelpPage.js
│   └── home/                  # Feature home
│       └── pages/
│           └── HomePage.js    # Página principal
└── ui/                        # Componentes UI compartidos
    └── layout/
        ├── Navbar.js          # Barra de navegación
        └── Footer.js          # Pie de página
```

## 🚀 Tecnologías

- **React 19.2.0** - Biblioteca UI
- **React Router DOM** - Enrutamiento
- **Tailwind CSS v3.4.18** - Estilos
- **React Testing Library** - Testing

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

## 🎯 Scripts disponibles

```bash
# Desarrollo (puerto 3000)
npm start

# Build para producción
npm run build

# Ejecutar tests
npm test

# Eject (no recomendado)
npm run eject
```

## 🔌 Rutas disponibles

### Públicas
- `/` - Página principal (home)
- `/inicio-sesion` - Login
- `/registro` - Registro de usuario
- `/terminos` - Términos y condiciones
- `/privacidad` - Política de privacidad
- `/contacto` - Página de contacto
- `/ayuda` - Centro de ayuda

## 🎨 Características implementadas

### 1. Sistema de autenticación UI
- ✅ Formulario de login con validación
- ✅ Formulario de registro con validación
- ✅ Términos y condiciones
- ✅ Política de privacidad

### 2. Navegación
- ✅ Navbar responsive
- ✅ Footer con enlaces útiles
- ✅ Enrutamiento con React Router
- ✅ URLs en español

### 3. Páginas informativas
- ✅ Centro de ayuda con FAQs
- ✅ Página de contacto
- ✅ Documentos legales

### 4. Validaciones de formularios
- **Login:**
  - Email requerido y formato válido
  - Contraseña requerida (mínimo 6 caracteres)

- **Registro:**
  - Nombre requerido (mínimo 3 caracteres)
  - Email requerido y formato válido
  - Contraseña requerida (mínimo 6 caracteres)
  - Confirmación de contraseña
  - Checkbox de términos y condiciones

## 🎨 Componentes principales

### HomePage
Landing page con:
- Hero section con call-to-action
- 4 cards de características principales
- Diseño responsive

### LoginPage / RegisterPage
Páginas de autenticación con:
- Formularios validados
- Mensajes de error
- Enlaces a términos y privacidad
- Redirección entre páginas

### HelpPage
Centro de ayuda con:
- 15 preguntas frecuentes con acordeón
- 4 guías rápidas
- Enlaces a recursos adicionales

### ContactPage
Formulario de contacto con:
- Información del desarrollador
- Email y GitHub
- Formulario funcional

## 🔐 Integración con Backend

El frontend está preparado para conectarse al backend en:
```
http://localhost:5000/api
```

### Endpoints a integrar:
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login (pendiente backend)
- `GET /api/user/profile` - Perfil (pendiente backend)

## 🎯 Próximos pasos

1. ✅ Conectar formularios con API del backend
2. ⬜ Implementar manejo de estado global (Context API o Redux)
3. ⬜ Agregar almacenamiento de token JWT
4. ⬜ Implementar rutas protegidas
5. ⬜ Crear dashboard de usuario
6. ⬜ Implementar módulo de finanzas (cuentas, transacciones)
7. ⬜ Agregar notificaciones/alerts
8. ⬜ Mejorar accesibilidad (a11y)
9. ⬜ Agregar tests E2E con Cypress

## 🎨 Guía de estilos

### Colores principales
- **Primary**: Blue-600 (#2563EB)
- **Hover**: Blue-700 (#1D4ED8)
- **Success**: Green-600
- **Error**: Red-500
- **Gray scale**: De Gray-50 a Gray-900

### Tipografía
- Sistema de fuentes por defecto de Tailwind
- Tamaños: text-sm, text-base, text-lg, text-xl, etc.

## 📱 Responsive

Breakpoints de Tailwind CSS:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

Todos los componentes están optimizados para mobile-first.

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Generar coverage
npm test -- --coverage
```

## 📝 Convenciones de código

- Componentes en PascalCase
- Archivos de componentes con extensión `.js`
- Hooks personalizados con prefijo `use`
- Estilos inline con Tailwind utility classes
- Validaciones en el lado del cliente

## 👨‍💻 Desarrollador

**José Núñez**

## 📄 Licencia

Este proyecto es personal y educativo.
