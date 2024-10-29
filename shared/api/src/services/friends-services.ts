import apiClient from '../axios/axios-instance';
import {
  IFriendsService,
  FriendRequest,
  PaginatedResponse,
  Friend,
  FriendRequests,
  QueryPagination,
} from '../types';

// fetch friends
export const fetchFriends: IFriendsService['fetchFriends'] = async (
  userId: string,
  params?: QueryPagination
) => {
  const { query = '', cursor = '', take = '' } = params || {};

  const { data } = await apiClient.get<PaginatedResponse<'friends', Friend[]>>(
    `/users/${userId}/friends?cursor=${cursor}&take=${take}&query=${query}`
  );
  return data;
};

// fetch friend requests
export const fetchFriendRequests: IFriendsService['fetchFriendRequests'] =
  async (userId: string, params?: QueryPagination) => {
    const { query = '', cursor = '', take = '' } = params || {};
    const { data } = await apiClient.get<
      PaginatedResponse<'friendRequests', FriendRequests>
    >(
      `/users/${userId}/friend-requests?cursor=${cursor}&take=${take}&query=${query}`
    );
    return data;
  };

// fetch suggested friends
export const fetchSuggestedFriends: IFriendsService['fetchSuggestedFriends'] =
  async (userId: string, params?: QueryPagination) => {
    const { query = '', cursor = '', take = '' } = params || {};
    const { data } = await apiClient.get<
      PaginatedResponse<'suggestedFriends', Friend[]>
    >(
      `/users/${userId}/suggested-friends?cursor=${cursor}&take=${take}&query=${query}`
    );
    return data;
  };

// fetch mutual friends
export const fetchMutualFriends: IFriendsService['fetchMutualFriends'] = async (
  userId: string,
  friendId: string,
  params?: QueryPagination
) => {
  const { query = '', cursor = '', take = '' } = params || {};
  const { data } = await apiClient.get<
    PaginatedResponse<'mutualFriends', Friend[]>
  >(
    `/users/${userId}/mutual-friends/${friendId}?cursor=${cursor}&take=${take}&query=${query}`
  );
  return data;
};

//  send friend request
export const sendFriendRequest: IFriendsService['sendFriendRequest'] = async (
  userId: string,
  friendId: string
) => {
  const { data } = await apiClient.post<{ friendRequest: FriendRequest }>(
    `/friend-requests/`,
    {
      senderId: userId,
      receiverId: friendId,
    }
  );
  return data;
};

// accept or reject friend request
export const acceptOrRejectFriendRequest: IFriendsService['acceptOrRejectFriendRequest'] =
  async (friendId: string, status: 'ACCEPTED' | 'REJECTED') => {
    await apiClient.put<string>(`/friend-requests/${friendId}`, {
      status,
    });
    return 'Friend request Updated!';
  };

// cancle friend request
export const cancleFriendRequest: IFriendsService['cancleFriendRequest'] =
  async (friendId: string) => {
    await apiClient.delete(`/friend-requests/${friendId}`);
    return 'Friend request Cancelled!';
  };

// remove friend
export const removeFriend: IFriendsService['removeFriend'] = async (
  userId: string,
  friendId: string
) => {
  await apiClient.post(`/users/${userId}/unfriend/${friendId}`);
  return 'Friend removed successfully';
};
