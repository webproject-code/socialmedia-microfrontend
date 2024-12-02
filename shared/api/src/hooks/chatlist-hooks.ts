import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createGroupChat,
  createOneOnOneChat,
  fetchChatList,
  fetchFriendWithNoChat,
} from '../services/chatlist-services';
import {
  ChatsListServiceResponse,
  ChatType,
  FriendsWithNochatResponse,
  groupData,
} from '../types';
import { useCallback, useMemo } from 'react';

// import { useSocket } from '@social-media/utils';
import { useInfiniteScroll } from '../axios/useInfiniteScroll';
import { useSocket } from '../context/SocketContext';

// export const useChatList = (searchTerm: string) => {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteQuery<ChatsListServiceResponse, Error>({
//     queryKey: ['chatList', searchTerm],
//     queryFn: ({ pageParam = '' }) =>
//       fetchChatList(searchTerm, pageParam as string),
//     getNextPageParam: (lastPage) =>
//       lastPage.pagination.hasNextPage
//         ? lastPage.pagination.nextCursor
//         : undefined,
//     initialPageParam: '',
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes
//   });

//   // Flatten the pages into a single array
//   const chats = useMemo(() => {
//     if (!data?.pages) return [];
//     const allChats = data.pages.flatMap((page) => page.chats);
//     return [...new Set(allChats)];
//   }, [data?.pages]);

//   // Handler for loading more data
//   const loadMore = useCallback(() => {
//     if (hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   const bottomRef = useInfiniteScroll(loadMore);
//   return {
//     chats,
//     isLoading,
//     isFetchingNextPage,
//     isError,
//     error,
//     hasNextPage,
//     bottomRef,
//     refetch,
//   };
// };

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
  const queryClient = useQueryClient();
  const { createGroupChat: createGroupChatEvent } = useSocket();
  return useMutation({
    mutationFn: (groupData: groupData) => {
      return createGroupChat(groupData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
      createGroupChatEvent(
        data?.memberIds?.filter((Id) => Id !== data?.ownerId)
      );
    },
  });
};

export const useChatList = (searchTerm: string) => {
  // const { socket } = useSocket();
  // const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    // refetch,
  } = useInfiniteQuery<ChatsListServiceResponse, Error>({
    queryKey: ['chatList', searchTerm],
    queryFn: ({ pageParam = '' }) =>
      fetchChatList(searchTerm, pageParam as string),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: '',
  });

  // Flatten the pages into a single array and maintain order
  const chats = useMemo(() => {
    if (!data?.pages) return [];
    const allChats = data.pages.flatMap((page) => page.chats);
    const uniqueChats = [
      ...new Map(allChats.map((chat) => [chat.id, chat])).values(),
    ];
    return uniqueChats;
  }, [data?.pages]);

  const noMessageChats = useMemo(() => {
    return chats.filter((chat) => {
      if (chat.type === ChatType.GROUP) {
        return chat;
      }
      if (chat.type === ChatType.ONE_ON_ONE && chat.messages.length > 0)
        return chat;
    });
  }, [chats]);

  // Handler for loading more data
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const bottomRef = useInfiniteScroll(loadMore);

  // // Function to update unread count for a specific chat
  // const updateUnreadCount = useCallback(
  //   (chatId: string, newUnreadCount: number) => {
  //     queryClient.setQueryData<{ pages: ChatsListServiceResponse[] }>(
  //       ['chatList', searchTerm],
  //       (oldData) => {
  //         if (!oldData) return oldData;

  //         const newPages = oldData.pages.map((page) => ({
  //           ...page,
  //           chats: page.chats.map((chat) =>
  //             chat.id === chatId
  //               ? { ...chat, unreadCount: newUnreadCount }
  //               : chat
  //           ),
  //         }));

  //         return { ...oldData, pages: newPages };
  //       }
  //     );
  //   },
  //   [queryClient, searchTerm]
  // );

  // // Listen for new messages and update unread count
  // useEffect(() => {
  //   if (!socket) return;

  //   const handleNewMessage = (message: {
  //     chatId: string;
  //     message: Message;
  //   }) => {
  //     queryClient.setQueryData<{ pages: ChatsListServiceResponse[] }>(
  //       ['chatList', searchTerm],
  //       (oldData) => {
  //         if (!oldData) return oldData;

  //         // Find the chat that the new message belongs to
  //         const updatedPages = oldData.pages.map((page) => {
  //           const chatIndex = page.chats.findIndex(
  //             (chat) => chat.id === message.chatId
  //           );
  //           if (chatIndex === -1) return page; // If no chat found, return the page as is

  //           // Update the unread count and replace the last message
  //           const updatedChats = page.chats.map((chat) => {
  //             if (chat.id === message.chatId) {
  //               const currentUnreadCount = chat.unreadCount ?? 0; // Default to 0 if undefined
  //               const newMessage = message.message; // The new message from the socket

  //               // Replace the last message with the new message (keeping other properties intact)
  //               const updatedChat = {
  //                 ...chat,
  //                 unreadCount: currentUnreadCount + 1, // Increment unread count
  //                 messages: [newMessage], // Replace last message with new message content
  //                 lastMessageAt: newMessage.createdAt, // Update the timestamp to the new message's timestamp
  //                 // Do not add to `messages` array as we are replacing the last message
  //               };

  //               return updatedChat;
  //             }
  //             return chat;
  //           });

  //           // Reorder the chats to move the updated chat to the top
  //           const sortedChats = [
  //             updatedChats[chatIndex],
  //             ...updatedChats.filter((c) => c.id !== message.chatId),
  //           ];

  //           return { ...page, chats: sortedChats };
  //         });

  //         console.log({ ...oldData, pages: updatedPages }, 'Updated Data');
  //         return { ...oldData, pages: updatedPages };
  //       }
  //     );
  //   };
  //   socket.on('Chatlist:newMessage', handleNewMessage);

  //   return () => {
  //     socket.off('Chatlist:newMessage', handleNewMessage);
  //   };
  // }, [socket, queryClient, searchTerm]);

  // // Function to refetch the entire list
  // const refetchEntireList = useCallback(async () => {
  //   await queryClient.invalidateQueries({ queryKey: ['chatList', searchTerm] });
  //   return refetch();
  // }, [queryClient, searchTerm, refetch]);

  return {
    chats: noMessageChats,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    bottomRef,
    // refetch: refetchEntireList,
    // updateUnreadCount,
  };
};
