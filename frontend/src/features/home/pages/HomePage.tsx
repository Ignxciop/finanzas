import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
      {/* Hero Section */}
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bienvenido a <span className="text-blue-600">Finanzas</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tu plataforma integral para gestionar tus finanzas personales de manera inteligente y eficiente.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/registro" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl">
                Comenzar Ahora
              </Link>
              <Link to="/inicio-sesion" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl border-2 border-blue-600">
                Iniciar Sesión
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              ¿Qué puedes hacer?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Visualiza tus finanzas con gráficos intuitivos.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Transacciones</h3>
                <p className="text-sm text-gray-600">
                  Registra tus ingresos y gastos fácilmente.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Presupuesto</h3>
                <p className="text-sm text-gray-600">
                  Planifica y controla tus gastos.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Reportes</h3>
                <p className="text-sm text-gray-600">
                  Genera reportes detallados para análisis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
