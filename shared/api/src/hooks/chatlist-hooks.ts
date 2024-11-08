import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  createGroupChat,
  createOneOnOneChat,
  fetchChatList,
  fetchFriendWithNoChat,
} from '../services/chatlist-services';
import {
  ChatsListServiceResponse,
  FriendsWithNochatResponse,
  groupData,
} from '../types';
import { useCallback, useMemo } from 'react';
import { useInfiniteScroll } from '@social-media/utils';

export const useChatList = (searchTerm: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery<ChatsListServiceResponse, Error>({
    queryKey: ['chatList', searchTerm],
    queryFn: ({ pageParam = '' }) =>
      fetchChatList(searchTerm, pageParam as string),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: '',
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Flatten the pages into a single array
  const chats = useMemo(() => {
    if (!data?.pages) return [];
    const allChats = data.pages.flatMap((page) => page.chats);
    return [...new Set(allChats)];
  }, [data?.pages]);

  // Handler for loading more data
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const bottomRef = useInfiniteScroll(loadMore);
  return {
    chats,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    bottomRef,
    refetch,
  };
};

export const useFriendsWithNoChat = (searchTerm: string, userId: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery<FriendsWithNochatResponse, Error>({
    queryKey: ['friendsWithNoChats', searchTerm],
    queryFn: ({ pageParam = '' }) =>
      fetchFriendWithNoChat(searchTerm, userId, pageParam as string),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: '',
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
  });

  // Flatten the pages into a single array
  const friends = useMemo(() => {
    if (!data?.pages) return [];
    const allChats = data.pages.flatMap((page) => page.friends);
    return [...new Set(allChats)];
  }, [data?.pages]);

  // Handler for loading more data
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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

export const useCreateOneOnOneChat = () => {
  return useMutation({
    mutationFn: (chat: { initiatorId: string; participantId: string }) => {
      return createOneOnOneChat(chat.initiatorId, chat.participantId);
    },
  });
};

export const useCreateGroupChat = () => {
  return useMutation({
    mutationFn: (groupData: groupData) => {
      return createGroupChat(groupData);
    },
  });
};
