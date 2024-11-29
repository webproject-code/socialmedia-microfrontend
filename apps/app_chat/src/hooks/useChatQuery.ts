import { useInfiniteQuery } from '@tanstack/react-query';

import {
  ChatType,
  getGroupChatMessages,
  getOneOnOneChatMessages,
} from '@social-media/api';
import { useStore } from '@social-media/utils';

interface UseChatQueryOptions {
  chatId: string;
  chatType: ChatType;
}

// custom hook to fetch messages using infinite query
export const useChatQuery = ({ chatId, chatType }: UseChatQueryOptions) => {
  const { vanishMessages } = useStore();
  // function to fetch messages
  const getMessages = ({ pageParam = '' }) => {
    if (chatType === ChatType.ONE_ON_ONE) {
      return getOneOnOneChatMessages(chatId, { cursor: pageParam });
    } else if (chatType === ChatType.GROUP) {
      return getGroupChatMessages(chatId, { cursor: pageParam });
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [`chat:${chatId}`],
      queryFn: getMessages,
      initialPageParam: '',
      getNextPageParam: (lastPage) => {
        return lastPage?.pagination.nextCursor;
      },
      // refetchInterval: isConnected ? false : 1000,
      refetchOnWindowFocus: false,
      select: (data) => {
        const cachedVanishMessages = vanishMessages[chatId] || [];

        if (!data || !data.pages) return { pages: [] };

        const updatedPages = [...data.pages];
        if (updatedPages[0]) {
          updatedPages[0] = {
            ...updatedPages[0],
            messages: [...cachedVanishMessages, ...updatedPages[0].messages],
            pagination: updatedPages[0]?.pagination,
          };
        }

        return {
          ...data,
          pages: updatedPages,
        };
      },
    });

  return {
    data,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    status,
  };
};
