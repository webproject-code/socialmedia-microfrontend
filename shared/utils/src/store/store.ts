import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './authSlice';
import { ProfileSlice, createProfileSlice } from './profileSlice';
import {
  RegistrationFormSlice,
  createRegistrationFormSlice,
} from './registrationFormSlice';
import { ChatSlice, createChatSlice } from './chatSlice';

export const useStore = create<
  AuthSlice & RegistrationFormSlice & ProfileSlice & ChatSlice
>()(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
        ...createRegistrationFormSlice(...args),
        ...createProfileSlice(...args),
        ...createChatSlice(...args),
      }),
      { name: 'social-media-store' }
    ),
    { name: 'social-media-store' }
  )
);
