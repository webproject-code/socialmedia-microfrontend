import axios from 'axios';
import apiClient from '../axios/axios-instance';
import {
  ChatsListService,
  ChatsListServiceResponse,
  checkOneOnOneChatStatusResponse,
  createGroupChatResponse,
  createOneOnOneChatResponse,
  FriendsWithNochatResponse,
} from '../types';
import { login } from './auth-services';
import { environment } from '../environments/environment';

// const userId = '66b30bbeaea1612592e8609b';

export const CallLoginFn = async () => {
  const userData = await login({
    email: 'kspatelsimform100@gmail.com',
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
  CallLoginFn();
  const { data } = await apiClient.get<ChatsListServiceResponse>(
    `/users/chats?query=${searchTerm ? searchTerm : ''}&cursor=${
      cursor ? cursor : ''
    }`
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
    const { data: hasChat } = await checkOneOnOneChatStatus(
      initiatorId,
      participantId
    );
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
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        success: false,
        error: 'Authentication token not found',
      };
    }
    try {
      const response = await axios.get<checkOneOnOneChatStatusResponse>(
        `/chats/one-on-one/${userId1}/${userId2}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          baseURL: environment.apiURL,
        }
      );

      return {
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data;
        }
      }
    }
  };
export const createGroupChat: ChatsListService['createGroupChat'] = async (
  groupData
) => {
  const { groupDescription, groupIcon, name, memberIds, ownerId } = groupData;
  const formData = new FormData();
  formData.append('groupDescription', groupDescription);
  formData.append('name', name);
  if (groupIcon) formData.append('groupIcon', groupIcon);
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
