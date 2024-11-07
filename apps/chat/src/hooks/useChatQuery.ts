import {
  getGroupChatMessages,
  getOneOnOneChatMessages,
} from '@social-media/api';
import { useSocket } from '@social-media/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseChatQueryOptions {
  chatId: string;
  chatType: 'ONE_ON_ONE' | 'GROUP';
}

// custom hook to fetch messages using infinite query
export const useChatQuery = ({ chatId, chatType }: UseChatQueryOptions) => {
  const { isConnected } = useSocket();

  // function to fetch messages
  const getMessages = ({ pageParam = '' }) => {
    if (chatType === 'ONE_ON_ONE') {
      return getOneOnOneChatMessages(chatId, { cursor: pageParam });
    } else if (chatType === 'GROUP') {
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
      refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    status,
  };
};
