import { ChatsListServiceResponse, Message } from '@social-media/api';
import { useSocket } from '@social-media/api';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useChatlistSocketListen = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const location = useLocation();

  // Function to update unread count for a specific chat
  const updateUnreadCount = useCallback(
    (chatId: string, newUnreadCount: number) => {
      queryClient.setQueryData<{ pages: ChatsListServiceResponse[] }>(
        ['chatList', ''],
        (oldData) => {
          if (!oldData) return oldData;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            chats: page.chats.map((chat) =>
              chat.id === chatId
                ? { ...chat, unreadCount: newUnreadCount }
                : chat
            ),
          }));

          return { ...oldData, pages: newPages };
        }
      );
    },
    [queryClient]
  );

  const updateChatlist = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['chatList'] });
  }, [queryClient]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: {
      chatId: string;
      message: Message;
    }) => {
      queryClient.setQueryData<{ pages: ChatsListServiceResponse[] }>(
        ['chatList', ''],
        (oldData) => {
          if (!oldData) return oldData;

          // Check if the current chat is open (either one-on-one or group chat)
          const isCurrentChatOpen = location.pathname.includes(
            `${message.chatId}`
          );

          // Variable to store the updated chat
          let updatedChat: ChatsListServiceResponse['chats'][0] | null = null;

          // Remove the chat from its current position across pages and find the chat
          const updatedPages = oldData.pages.map((page) => {
            const chatIndex = page.chats.findIndex(
              (chat) => chat.id === message.chatId
            );
            if (chatIndex === -1) return page; // If no chat found, return the page as is
            const newMessage = message.message; // The new message from the socket
            // Update the unread count and replace the last message
            updatedChat = {
              ...page.chats[chatIndex],
              unreadCount: isCurrentChatOpen
                ? page.chats[chatIndex].unreadCount ?? 0
                : (page.chats[chatIndex].unreadCount ?? 0) + 1, // Increment unread count if the chat is not open
              messages: [newMessage], // Replace last message with new message
              lastMessageAt: newMessage.createdAt, // Update the timestamp to the new message's timestamp
            };

            // Remove the chat from the current page's chat list
            const updatedChats = page.chats.filter(
              (chat) => chat.id !== message.chatId
            );

            return { ...page, chats: updatedChats };
          });

          // Insert the updated chat at the top of the first page
          if (updatedChat) {
            updatedPages[0].chats = [updatedChat, ...updatedPages[0].chats];
          }

          return { ...oldData, pages: updatedPages };
        }
      );
    };

    socket.on('chatlist:newMessage', handleNewMessage);
    socket.on('chatlist:update', updateChatlist);

    return () => {
      socket.off('chatlist:newMessage', handleNewMessage);
      socket.off('chatlist:update', updateChatlist);
    };
  }, [
    queryClient,
    socket,
    location.pathname,
    updateUnreadCount,
    updateChatlist,
  ]);

  return {
    updateUnreadCount,
  };
};
