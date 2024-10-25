import apiClient from '../axios/axios-instance';
import { IAuthService, User } from '../types';

export const login: IAuthService['login'] = async (credential) => {
  const { data } = await apiClient.post<User>('/auth/login', credential);
  return data;
};

export const forgotPassword: IAuthService['forgotPassword'] = async (email) => {
  await apiClient.post('/auth/forgot-password', {
    email,
    redirectUrl: `${window.location.origin}/auth/reset-password`,
  });
  return 'Password reset email sent!';
};

export const resetPassword: IAuthService['resetPassword'] = async (
  credential
) => {
  const { password, confirmPassword, token } = credential;
  await apiClient.post(`/auth/reset-password?token=${token}`, {
    password,
    confirmPassword,
  });
  return 'Password reset successfully!';
};

export const register: IAuthService['register'] = async (data) => {
  const { name, email, password, confirmPassword, profilePicture } = data;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('confirmPassword', confirmPassword);
  if (profilePicture) {
    formData.append('profilePicture', profilePicture);
  }
  const { data: user } = await apiClient.post<User>(
    '/auth/register',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return user;
};
