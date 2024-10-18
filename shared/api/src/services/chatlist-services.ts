import apiClient from '../axios/axios-instance';
import { User } from '../types';
import { login } from './auth-services';

export const getChatList = async (userId?: string): Promise<User[]> => {
  const userData = await login({
    email: 'adwaniritz@gmail.com',
    password: '12345678',
  });
  if (userData) {
    localStorage.setItem('token', userData.accessToken);
  }
  const { data } = await apiClient.get<User[]>('/users', {
    params: { userId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
};
