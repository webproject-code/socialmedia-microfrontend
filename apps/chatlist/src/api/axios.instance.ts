import axios from 'axios';

export const axiosInstance = axios.create({
  //   baseURL: process.env.NX_API_URL || '',
  baseURL: 'http://test/api/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = process.env.NX_API_TEST_TOKEN || '';
    const token = 'token';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
