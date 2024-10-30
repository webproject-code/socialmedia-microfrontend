import { Message } from '@social-media/api';
import { StateCreator } from 'zustand';

export interface ChatSlice {
  currentChatId: string | null;
  currentChatType: 'ONE_ON_ONE' | 'GROUP' | null;
  searchResults: Message[];
  isTyping: boolean;
  isOnline: boolean;
  vanishMode: boolean;
  messages: Message[];
  setSearchResults: (results: Message[]) => void;
  appendMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setCurrentChat: (chatId: string, chatType: 'ONE_ON_ONE' | 'GROUP') => void;
  setTyping: (status: boolean) => void;
  setOnlineStatus: (status: boolean) => void;
  setVanishMode: (status: boolean) => void;
}

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  currentChatId: null,
  currentChatType: null,
  isTyping: false,
  isOnline: false,
  vanishMode: false,
  messages: [],
  searchResults: [],
  setSearchResults: (results) => set(() => ({ searchResults: results })),
  appendMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set(() => ({ messages })),
  setCurrentChat: (chatId, chatType) =>
    set(() => ({ currentChatId: chatId, currentChatType: chatType })),
  setTyping: (status) => set(() => ({ isTyping: status })),
  setOnlineStatus: (status) => set(() => ({ isOnline: status })),
  setVanishMode: (status) => set(() => ({ vanishMode: status })),
});
