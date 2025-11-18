import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Crear una cuenta
            </h2>
            <p className="text-gray-600">
              Únete a Finanzas y comienza a gestionar tu dinero
            </p>
          </div>

          {/* Form */}
          <RegisterForm />

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿Ya tienes cuenta?</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/inicio-sesion"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Al registrarte, aceptas nuestros{' '}
          <Link to="/terminos" className="text-blue-600 hover:text-blue-500">
            términos de servicio
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
