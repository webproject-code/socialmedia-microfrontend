
import { UserProfile } from '@social-media/api';
import { StateCreator } from 'zustand';

export type ProfileSlice = {
  visitedUser: UserProfile | null;
  setVisitedUser: (visitedUser: UserProfile | null) => void;
};

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  visitedUser: null,
  setVisitedUser: (visitedUser: UserProfile | null) => set({ visitedUser }),
});
