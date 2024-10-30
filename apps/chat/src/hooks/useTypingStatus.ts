import { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { socket } from '../services/socket-services';
export const useTypingStatus = () => {
  const { currentChatId } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUserId, setTypingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentChatId || !socket) return;

    const handleUserTyping = ({ userId }: { userId: string }) => {
      setTypingUserId(userId);
      setIsTyping(true);
    };

    const handleUserStoppedTyping = ({ userId }: { userId: string }) => {
      if (userId === typingUserId) {
        setIsTyping(false);
        setTypingUserId(null);
      }
    };

    socket.on('userTyping', handleUserTyping);
    socket.on('userStoppedTyping', handleUserStoppedTyping);

    return () => {
      socket.off('userTyping', handleUserTyping);
      socket.off('userStoppedTyping', handleUserStoppedTyping);
    };
  }, [currentChatId, typingUserId]);

  return { isTyping, typingUserId };
};
