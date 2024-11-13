import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  acceptOrRejectFriendRequest,
  cancelFriendRequest,
  fetchFriendRequests,
  fetchFriends,
  fetchMutualFriends,
  fetchSuggestedFriends,
  fetchUsers,
  removeFriend,
  sendFriendRequest,
} from '../services/friends-services';
import { FriendRequest, QueryPagination } from '../types';
import { useInfiniteScroll } from '../axios/useInfiniteScroll';
import { useCallback, useMemo } from 'react';

// Fetch users to add friend
export const useUsers = (params: QueryPagination) => {
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
    queryKey: ['users', params],
    queryFn: ({ pageParam }) => fetchUsers({ ...params, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: '',
    enabled: !!params.query,
  });

  const users = useMemo(() => {
    if (!data?.pages) return [];
    const allUsers = data.pages
      .filter((page): page is NonNullable<typeof page> => page !== null)
      .flatMap((page) => page.users);
    return [...new Set(allUsers)];
  }, [data?.pages]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const bottomRef = useInfiniteScroll(loadMore);

  return {
    users,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    bottomRef,
    refetch,
  };
};

// Fetch friends
export const useFriends = (userId: string, params?: QueryPagination) => {
  return useQuery({
    queryKey: ['friends', userId],
    queryFn: () => fetchFriends(userId, params),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
  });
};

// Fetch mutual friends
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

// Fetch suggested friends
export const useSuggestedFriends = (
  userId: string,
  params?: QueryPagination
) => {
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
    queryKey: ['suggestedFriends', userId],
    queryFn: ({ pageParam }) =>
      fetchSuggestedFriends(userId, { ...params, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: '',
  });

  const suggestedFriends = useMemo(() => {
    if (!data?.pages) return [];
    const allSuggestedFriends = data.pages.flatMap(
      (page) => page.suggestedFriends
    );
    return [...new Set(allSuggestedFriends)];
  }, [data?.pages]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const bottomRef = useInfiniteScroll(loadMore);

  return {
    suggestedFriends,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    bottomRef,
    refetch,
  };
};

// Fetch friend requests
export const useFriendRequests = (userId: string, params?: QueryPagination) => {
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
    queryKey: ['friendRequests', userId],
    queryFn: ({ pageParam }) =>
      fetchFriendRequests(userId, { ...params, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: '',
  });

  // Flatten the pages into a single array
  const friendRequests = useMemo(() => {
    if (!data?.pages) return [];
    const allFriendRequests = data.pages.flatMap((page) => page.friendRequests);
    return [...new Set(allFriendRequests)];
  }, [data?.pages]);

  // Handler for loading more data
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const bottomRef = useInfiniteScroll(loadMore);

  return {
    friendRequests,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    bottomRef,
    refetch,
  };
};

// Remove friend
export const useRemoveFriend = (userId: string, friendId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeFriend(userId, friendId),
    onSuccess: (data) => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], data);
    },
  });
};

// Send friend request
export const useSendFriendRequest = (userId: string, friendId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => sendFriendRequest(userId, friendId),
    onSuccess: () => {
      queryClient.setQueryData(
        ['friendshipStatus', userId, friendId],
        (oldData: FriendRequest) => {
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

// Cancel friend request
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

// Accept friend request
export const useAcceptFriendRequest = (
  userId: string,
  friendId: string,
  friendRequestId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => acceptOrRejectFriendRequest(friendRequestId, 'ACCEPTED'),
    onSuccess: () => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], {
        friendRequestId: friendRequestId,
        status: 'FRIENDS',
      });
      queryClient.invalidateQueries({ queryKey: ['friends', userId] });
      queryClient.invalidateQueries({ queryKey: ['friends', friendId] });
      queryClient.invalidateQueries({ queryKey: ['friendRequests', userId] });
    },
  });
};

// Reject friend request
export const useRejectFriendRequest = (
  userId: string,
  friendId: string,
  friendRequestId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => acceptOrRejectFriendRequest(friendRequestId, 'REJECTED'),
    onSuccess: () => {
      queryClient.setQueryData(['friendshipStatus', userId, friendId], {
        friendRequestId: friendRequestId,
        status: 'NOT_FRIENDS',
      });
      queryClient.invalidateQueries({ queryKey: ['friendRequests', userId] });
    },
  });
};
