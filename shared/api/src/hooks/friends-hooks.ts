import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  acceptOrRejectFriendRequest,
  cancelFriendRequest,
  fetchFriends,
  fetchMutualFriends,
  removeFriend,
  sendFriendRequest,
} from '../services/friends-services';
import { FriendRequest, QueryPagination } from '../types';
import { useCallback, useMemo } from 'react';
import { useInfiniteScroll } from '../axios/useInfiniteScroll';

// fetch friends
export const useFriends = (userId: string, params?: QueryPagination) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['friends', userId],
    queryFn: ({ pageParam }) =>
      fetchFriends(userId, { ...params, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: '',
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
  });

  // Flatten the pages into a single array
  const friends = useMemo(() => {
    if (!data?.pages) return [];
    const allFriends = data.pages.flatMap((page) => page.friends);
    return [...new Set(allFriends)];
  }, [data?.pages]);

  // Handler for loading more data
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Using custom hook to trigger loading more data when reaching the bottom
  const bottomRef = useInfiniteScroll(loadMore);

  return {
    friends,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    bottomRef,
    refetch,
  };
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
    onSuccess: () => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], {
        friendRequestId: null,
        status: 'NOT_FRIENDS',
      });
      queryClient.invalidateQueries({ queryKey: ['friends', userId] });
      queryClient.invalidateQueries({ queryKey: ['friends', friendId] });
    },
  });
};

// sent friend request
export const useSendFriendRequest = (userId: string, friendId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => sendFriendRequest(userId, friendId),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['friendshipStatus', userId, friendId],
        (oldData: FriendRequest) => {
          if (oldData) {
            return {
              friendRequestId: data.friendRequest.id,
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
export const useAcceptFriendRequest = (
  userId: string,
  friendId: string,
  friendRequestId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: 'ACCEPTED' | 'REJECTED') =>
      acceptOrRejectFriendRequest(friendRequestId, status),
    onSuccess: () => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], {
        friendRequestId: friendRequestId,
        status: 'FRIENDS',
      });
      queryClient.invalidateQueries({ queryKey: ['friends', userId] });
      queryClient.invalidateQueries({ queryKey: ['friends', friendId] });
    },
  });
};

export const useRejectFriendRequest = (
  userId: string,
  friendId: string,
  friendRequestId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: 'REJECTED') =>
      acceptOrRejectFriendRequest(friendRequestId, status),
    onSuccess: () => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], {
        friendRequestId: friendRequestId,
        status: 'NOT_FRIENDS',
      });
    },
  });
};
