import { ChatType } from '@social-media/api';
import { useSocket } from '@social-media/utils';
import { useEffect, useState } from 'react';

interface TypingUser {
  name: string;
  timestamp: number;
}

interface TypingStatus {
  chatType: ChatType;
}

export const useTypingStatus = ({ chatType }: TypingStatus) => {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Remove users who haven't typed for 3 seconds
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTypingUsers((prevUsers) =>
        prevUsers.filter((user) => now - user.timestamp < 3000)
      );
    }, 1000);

    // Handle user started typing
    const handleUserTyping = ({ name }: { name: string }) => {
      setTypingUsers((prevUsers) => {
        // Check if user is already in the list
        const userIndex = prevUsers.findIndex((user) => user.name === name);

        if (userIndex !== -1) {
          // Update existing user's timestamp
          const updatedUsers = [...prevUsers];
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            timestamp: Date.now(),
          };
          return updatedUsers;
        }

        // Add new user
        return [...prevUsers, { name, timestamp: Date.now() }];
      });
    };

    // Handle user stopped typing
    const handleUserStoppedTyping = ({ name }: { name: string }) => {
      setTypingUsers((prevUsers) =>
        prevUsers.filter((user) => user.name !== name)
      );
    };

    // Subscribe to socket events
    socket.on(`userTyping`, handleUserTyping);
    socket.on(`userStoppedTyping`, handleUserStoppedTyping);

    // Cleanup function
    return () => {
      clearInterval(cleanupInterval);
      socket.off(`userTyping`, handleUserTyping);
      socket.off(`userStoppedTyping`, handleUserStoppedTyping);
    };
  }, [socket]);

  // Format typing indicator message
  const typingMessage = (() => {
    if (typingUsers.length === 0) return '';
    if (typingUsers.length === 1 && chatType === 'ONE_ON_ONE')
      return `is typing...`;
    if (typingUsers.length === 1 && chatType === 'GROUP')
      return `${typingUsers[0].name} is typing...`;
    if (typingUsers.length === 2) {
      return `${typingUsers[0].name} and ${typingUsers[1].name} are typing...`;
    }
    return `${typingUsers[0].name} and ${
      typingUsers.length - 1
    } others are typing...`;
  })();

  return {
    typingMessage,
    typingUsers,
  };
};
