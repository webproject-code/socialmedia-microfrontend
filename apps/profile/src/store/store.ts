import { create } from 'zustand';
import { ProfileSlice, createProfileSlice } from './profileSlice';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create<ProfileSlice>()(
  devtools(
    persist(
      (...args) => ({
        ...createProfileSlice(...args),
      }),
      { name: 'profile-mfe-store' }
    )
  )
);
