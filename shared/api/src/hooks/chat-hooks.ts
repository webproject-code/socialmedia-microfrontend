import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  addGroupChatMembers,
  getGroupChat,
  getGroupChatMessages,
  getGroupMembers,
  getOneOnOneChat,
  getOneOnOneChatMessages,
  removeGroupChatMembers,
  updateGroupChat,
  updateOneOnOneChatSettings,
} from '../services/chat-services';
import {
  ChatType,
  GroupChatSettings,
  OneOnOneChat,
  OneOnOneChatSettings,
} from '../types';

export const useOneOnOneChat = (chatId: string) => {
  return useQuery({
    queryKey: ['one-on-one', chatId],
    queryFn: () => getOneOnOneChat(chatId),
    enabled: chatId !== null,
  });
};

export const useGroupChat = (chatId: string) => {
  return useQuery({
    queryKey: ['group', chatId],
    queryFn: () => getGroupChat(chatId),
    enabled: chatId !== null,
  });
};

export const useGroupMembers = (chatId: string) => {
  return useQuery({
    queryKey: ['group-members', chatId],
    queryFn: () => getGroupMembers(chatId),
  });
};

export const useOneOnOneChatUpdate = (chatId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: OneOnOneChatSettings) =>
      updateOneOnOneChatSettings(chatId, settings),
    onSuccess: (data: OneOnOneChat) => {
      queryClient.setQueryData(['one-on-one', chatId], data);
    },
  });
};

export const useGroupChatUpdate = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      settings,
      groupIcon,
    }: {
      settings: GroupChatSettings;
      groupIcon?: File;
    }) =>
      updateGroupChat(
        chatId,
        {
          name: settings?.name,
          groupDescription: settings?.groupDescription,
        },
        groupIcon
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(['group', chatId], data);
    },
  });
};

export const useAddMembers = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ownerId,
      memberIds,
    }: {
      ownerId: string;
      memberIds: string[];
    }) => {
      return addGroupChatMembers(chatId, ownerId, memberIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group-members', chatId],
      });
    },
  });
};

export const useRemoveMembers = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ownerId,
      memberId,
    }: {
      ownerId: string;
      memberId: string;
    }) => removeGroupChatMembers(chatId, ownerId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group-members', chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ['group', chatId],
      });
    },
  });
};

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

interface ChatScrollProps {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  // initialization state
  const [hasInitialized, setHasInitialized] = useState(false);

  // effect to load previous messages
  useEffect(() => {
    const topDiv = chatRef.current;

    // function to load previous message when scrolled to top
    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      // if immediately scrolled to top, load messages
      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    // attaching listener to top div
    topDiv?.addEventListener('scroll', handleScroll);

    return () => {
      topDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  // effect to scroll to bottom when new message is added
  useEffect(() => {
    const bottomDiv = bottomRef.current;
    const topDiv = chatRef.current;

    // function to return boolean to scroll automatically when new message is sent
    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }

      // if user scroll up, dont interrupt
      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasInitialized]);
};
