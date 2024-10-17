import axios, { AxiosError, AxiosResponse } from 'axios';
import { handleError } from './error-handlers';
import { environment } from '../environments/environment';

const apiClient = axios.create({
  baseURL: environment.apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Set up request interceptor for adding authorization token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error Handling through response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const handledError = handleError(error);
    return Promise.reject(handledError);
  }
);

export default apiClient;
