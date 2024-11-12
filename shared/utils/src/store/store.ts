import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './authSlice';
import {
  RegistrationFormSlice,
  createRegistrationFormSlice,
} from './registrationFormSlice';
import { ProfileSlice, createProfileSlice } from './profileSlice';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create<
  AuthSlice & RegistrationFormSlice & ProfileSlice
>()(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
        ...createRegistrationFormSlice(...args),
        ...createProfileSlice(...args),
      }),
      { name: 'social-media-store' }
    ),
    { name: 'social-media-store' }
  )
);
