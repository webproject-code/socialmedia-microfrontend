import { Message } from '@social-media/api';
import { StateCreator } from 'zustand';

export type ChatSlice = {
  searchResults: Message[];
  isTyping: boolean;
  isOnline: boolean;
  vanishMode: boolean;
  setSearchResults: (results: Message[]) => void;

  setTyping: (status: boolean) => void;
};

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  isTyping: false,
  isOnline: false,
  vanishMode: false,
  searchResults: [],
  setSearchResults: (results) => set(() => ({ searchResults: results })),
  setTyping: (status) => set(() => ({ isTyping: status })),
});
