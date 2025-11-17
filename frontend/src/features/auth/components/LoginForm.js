import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});

      try {
        const result = await authService.login({
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
          submit: error.message || 'Error al iniciar sesión. Por favor intenta de nuevo.' 
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

      {/* Recordar y Olvidé contraseña */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Recordarme
          </label>
        </div>
        <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 font-semibold ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

export default LoginForm;
