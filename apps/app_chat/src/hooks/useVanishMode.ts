import { Message } from '@social-media/api';
import { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';

export const useVanishMode = () => {
  const [isVanishModeActive, setIsVanishModeActive] = useState(false);
  const { currentChatId, setMessages } = useChatStore();

  const activateVanishMode = () => setIsVanishModeActive(true);
  const deactivateVanishMode = () => setIsVanishModeActive(false);

  useEffect(() => {
    const updatedMessagesArray = (messages: Message[]) => {
      return messages.filter(
        (message) => message.oneOnOneChatId !== currentChatId
      );
    };

    let vanishTimeout: NodeJS.Timeout;

    if (isVanishModeActive && currentChatId) {
      vanishTimeout = setTimeout(() => {
        setMessages((messages) => updatedMessagesArray(messages));
      }, 5000); // example: 5 seconds vanish timeout
    }

    return () => clearTimeout(vanishTimeout);
  }, [isVanishModeActive, currentChatId, setMessages]);

  return { isVanishModeActive, activateVanishMode, deactivateVanishMode };
};
