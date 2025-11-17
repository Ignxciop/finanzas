const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authService = {
  async register(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error en el registro');
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  async login(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error en el inicio de sesión');
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No hay token');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener usuario');
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

