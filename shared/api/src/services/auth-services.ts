import apiClient from '../axios/axios-instance';
import { IAuthService, User } from '../types';

export const login: IAuthService['login'] = async (credential) => {
  const { data } = await apiClient.post<User>('/auth/login', credential);
  return data;
};
