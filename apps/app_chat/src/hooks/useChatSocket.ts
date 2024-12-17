import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Message, useSocket } from '@social-media/api';

type ChatSocketProps = {
  chatId: string;
  addKey: string;
  updateKey: string;
};

export const useChatSocket = ({
  addKey,
  updateKey,
  chatId,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on(updateKey, (message: Message, vanishMode: boolean) => {
      if (vanishMode) return;
      queryClient.setQueryData([`chat:${chatId}`], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            messages: page.messages.map((item: Message) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (message: Message, vanishMode: boolean) => {
      if (vanishMode) return;
      queryClient.setQueryData([`chat:${chatId}`], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                messages: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          messages: [message, ...newData[0].messages],
        };

        return { ...oldData, pages: newData };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, queryClient, chatId, addKey, updateKey]);
};
