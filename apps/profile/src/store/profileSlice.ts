import { UserProfile } from '@social-media/api';
import { StateCreator } from 'zustand';

export type ProfileSlice = {
  selfUser: UserProfile | null;
  setSelfUser: (selfUser: UserProfile) => void;
};

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  selfUser: null,
  setSelfUser: (selfUser: UserProfile) => set({ selfUser }),
});
