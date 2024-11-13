import { ChatsListServiceResponse, Message } from '@social-media/api';
import { useSocket } from '@social-media/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

export const useChatlistSocketListen = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
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

          // Find the chat that the new message belongs to
          const updatedPages = oldData.pages.map((page) => {
            const chatIndex = page.chats.findIndex(
              (chat) => chat.id === message.chatId
            );
            if (chatIndex === -1) return page; // If no chat found, return the page as is

            // Update the unread count and replace the last message
            const updatedChats = page.chats.map((chat) => {
              if (chat.id === message.chatId) {
                const currentUnreadCount = chat.unreadCount ?? 0; // Default to 0 if undefined
                const newMessage = message.message; // The new message from the socket

                // Replace the last message with the new message (keeping other properties intact)
                const updatedChat = {
                  ...chat,
                  unreadCount: currentUnreadCount + 1, // Increment unread count
                  messages: [newMessage], // Replace last message with new message content
                  lastMessageAt: newMessage.createdAt, // Update the timestamp to the new message's timestamp
                  // Do not add to `messages` array as we are replacing the last message
                };

                return updatedChat;
              }
              return chat;
            });

            // Reorder the chats to move the updated chat to the top
            const sortedChats = [
              updatedChats[chatIndex],
              ...updatedChats.filter((c) => c.id !== message.chatId),
            ];

            return { ...page, chats: sortedChats };
          });

          // console.log({ ...oldData, pages: updatedPages }, 'Updated Data');
          return { ...oldData, pages: updatedPages };
        }
      );
    };
    socket.on('Chatlist:newMessage', handleNewMessage);

    return () => {
      socket.off('Chatlist:newMessage', handleNewMessage);
    };
  }, [queryClient, socket]);

  return {
    updateUnreadCount,
  };
};
