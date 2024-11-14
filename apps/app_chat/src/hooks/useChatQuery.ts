import {
  ChatType,
  getGroupChatMessages,
  getOneOnOneChatMessages,
} from '@social-media/api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseChatQueryOptions {
  chatId: string;
  chatType: ChatType;
}

// custom hook to fetch messages using infinite query
export const useChatQuery = ({ chatId, chatType }: UseChatQueryOptions) => {
  console.log('in chat query');
  // function to fetch messages
  const getMessages = ({ pageParam = '' }) => {
    if (chatType === ChatType.ONE_ON_ONE) {
      console.log('chattype', chatType);
      console.log('calling chat service');
      return getOneOnOneChatMessages(chatId, { cursor: pageParam });
    } else if (chatType === ChatType.GROUP) {
      console.log('chattype', chatType);
      console.log('calling chat service');
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
    });

  console.log('data in window', data);
  return {
    data,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    status,
  };
};
