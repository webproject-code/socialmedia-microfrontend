import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addGroupChatMembers,
  getGroupChat,
  getGroupMembers,
  getOneOnOneChat,
  removeGroupChatMembers,
  updateGroupChat,
  updateOneOnOneChatSettings,
} from '../services/chat-services';
import { GroupChatSettings, OneOnOneChatSettings } from '../types';
import { useSocket } from '../context/SocketContext';

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

export const useGroupMembers = (chatId: string) => {
  return useQuery({
    queryKey: ['group-members', chatId],
    queryFn: () => getGroupMembers(chatId),
  });
};

export const useOneOnOneChatUpdate = (chatId: string) => {
  const { updateChatSettings } = useSocket();
  return useMutation({
    mutationFn: (settings: OneOnOneChatSettings) =>
      updateOneOnOneChatSettings(chatId, settings),
    onSuccess: () => {
      updateChatSettings(chatId, 'one-on-one');
    },
  });
};

export const useGroupChatUpdate = (chatId: string) => {
  const { updateChatSettings } = useSocket();

  return useMutation({
    mutationFn: ({
      settings,
      groupIcon,
    }: {
      settings: GroupChatSettings;
      groupIcon?: File;
    }) =>
      updateGroupChat(
        chatId,
        {
          name: settings?.name,
          groupDescription: settings?.groupDescription,
        },
        groupIcon
      ),
    onSuccess: () => {
      updateChatSettings(chatId, 'group');
    },
  });
};

export const useAddMembers = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ownerId,
      memberIds,
    }: {
      ownerId: string;
      memberIds: string[];
    }) => {
      return addGroupChatMembers(chatId, ownerId, memberIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group-members', chatId],
      });
    },
  });
};

export const useRemoveMembers = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ownerId,
      memberId,
    }: {
      ownerId: string;
      memberId: string;
    }) => removeGroupChatMembers(chatId, ownerId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group-members', chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ['group', chatId],
      });
    },
  });
};
