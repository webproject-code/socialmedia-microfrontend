import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './authSlice';
import {
  RegistrationFormSlice,
  createRegistrationFormSlice,
} from './registrationFormSlice';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create<AuthSlice & RegistrationFormSlice>()(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
        ...createRegistrationFormSlice(...args),
      }),
      { name: 'auth-mfe-store' }
    )
  )
);
