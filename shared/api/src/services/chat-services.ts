import apiClient from '../axios/axios-instance';
import { PaginatedResponse, QueryPagination } from '../types';
import {
  GroupChat,
  GroupChatSettings,
  IChatServices,
  Message,
  OneOnOneChat,
  OneOnOneChatSettings,
} from '../types/chat-types';

const ONE_ON_ONE_CHAT_ENDPOINT = '/chats/one-on-one';
const GROUP_CHAT_ENDPOINT = '/chats/groups';

export const getOneOnOneChat: IChatServices['getOneOnOneChat'] = async (
  chatId
) => {
  const { data } = await apiClient.get<OneOnOneChat>(
    `${ONE_ON_ONE_CHAT_ENDPOINT}/${chatId}`
  );
  return data;
};

export const updateOneOnOneChatSettings: IChatServices['updateOneOnOneChatSettings'] =
  async (chatId, settings) => {
    await apiClient.patch<OneOnOneChatSettings>(
      `${ONE_ON_ONE_CHAT_ENDPOINT}/${chatId}/settings`,
      settings
    );

    return 'Chat settings updated successfully!';
  };

export const getOneOnOneChatMessages: IChatServices['getOneOnOneChatMessages'] =
  async (chatId: string, params?: QueryPagination) => {
    const { search = '', cursor = '', take = '' } = params || {};
    const { data } = await apiClient.get<
      PaginatedResponse<'messages', Message[]>
    >(
      `${ONE_ON_ONE_CHAT_ENDPOINT}/${chatId}/messages?cursor=${cursor}&take=${take}&search=${search}`
    );
    return data;
  };

export const getGroupChat: IChatServices['getGroupChat'] = async (
  chatId: string
) => {
  const { data } = await apiClient.get<GroupChat>(
    `${GROUP_CHAT_ENDPOINT}/${chatId}`
  );
  return data;
};

export const updateGroupChat: IChatServices['updateGroupChat'] = async (
  chatId: string,
  settings: GroupChatSettings
) => {
  const { name, groupDescription, groupIcon } = settings;
  await apiClient.patch<GroupChatSettings>(
    `${GROUP_CHAT_ENDPOINT}/${chatId}/settings`,
    {
      settings: {
        name,
        groupDescription,
      },
      groupIcon,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return 'Chat settings updated successfully!';
};

export const getGroupChatMessages: IChatServices['getGroupChatMessages'] =
  async (chatId: string, params?: QueryPagination) => {
    const { search = '', cursor = '', take = '' } = params || {};

    const { data } = await apiClient.get<
      PaginatedResponse<'messages', Message[]>
    >(
      `${GROUP_CHAT_ENDPOINT}/${chatId}/messages?cursor=${cursor}&take=${take}&search=${search}`
    );
    return data;
  };

export const addGroupChatMembers: IChatServices['addGroupChatMembers'] = async (
  chatId: string,
  ownerId: string,
  memberIds: string[]
) => {
  await apiClient.patch(`${GROUP_CHAT_ENDPOINT}/${chatId}/add-members`, {
    ownerId,
    memberIds,
  });

  return 'Members added successfully!';
};

export const removeGroupChatMembers: IChatServices['removeGroupChatMembers'] =
  async (chatId: string, ownerId: string, memberId: string) => {
    await apiClient.patch(`${GROUP_CHAT_ENDPOINT}/${chatId}/remove-member`, {
      ownerId,
      memberId,
    });
    return 'Member removed successfully!';
  };

export const sendMessage: IChatServices['sendMessage'] = async (
  content: string,
  senderId: string,
  oneOnOneChatId?: string,
  groupChatId?: string
) => {
  const { data } = await apiClient.post<Omit<Message, 'sender'>>(
    `/messages/send`,
    {
      content,
      senderId,
      oneOnOneChatId,
      groupChatId,
    }
  );
  return data;
};

export const deleteMessage: IChatServices['deleteMessage'] = async (
  messageId: string
) => {
  await apiClient.patch(`/messages/delete/${messageId}`);
  return 'Message deleted successfully!';
};
