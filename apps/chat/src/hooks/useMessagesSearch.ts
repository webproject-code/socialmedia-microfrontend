import {
  ChatType,
  getGroupChatMessages,
  getOneOnOneChatMessages,
} from '@social-media/api';
import { useChatStore } from '../store/useChatStore';

interface MessageSearchOptions {
  chatType: ChatType;
  chatId: string;
}
export const useMessagesSearch = ({
  chatId,
  chatType,
}: MessageSearchOptions) => {
  const { searchResults, setSearchResults } = useChatStore();

  const searchMessages = async (query: string) => {
    if (!chatId) return;

    try {
      if (chatType === ChatType.ONE_ON_ONE) {
        const { messages } = await getOneOnOneChatMessages(chatId, {
          search: query,
        });
        setSearchResults(messages);
      } else if (chatType === ChatType.GROUP) {
        const { messages } = await getGroupChatMessages(chatId, {
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
