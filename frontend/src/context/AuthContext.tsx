import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verificar sesión al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Validar token con el backend
        const response = await authService.getCurrentUser();
        setUser(response.data!);
        setIsAuthenticated(true);
      } catch (error) {
        // Token inválido o expirado, limpiar
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<void> => {
    const result = await authService.login({ email, password });
    
    // Si el usuario marcó "Recordarme", usar localStorage, sino sessionStorage
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem('token', result.data!.token);
    storage.setItem('user', JSON.stringify(result.data!.user));
    storage.setItem('rememberMe', rememberMe.toString());

    // Si NO es remember, asegurar que localStorage esté limpio
    if (!rememberMe) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
    }

    setUser(result.data!.user);
    setIsAuthenticated(true);
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // El registro ahora NO inicia sesión automáticamente
    // Solo crea la cuenta y envía el email de verificación
    await authService.register({ name, email, password });
    
    // No establecer token ni usuario - requiere verificación de email primero
  };

  const logout = (): void => {
    authService.logout();
    
    // Limpiar ambos storages
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('rememberMe');

    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
