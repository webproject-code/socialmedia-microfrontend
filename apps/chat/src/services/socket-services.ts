import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/useChatStore';

const SERVER_URL = 'http://localhost:3000';
export let socket: Socket;

export const connectSocket = (token: string) => {
  socket = io(SERVER_URL, {
    auth: {
      token: token,
    },
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
  });

  socket.on('connect', () => console.log('connected'));
  socket.on('disconnect', () => console.log('disconnected'));

  socket.on('newMessage', (message) => {
    useChatStore.getState().appendMessage(message);
  });

  // Handling events like typing, online status, and messages here:
  socket.on('typing', (isTyping: boolean) =>
    useChatStore.getState().setTyping(isTyping)
  );
  socket.on('onlineStatus', (isOnline: boolean) =>
    useChatStore.getState().setOnlineStatus(isOnline)
  );
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const sendMessage = (chatId: string, content: string) => {
  socket.emit('sendMessage', { chatId, content });
};

export const startTyping = (chatId: string, userId: string) => {
  socket.emit('userTyping', { chatId, userId });
};

export const stopTyping = (chatId: string, userId: string) => {
  socket.emit('userStoppedTyping', { chatId, userId });
};
