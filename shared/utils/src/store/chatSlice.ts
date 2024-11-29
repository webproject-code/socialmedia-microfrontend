import { StateCreator } from 'zustand';

import { Message } from '@social-media/api';

export type ChatSlice = {
  searchResults: Message[];
  setSearchResults: (results: Message[]) => void;
  seenChats: Record<string, boolean>;
  setSeen: (chatId: string, seen: boolean) => void;
  vanishMessages: Record<string, Message[]>;
  addVanishMessage: (chatId: string, message: Message) => void;
  updateVanishMessage: (chatId: string, message: Message) => void;
  clearVanishMessages: (chatId: string) => void;
};

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  isTyping: false,
  searchResults: [],
  setSearchResults: (results) => set(() => ({ searchResults: results })),
  seenChats: {},
  setSeen: (chatId, seen) =>
    set((state) => ({
      seenChats: { ...state.seenChats, [chatId]: seen },
    })),
  vanishMessages: {},
  addVanishMessage: (chatId, message) =>
    set((state) => ({
      vanishMessages: {
        ...state.vanishMessages,
        [chatId]: [...(state.vanishMessages[chatId] || []), message],
      },
    })),
  updateVanishMessage: (chatId, message) =>
    set((state) => ({
      vanishMessages: {
        ...state.vanishMessages,
        [chatId]: state.vanishMessages[chatId]?.map((item) =>
          item.id === message.id ? message : item
        ),
      },
    })),
  clearVanishMessages: (chatId) =>
    set((state) => ({
      vanishMessages: {
        ...state.vanishMessages,
        [chatId]: [],
      },
    })),
});
