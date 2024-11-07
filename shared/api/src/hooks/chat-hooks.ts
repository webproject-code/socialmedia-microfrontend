import { useQuery } from '@tanstack/react-query';
import { getGroupChat, getOneOnOneChat } from '../services/chat-services';

export const useOneOnOneChat = (chatId: string) => {
  return useQuery({
    queryKey: ['one-on-one', chatId],
    queryFn: () => getOneOnOneChat(chatId),
    enabled: chatId !== null,
  });
};

export const useGroupChat = (chatId: string) => {
  return useQuery({
    queryKey: ['group', chatId],
    queryFn: () => getGroupChat(chatId),
    enabled: chatId !== null,
  });
};
