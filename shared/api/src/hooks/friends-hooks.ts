import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  acceptOrRejectFriendRequest,
  cancelFriendRequest,
  fetchFriends,
  fetchMutualFriends,
  removeFriend,
  sendFriendRequest,
} from '../services/friends-services';
import { FriendRequest, QueryPagination } from '../types';

// fetch friends
export const useFriends = (userId: string, params?: QueryPagination) => {
  return useQuery({
    queryKey: ['friends', userId],
    queryFn: () => fetchFriends(userId, params),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
  });
};

// mutual friends
export const useMutualFriends = (
  userId: string,
  friendId: string,
  params?: QueryPagination
) => {
  return useQuery({
    queryKey: ['mutualFriends', userId, friendId],
    queryFn: () => fetchMutualFriends(userId, friendId, params),
  });
};

// suggested friends
export const useSuggestedFriends = (
  userId: string,
  params?: QueryPagination
) => {
  return useQuery({
    queryKey: ['suggestedFriends', userId],
    queryFn: () => fetchFriends(userId, params),
  });
};

// friend request
export const useFriendRequests = (userId: string, params?: QueryPagination) => {
  return useQuery({
    queryKey: ['friendRequests', userId],
    queryFn: () => fetchFriends(userId, params),
  });
};

// remove friend
export const useRemoveFriend = (userId: string, friendId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeFriend(userId, friendId),
    onSuccess: (data) => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], data);
    },
  });
};

// sent friend request
export const useSendFriendRequest = (userId: string, friendId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => sendFriendRequest(userId, friendId),
    onSuccess: () => {
      queryClient.setQueryData(
        ['friendshipStatus', userId, friendId],
        (oldData: FriendRequest) => {
          console.log(oldData);
          if (oldData) {
            return {
              ...oldData,
              status: 'REQUEST_SENT',
            };
          }
        }
      );
    },
  });
};

// cancel friend request
export const useCancelFriendRequest = (
  userId: string,
  friendId: string,
  friendRequestId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cancelFriendRequest(friendRequestId),
    onSuccess: () => {
      queryClient.setQueryData(
        ['friendshipStatus', userId, friendId],
        (oldData: FriendRequest) => {
          if (oldData) {
            return {
              ...oldData,
              status: 'NOT_FRIENDS',
            };
          }
        }
      );
    },
  });
};

// accept or reject friend request
export const useAcceptOrRejectFriendRequest = (
  userId: string,
  friendId: string,
  friendRequestId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: 'ACCEPTED' | 'REJECTED') =>
      acceptOrRejectFriendRequest(friendRequestId, status),
    onSuccess: (data) => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], data);
    },
  });
};
