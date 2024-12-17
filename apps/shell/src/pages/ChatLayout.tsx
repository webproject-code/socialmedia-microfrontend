import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Message, useSocket } from '@social-media/api';
import { Grid } from '@social-media/evoke-ui';
import { useStore } from '@social-media/utils';
import { ChatsList } from 'chatlist/Module';

import NoChatSelected from '../components/NoChatSelected';
import { useQueryClient } from '@tanstack/react-query';

const ChatLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const { addVanishMessage, updateVanishMessage, clearVanishMessages } =
    useStore();
  const queryClient = useQueryClient();
  const updateChatSettingsKey = `chat:settings:update`;

  useEffect(() => {
    if (!socket) return;
    socket.on(
      'vanishmessages:add',
      ({ chatId, message }: { chatId: string; message: Message }) => {
        addVanishMessage(chatId, message);
      }
    );

    socket.on(
      'vanishmessages:update',
      ({ chatId, message }: { chatId: string; message: Message }) => {
        updateVanishMessage(chatId, message);
      }
    );

    socket.on(updateChatSettingsKey, ({ chatType, chatId }) => {
      queryClient.invalidateQueries({
        queryKey: [chatType, chatId],
      });
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
      clearVanishMessages(chatId);
    });

    return () => {
      socket.off('vanishmessages:add');
      socket.off('vanishmessages:update');
      socket.off('updateChatSettingsKey');
    };
  }, [socket]);

  const isAnyChatSelected = /(group|one-on-one)\/[a-f0-9]{24}/.test(pathname);

  return (
    <Grid className="w-full h-full" columns={12} spacing="none">
      <Grid.GridItem
        columnSpan={{ xs: 12, md: 4, lg: 3 }}
        className="overflow-hidden md:block"
      >
        <div
          className={`h-full sticky top-0 xs:${
            isAnyChatSelected && 'hidden'
          } md:block`}
        >
          <ChatsList />
        </div>
      </Grid.GridItem>
      <Grid.GridItem
        columnSpan={{ xs: 12, md: 8, lg: 9 }}
        className="h-full overflow-auto"
      >
        {isAnyChatSelected ? <Outlet /> : <NoChatSelected />}
      </Grid.GridItem>
    </Grid>
  );
};

export default ChatLayout;
