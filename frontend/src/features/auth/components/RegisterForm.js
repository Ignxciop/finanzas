import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});

      try {
        const result = await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        // Guardar token en localStorage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));

        // Redirigir al dashboard
        navigate('/dashboard');
      } catch (error) {
        setErrors({ 
          submit: error.message || 'Error al crear la cuenta. Por favor intenta de nuevo.' 
        });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error general */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
            errors.name 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="José Núñez"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
            errors.email 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
            errors.password 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
            errors.confirmPassword 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Términos y condiciones */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          Acepto los{' '}
          <Link to="/terminos" className="text-blue-600 hover:text-blue-500">
            términos y condiciones
          </Link>
          {' '}y la{' '}
          <Link to="/privacidad" className="text-blue-600 hover:text-blue-500">
            política de privacidad
          </Link>
        </label>
      </div>
      {errors.terms && (
        <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
      )}

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 font-semibold ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>
    </form>
  );
};

export default RegisterForm;
