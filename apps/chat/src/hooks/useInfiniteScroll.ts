import { getOneOnOneChatMessages } from '@social-media/api';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseInfiniteScrollOptions {
  chatId: string;
  chatType: 'ONE_ON_ONE' | 'GROUP';
}

export const useInfiniteScroll = ({
  chatId,
  chatType,
}: UseInfiniteScrollOptions) => {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['chat-messages', chatId],
      queryFn: ({ pageParam = '' }) =>
        getOneOnOneChatMessages(chatId!, { cursor: pageParam }),
      initialPageParam: '',
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.nextCursor;
      },
    });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['chat-messages', chatId] });
  }, [chatId, chatType, queryClient]);

  const messages = data?.pages.flatMap((page) => page.messages) ?? [];

  return {
    messages,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};
