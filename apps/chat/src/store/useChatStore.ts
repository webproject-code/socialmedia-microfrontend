import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ChatSlice, createChatSlice } from './chatSlice';

export const useChatStore = create<ChatSlice>()(
  devtools(
    persist(
      (...args) => ({
        ...createChatSlice(...args),
      }),
      { name: 'chat-mfe-store' }
    ),
    { name: 'chat-mfe-store' }
  )
);
