import { User, UserProfile } from '@social-media/api';
import { StateCreator } from 'zustand';

export type ProfileSlice = {
  user: User | null;
  visitedUser: UserProfile | null;
  setUser: (user: User | null) => void;
  setVisitedUser: (visitedUser: UserProfile | null) => void;
};

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  user: null,
  visitedUser: null,
  setUser: (user: User | null) => set({ user }),
  setVisitedUser: (visitedUser: UserProfile | null) => set({ visitedUser }),
});
