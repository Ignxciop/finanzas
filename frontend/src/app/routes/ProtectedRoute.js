import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Validación en backend
        await authService.getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        // Si falla la validación, limpiar localStorage
        authService.logout();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  return children;
};

export default ProtectedRoute;
