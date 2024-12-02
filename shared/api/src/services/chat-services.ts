import apiClient from '../axios/axios-instance';
import { PaginatedResponse, QueryPagination } from '../types';
import {
  GroupChat,
  GroupChatSettings,
  IChatServices,
  Message,
  OneOnOneChat,
} from '../types/chat-types';

const ONE_ON_ONE_CHAT_ENDPOINT = '/chats/one-on-one';
const GROUP_CHAT_ENDPOINT = '/chats/group';

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
    const { data } = await apiClient.patch<OneOnOneChat>(
      `${ONE_ON_ONE_CHAT_ENDPOINT}/${chatId}/settings`,
      {
        settings,
      }
    );

    return data;
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
  settings: GroupChatSettings,
  groupIcon?: File
) => {
  const formData = new FormData();
  formData.append('settings', JSON.stringify(settings));
  if (groupIcon) {
    formData.append('groupIcon', groupIcon);
  }
  const { data } = await apiClient.patch<GroupChat>(
    `${GROUP_CHAT_ENDPOINT}/${chatId}/settings`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
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
  const { data } = await apiClient.patch(
    `${GROUP_CHAT_ENDPOINT}/${chatId}/add-members`,
    {
      ownerId,
      memberIds,
    }
  );

  return data;
};

export const removeGroupChatMembers: IChatServices['removeGroupChatMembers'] =
  async (chatId: string, ownerId: string, memberId: string) => {
    const { data } = await apiClient.patch(
      `${GROUP_CHAT_ENDPOINT}/${chatId}/remove-member`,
      {
        ownerId,
        memberId,
      }
    );
    return data;
  };

export const getGroupMembers: IChatServices['getGroupMembers'] = async (
  chatId: string
) => {
  const { data } = await apiClient.get(
    `${GROUP_CHAT_ENDPOINT}/${chatId}/members`
  );
  return data;
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
