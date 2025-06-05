import ky, { HTTPError } from 'ky';
import { store } from '../store';
import { API_URL } from '../constants/api.constants';
import { authActions } from '../store/reducers/auth';

const baseApi = ky.create({
  prefixUrl: API_URL,
  timeout: 15000,
  credentials: 'include',
});

const tokenInterceptor = (request: Request) => {
  const { token } = store.getState().auth;

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

const errorInterceptor = async (error: HTTPError) => {
  const response = error.response;
  // Handle 401 Unauthorized
  if (response.status === 401) {
    try {
      // Try to refresh token
      const { data } = await baseApi
        .post('auth/refresh-token')
        .json<{ data: { accessToken: string } }>();
      store.dispatch(authActions.setToken(data.accessToken));

      // Получаем параметры оригинального запроса
      const original = error.request;
      const method = original.method;
      const url = original.url;
      const headers = new Headers(original.headers);
      headers.set('Authorization', `Bearer ${data.accessToken}`);

      let body: BodyInit | undefined = undefined;
      if (error.options && error.options.body) body = error.options.body;
      return ky(url, { method, headers, body });
    } catch (refreshError) {
      console.error('refreshError', refreshError);
      store.dispatch(authActions.setToken(null));
      store.dispatch(authActions.setUser(null));
      store.dispatch(authActions.setIsLoggedIn(false));
      return refreshError;
    }
  }

  console.error('Error:', response.status, response.url);
  const contentType = response.headers.get('content-type');
  if (!contentType) return error;

  error.message = contentType?.includes('application/json')
    ? await response.json()
    : await response.text();

  return error;
};

const api = baseApi.extend({
  hooks: {
    beforeRequest: [tokenInterceptor],
    beforeError: [errorInterceptor],
  },
});

export default api;
