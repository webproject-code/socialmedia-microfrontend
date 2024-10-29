import apiClient from '../axios/axios-instance';
import {
  ChatsListService,
  ChatsListServiceResponse,
  checkOneOnOneChatStatusResponse,
  createGroupChatResponse,
  createOneOnOneChatResponse,
  FriendsWithNochatResponse,
  // ChatsListUser,
} from '../types';
import { login } from './auth-services';

// const userId = '66b30bbeaea1612592e8609b';

export const CallLoginFn = async () => {
  const userData = await login({
    email: 'adwaniritz@gmail.com',
    password: '12345678',
  });
  if (userData) {
    localStorage.setItem('token', userData.accessToken);
  }
};

export const fetchChatList: ChatsListService['fetchChatList'] = async (
  searchTerm,
  cursor
) => {
  // CallLoginFn();
  const { data } = await apiClient.get<ChatsListServiceResponse>(
    `/users/chats?query=${searchTerm ? searchTerm : ''}&cursor=${
      cursor ? cursor : ''
    }`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return data;
};

export const fetchFriendWithNoChat: ChatsListService['fetchFriendWithNoChat'] =
  async (searchTerm, userId, cursor) => {
    const { data } = await apiClient.get<FriendsWithNochatResponse>(
      `/users/${userId}/friends?query=${searchTerm ? searchTerm : ''}&&cursor=${
        cursor ? cursor : ''
      }`
    );
    return data;
  };

export const createOneOnOneChat: ChatsListService['createOneOnOneChat'] =
  async (initiatorId, participantId) => {
    const hasChat = await checkOneOnOneChatStatus(initiatorId, participantId);
    if (hasChat) {
      return hasChat;
    }
    const { data } = await apiClient.post<createOneOnOneChatResponse>(
      `/chats/one-on-one/create`,
      {
        initiatorId: initiatorId,
        participantId: participantId,
      }
    );
    return data;
  };

export const checkOneOnOneChatStatus: ChatsListService['checkOneOnOneChatStatus'] =
  async (userId1: string, userId2: string) => {
    const { data } = await apiClient.get<checkOneOnOneChatStatusResponse>(
      `/chats/one-on-one/${userId1}/${userId2}`
    );
    return data;
  };

export const createGroupChat: ChatsListService['createGroupChat'] = async (
  groupData
) => {
  const { groupDescription, groupIcon, name, memberIds, ownerId } = groupData;
  const formData = new FormData();
  formData.append('groupDescription', groupDescription);
  formData.append('name', name);
  formData.append('groupIcon', groupIcon);
  formData.append('ownerId', ownerId);

  memberIds.forEach((memberId, index) => {
    formData.append(`memberIds[${index}]`, memberId);
  });

  const { data } = await apiClient.post<createGroupChatResponse>(
    '/chats/group/create',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};
