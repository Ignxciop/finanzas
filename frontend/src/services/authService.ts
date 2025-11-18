import { LoginDTO, RegisterDTO, ApiResponse, UserWithToken, User, RegisterResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authService = {
  async register(data: RegisterDTO): Promise<ApiResponse<RegisterResponse>> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<RegisterResponse> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error en el registro');
    }

    return result;
  },

  async login(data: LoginDTO): Promise<ApiResponse<UserWithToken>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<UserWithToken> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error en el inicio de sesión');
    }

    return result;
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    // Buscar token en localStorage o sessionStorage
    let token = localStorage.getItem('token');
    if (!token) {
      token = sessionStorage.getItem('token');
    }
    
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

    const result: ApiResponse<User> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al obtener usuario');
    }

    return result;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('rememberMe');
  },

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
  },

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },

  async deleteAccount(): Promise<ApiResponse> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No hay token');
    }

    const response = await fetch(`${API_BASE_URL}/auth/account`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al eliminar cuenta');
    }

    return result;
  },
};

