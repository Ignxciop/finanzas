import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../ui/layout/Navbar';
import Footer from '../ui/layout/Footer';
import AppRouter from './routes/AppRouter';

function App() {
  const location = useLocation();
  
  // Páginas que NO deben mostrar el footer
  const noFooterPages = ['/inicio-sesion', '/registro', '/terminos', '/privacidad', '/contacto', '/ayuda'];
  const showFooter = !noFooterPages.includes(location.pathname);

  return (
    <div className="App">
      <Navbar />
      <AppRouter />
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
