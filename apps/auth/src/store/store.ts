import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './authSlice';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create<AuthSlice>()(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
      }),
      { name: 'auth-mfe-store' }
    )
  )
);
