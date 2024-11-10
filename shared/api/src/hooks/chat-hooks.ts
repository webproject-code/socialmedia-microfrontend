import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getGroupChat,
  getOneOnOneChat,
  updateOneOnOneChatSettings,
} from '../services/chat-services';
import { OneOnOneChat, OneOnOneChatSettings } from '../types';

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

export const useOneOnOneChatUpdate = (chatId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: OneOnOneChatSettings) =>
      updateOneOnOneChatSettings(chatId, settings),
    onSuccess: () => {
      queryClient.setQueryData(
        ['one-on-one', chatId],
        (oldData: OneOnOneChat) => {
          return {
            ...oldData,
            vanishMode: !oldData.vanishMode,
          };
        }
      );
    },
  });
};
