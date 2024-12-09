import { Chat, useChatList } from '@social-media/api';
import { Box, ScrollArea } from '@social-media/evoke-ui';
import { Spinner, useDebounce } from '@social-media/utils';
import React, { useCallback } from 'react';
import { useChatlistSocketListen } from '../hooks/useChatlistSocketListen';
import ChatNotFound from './ChatNotFound';
import { ChatCard } from './chatCard';
import { ChatListSkeleton } from './chatListSkeleton';

type ConversationListProps = {
  searchQuery: string;
  currentUserId: string;
};

const ConversationList: React.FC<ConversationListProps> = ({
  searchQuery,
  currentUserId,
}) => {
  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const { updateUnreadCount } = useChatlistSocketListen();
  const { chats, isLoading, isFetchingNextPage, bottomRef } =
    useChatList(debouncedSearchTerm);

  const renderChatCard = useCallback(
    (chat: Chat) => {
      const isOneOnOne = chat.type === 'ONE_ON_ONE';

      return (
        <ChatCard
          type={chat.type}
          chatId={chat.id}
          key={chat.id}
          name={chat.name}
          lastMessage={chat.messages.length > 0 ? chat.messages[0].content : ''}
          lastMessageTime={chat.lastMessageAt}
          profileImage={
            isOneOnOne
              ? chat.initiatorId === currentUserId
                ? chat.participant.profilePicture
                : chat.initiator.profilePicture
              : chat.groupIcon
          }
          unreadCount={chat.unreadCount}
          updateCount={updateUnreadCount}
        />
      );
    },
    [currentUserId, updateUnreadCount]
  );

  if (isLoading) {
    return <ChatListSkeleton />;
  }

  if (chats.length === 0) {
    return <ChatNotFound />;
  }

  return (
    <div className="flex-grow overflow-hidden">
      <ScrollArea className="border-none">
        <Box className="flex flex-col dark:bg-dark-primary bg-light-primary items-center justify-center mt-2">
          {chats.map(renderChatCard)}
          <div ref={bottomRef}>
            {isFetchingNextPage && (
              <div className="flex justify-center flex-col items-center">
                <Spinner />
              </div>
            )}
          </div>
        </Box>
      </ScrollArea>
    </div>
  );
};

export default ConversationList;
