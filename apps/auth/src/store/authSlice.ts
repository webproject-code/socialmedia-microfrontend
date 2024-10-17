import { User } from '@social-media/api';
import { StateCreator } from 'zustand';

export type AuthSlice = {
  isAuthenticated: boolean;
  user: User | null;
  login: (payload: { isAuthenticated: boolean; user: User | null }) => void;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isAuthenticated: false,
  user: null,
  login: (payload) => {
    set({
      isAuthenticated: payload.isAuthenticated,
      user: payload.user,
    });
    payload.user && localStorage.setItem('token', payload.user?.accessToken);
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem('token');
  },
});
