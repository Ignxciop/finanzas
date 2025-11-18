import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../ui/layout/Navbar';
import Footer from '../ui/layout/Footer';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  const location = useLocation();
  
  // Páginas que NO deben mostrar el footer
  const noFooterPages = [
    '/inicio-sesion', 
    '/registro', 
    '/verificar-email', 
    '/olvidar-contrasena', 
    '/restablecer-contrasena',
    '/terminos', 
    '/privacidad', 
    '/contacto', 
    '/ayuda'
  ];
  const showFooter = !noFooterPages.includes(location.pathname);
  
  // Rutas protegidas que usan DashboardLayout (no necesitan Navbar/Footer)
  const protectedRoutes = ['/dashboard', '/cuentas', '/transacciones', '/presupuesto', '/reportes', '/perfil'];
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="App flex flex-col min-h-screen">
      {!isProtectedRoute && <Navbar />}
      <main className="flex-1">
        <AppRouter />
      </main>
      {showFooter && !isProtectedRoute && <Footer />}
    </div>
  );
}

export default App;
