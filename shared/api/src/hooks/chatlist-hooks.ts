import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  createOneOnOneChat,
  fetchChatList,
  fetchFriendWithNoChat,
} from '../services/chatlist-services';
import { ChatsListServiceResponse, FriendsWithNochatResponse } from '../types';
import { useEffect, useState } from 'react';

export const useChatList = (searchTerm: string, cursor: string | null) => {
  const isNearScreen = useNearScreen();

  const query = useInfiniteQuery<ChatsListServiceResponse, Error>({
    queryKey: ['chatList', searchTerm],
    queryFn: () => fetchChatList(searchTerm, cursor),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (isNearScreen && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [
    isNearScreen,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.fetchNextPage,
  ]);

  return query;
};

export const useNearScreen = (distance = 300) => {
  const [isNearScreen, setIsNearScreen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        !isNearScreen &&
        fullHeight - (scrolled + viewportHeight) < distance
      ) {
        setIsNearScreen(true);
      } else if (
        isNearScreen &&
        fullHeight - (scrolled + viewportHeight) > distance
      ) {
        setIsNearScreen(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isNearScreen, distance]);

  return isNearScreen;
};

export const useFriendsWithNoChat = (
  searchTerm: string,
  userId: string,
  cursor: string | null
) => {
  const isNearScreen = useNearScreen();

  const query = useInfiniteQuery<FriendsWithNochatResponse, Error>({
    queryKey: ['friendsWithNoChats', searchTerm],
    queryFn: () => fetchFriendWithNoChat(searchTerm, userId, cursor),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (isNearScreen && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [
    isNearScreen,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.fetchNextPage,
  ]);

  return query;
};

export const useCreateOneOnOneChat = () => {
  return useMutation({
    mutationFn: (chat: { initiatorId: string; participantId: string }) => {
      return createOneOnOneChat(chat.initiatorId, chat.participantId);
    },
  });
};
