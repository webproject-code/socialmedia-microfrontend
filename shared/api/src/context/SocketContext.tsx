import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
  socket: null | Socket;
  isConnected: boolean;
  joinChat: (chatId: string, chatType: string) => void;
  startTyping: (chatId: string, name: string) => void;
  stopTyping: (chatId: string, name: string) => void;
  sendMessage: (
    chatId: string,
    senderId: string,
    content: string,
    vanishMode: boolean
  ) => void;
  deleteMessage: (
    chatId: string,
    messageId: string,
    senderId: string,
    vanishMode: boolean
  ) => void;
  sendGroupMessage: (chatId: string, senderId: string, content: string) => void;
  deleteGroupMessage: (chatId: string, messageId: string) => void;
  updateChatSettings: (chatId: string, chatType: string) => void;
  sendFriendRequest: (senderId: string, receiverId: string) => void;
  acceptFriendRequest: (senderId: string, receiverId: string) => void;
  removeFriend: (senderId: string, receiverId: string) => void;
  rejectFriendRequest: (senderId: string, receiverId: string) => void;
  cancelFriendRequest: (senderId: string, receiverId: string) => void;
  createGroupChat: (members: string[]) => void;
  addGroupMembers: (members: string[]) => void;
  removeGroupMember: (memberId: string) => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinChat: () => {
    return;
  },
  startTyping: () => {
    return;
  },
  stopTyping: () => {
    return;
  },
  sendMessage: () => {
    return;
  },
  deleteMessage: () => {
    return;
  },
  sendGroupMessage: () => {
    return;
  },
  deleteGroupMessage: () => {
    return;
  },
  updateChatSettings: () => {
    return;
  },
  sendFriendRequest: () => {
    return;
  },
  acceptFriendRequest: () => {
    return;
  },
  removeFriend: () => {
    return;
  },
  rejectFriendRequest: () => {
    return;
  },
  cancelFriendRequest: () => {
    return;
  },
  createGroupChat: () => {
    return;
  },
  addGroupMembers: () => {
    return;
  },
  removeGroupMember: () => {
    return;
  },
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socketInstance = io(
      'https://social-media-backend-j5dj.onrender.com',
      {
        auth: {
          token: token,
        },
      }
    );

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('socket connected');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('socket disconnected');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinChat = (chatId: string, chatType: string) => {
    if (socket) socket.emit('joinChat', { chatId, chatType });
  };

  const startTyping = (chatId: string, name: string) => {
    if (socket) socket.emit('userTyping', { chatId, name });
  };

  const stopTyping = (chatId: string, name: string) => {
    if (socket) socket.emit('userStoppedTyping', { chatId, name });
  };

  const sendMessage = (
    chatId: string,
    senderId: string,
    content: string,
    vanishMode: boolean
  ) => {
    if (socket)
      socket.emit(`sendMessage`, { chatId, senderId, content, vanishMode });
  };

  const deleteMessage = (
    chatId: string,
    messageId: string,
    senderId: string,
    vanishMode: boolean
  ) => {
    if (socket)
      socket.emit(`deleteMessage`, { chatId, messageId, senderId, vanishMode });
  };

  const deleteGroupMessage = (chatId: string, messageId: string) => {
    if (socket) socket.emit(`deleteGroupMessage`, { chatId, messageId });
  };

  const sendGroupMessage = (
    chatId: string,
    senderId: string,
    content: string
  ) => {
    if (socket) socket.emit(`sendGroupMessage`, { chatId, senderId, content });
  };

  const updateChatSettings = (chatId: string, chatType: string) => {
    if (socket) socket.emit('updateChatSettings', { chatId, chatType });
  };

  const sendFriendRequest = (senderId: string, receiverId: string) => {
    if (socket) socket.emit('sendFriendRequest', { senderId, receiverId });
  };

  const acceptFriendRequest = (senderId: string, receiverId: string) => {
    if (socket) socket.emit('acceptFriendRequest', { senderId, receiverId });
  };

  const removeFriend = (senderId: string, receiverId: string) => {
    if (socket) socket.emit('removeFriend', { senderId, receiverId });
  };

  const rejectFriendRequest = (senderId: string, receiverId: string) => {
    if (socket) socket.emit('rejectFriendRequest', { senderId, receiverId });
  };

  const cancelFriendRequest = (senderId: string, receiverId: string) => {
    if (socket) socket.emit('cancelFriendRequest', { senderId, receiverId });
  };

  const createGroupChat = (members: string[]) => {
    if (socket) socket.emit('createGroupChat', { members });
  };

  const addGroupMembers = (members: string[]) => {
    if (socket) socket.emit('addGroupMembers', { members });
  };

  const removeGroupMember = (memberId: string) => {
    if (socket) socket.emit('removeGroupMember', { memberId });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinChat,
        startTyping,
        stopTyping,
        sendMessage,
        deleteMessage,
        sendGroupMessage,
        deleteGroupMessage,
        updateChatSettings,
        sendFriendRequest,
        acceptFriendRequest,
        removeFriend,
        rejectFriendRequest,
        cancelFriendRequest,
        createGroupChat,
        addGroupMembers,
        removeGroupMember,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
