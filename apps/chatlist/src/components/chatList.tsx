import { Box, ScrollArea } from '@social-media/evoke-ui';
import { ChatCard } from './chatCard';
import { ChatCardMessage, chatMessages } from '../constant';
import { useState } from 'react';
import { ChatSearch } from './chatSearch';

export const ChatListCard = () => {
  //   const [chatListData, setChatListData] = useState<ResponseData[]>([]);
  const [chatListData, setChatListData] =
    useState<ChatCardMessage[]>(chatMessages);

  return (
    <Box className="p-0">
      <ChatSearch setData={setChatListData} />
      <h3 className="text-md mt-2 font-semibold font-primary text-light-secondary dark:text-dark-secondary">
        Chats
      </h3>
      <ScrollArea className="h-[calc(100vh-150px)] border-none">
        <div className="flex flex-col dark:bg-dark-primary bg-light-primary items-center justify-center mt-2">
          {chatListData.map((chats) => {
            return (
              <ChatCard
                key={chats.name}
                name={chats.name}
                lastMessage={chats.lastMessage}
                lastMessageTime={chats.lastMessageTime}
                profileImage={chats.profileImage}
              />
            );
          })}
        </div>
      </ScrollArea>
    </Box>
  );
};
