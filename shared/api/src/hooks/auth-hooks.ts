import { useMutation } from '@tanstack/react-query';
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from '../services/auth-services';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credential: { email: string; password: string }) =>
      login(credential),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (credential: {
      password: string;
      confirmPassword: string;
      token: string;
    }) => resetPassword(credential),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      profilePicture: File | undefined;
    }) => register(data),
  });
};
