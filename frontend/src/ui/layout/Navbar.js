import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Título */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold">Finanzas</h1>
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
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              Iniciar Sesión
            </button>
            <button className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
