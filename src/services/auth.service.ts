import { authActions } from '../store/reducers/auth';
import { store } from '../store';
import AuthApi from '../api/auth.api';

const clearAuthState = () => {
  console.log('file-auth.service.ts clearAuthState!!!!!!!!!!!!!!!!!:');
  store.dispatch(authActions.setToken(null));
  store.dispatch(authActions.setUser(null));
  store.dispatch(authActions.setIsLoggedIn(false));
};

export const authService = {
  async login(credentials: Parameters<typeof AuthApi.login>[0]) {
    try {
      const response = await AuthApi.login(credentials);
      console.log('file-auth.service.ts LOGIN response:', response);
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

  async register(credentials: Parameters<typeof AuthApi.register>[0]) {
    try {
      const response = await AuthApi.register(credentials);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async refreshToken() {
    try {
      const response = await AuthApi.refreshToken();
      console.log('file-auth.service.ts refreshToken:', response.accessToken);
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
      console.log('file-auth.service.ts logout >>>:');
      await AuthApi.logout();
      clearAuthState();
    } catch (error) {
      if (!silent) {
        console.error('Logout error:', error);
      }
      throw error;
    }
  },

  async validateSession() {
    console.log('file-auth.service.ts validateSession >>>>>>>>>>>:');
    try {
      const response = await AuthApi.validateSession();
      console.log('file-auth.service.ts response:', response);
      store.dispatch(authActions.setUser(response.user));
      store.dispatch(authActions.setIsLoggedIn(true));
      return response.user;
    } catch (error) {
      clearAuthState();
      throw error;
    }
  },
};
