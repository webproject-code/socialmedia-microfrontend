import { useChatStore } from '../store/useChatStore';
import {
  getGroupChatMessages,
  getOneOnOneChatMessages,
} from '@social-media/api';

export const useMessagesSearch = () => {
  const { currentChatId, currentChatType, searchResults, setSearchResults } =
    useChatStore();

  const searchMessages = async (query: string) => {
    if (!currentChatId) return;

    try {
      if (currentChatType === 'ONE_ON_ONE') {
        const { messages } = await getOneOnOneChatMessages(currentChatId, {
          search: query,
        });
        setSearchResults(messages);
      } else if (currentChatType === 'GROUP') {
        const { messages } = await getGroupChatMessages(currentChatId, {
          search: query,
        });
        setSearchResults(messages);
      }
    } catch (error) {
      console.error('Message search failed:', error);
    }
  };
  return { searchResults, searchMessages };
};
