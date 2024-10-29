import { create } from 'zustand';

interface ChatState {
  currentChatId: string | null;
  currentChatType: 'ONE_ON_ONE' | 'GROUP' | null;
  isTyping: boolean;
  isOnline: boolean;
  vanishMode: boolean;
  setCurrentChat: (chatId: string, chatType: 'ONE_ON_ONE' | 'GROUP') => void;
  setTyping: (status: boolean) => void;
  setOnlineStatus: (status: boolean) => void;
  setVanishMode: (status: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentChatId: null,
  currentChatType: null,
  isTyping: false,
  isOnline: false,
  vanishMode: false,
  setCurrentChat: (chatId, chatType) =>
    set(() => ({ currentChatId: chatId, currentChatType: chatType })),
  setTyping: (status) => set(() => ({ isTyping: status })),
  setOnlineStatus: (status) => set(() => ({ isOnline: status })),
  setVanishMode: (status) => set(() => ({ vanishMode: status })),
}));
