import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Título */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              className="text-white text-2xl font-bold hover:text-blue-100 transition duration-300"
            >
              Finanzas
            </Link>
          </div>

          {/* Botones centrales */}
          <div className="hidden md:flex space-x-4">
            <button className="text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              Dashboard
            </button>
            <button className="text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              Transacciones
            </button>
            <button className="text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              Presupuesto
            </button>
            <button className="text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              Reportes
            </button>
          </div>

          {/* Botones de autenticación */}
          <div className="flex space-x-3">
            <Link 
              to="/inicio-sesion"
              className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/registro"
              className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
