// import { io, Socket } from 'socket.io-client';
// import { useChatStore } from '../store/useChatStore';

// const SERVER_URL = 'http://localhost:3000';
// export let socket: Socket;

// export const connectSocket = (
//   token: string,
//   chatId: string,
//   chatType: 'ONE_ON_ONE' | 'GROUP'
// ) => {
//   socket = io(SERVER_URL, {
//     auth: {
//       token: token,
//     },
//   });

//   socket.on('connect_error', (error) => {
//     console.error('Socket connection error:', error.message);
//   });

//   socket.on('connect', () => {
//     console.log('connected');

//     socket.emit('joinChat', { chatId, chatType });
//   });

//   socket.on('receiveMessage', (message) => {
//     console.log('message received', message);
//     useChatStore.getState().appendMessage(message);
//   });

//   socket.on('receiveGroupMessage', (message) => {
//     useChatStore.getState().appendMessage(message);
//   });

//   socket.on('userTyping', ({ userId }: { userId: string }) => {
//     console.log('user is typing', userId);
//     useChatStore.getState().setTyping(true);
//   });

//   socket.on('userStoppedTyping', ({ userId }: { userId: string }) => {
//     console.log('user stopped typing', userId);
//     useChatStore.getState().setTyping(false);
//   });

//   socket.on('onlineStatus', (isOnline: boolean) =>
//     useChatStore.getState().setOnlineStatus(isOnline)
//   );
// };

// export const disconnectSocket = () => {
//   if (socket) socket.disconnect();
// };

// export const sendMessage = (chatId: string, content: string) => {
//   socket.emit('sendMessage', { chatId, content });
// };

// export const sendGroupMessage = (groupId: string, content: string) => {
//   socket.emit('sendGroupMessage', { groupId, content });
// };

// export const startTyping = (chatId: string, userId: string) => {
//   socket.emit('userTyping', { chatId, userId });
// };

// export const stopTyping = (chatId: string, userId: string) => {
//   socket.emit('userStoppedTyping', { chatId, userId });
// };
