import api from '../api/baseApi';
import { authActions } from '../store/reducers/auth';
import { store } from '../store';
import AuthApi from '../api/auth.api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}



interface RefreshResponse {
  accessToken: string;
}

interface ValidateSessionResponse {
  user: User;
}

const clearAuthState = () => {
  store.dispatch(authActions.setToken(null));
  store.dispatch(authActions.setUser(null));
  store.dispatch(authActions.setIsLoggedIn(false));
};

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await AuthApi.login(credentials);
      
      store.dispatch(authActions.setToken(response.accessToken));
      store.dispatch(authActions.setUser(response.user));
      store.dispatch(authActions.setIsLoggedIn(true));
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      clearAuthState();
      throw error;
    }
  },

  async register(credentials: RegisterCredentials) {
    try {
      const response = await api.post('auth/register', {
        json: credentials,
        timeout: 10000,
      });
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async refreshToken() {
    try {
      const response = await api.post('auth/refresh-token', {
        credentials: 'include',
        timeout: 5000,
      }).json<RefreshResponse>();
      
      store.dispatch(authActions.setToken(response.accessToken));
      
      return response.accessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      await this.logout(true);
      throw error;
    }
  },

  async logout(silent = false) {
    try {
      // First clear the local state
      clearAuthState();
      
      // Then attempt to clear the server-side session
      await api.post('auth/logout', {
        credentials: 'include',
        timeout: 5000,
        retry: 0,
      });
    } catch (error) {
      if (!silent) {
        console.error('Logout error:', error);
      }
      throw error;
    }
  },

  async validateSession() {
    try {
      const response = await api.get('auth/profile', {
        credentials: 'include',
        timeout: 5000,
      }).json<ValidateSessionResponse>();
      
      store.dispatch(authActions.setUser(response.user));
      store.dispatch(authActions.setIsLoggedIn(true));
      
      return response.user;
    } catch (error) {
      clearAuthState();
      throw error;
    }
  }
};