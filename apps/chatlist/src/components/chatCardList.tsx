import React, { useCallback, useState } from 'react';
import { Box, Button, Input, ScrollArea } from '@social-media/evoke-ui';
import { Chat, useChatList } from '@social-media/api';
import { Spinner, useDebounce } from '@social-media/utils';
import { CreateChatModal } from './createChatModal';
import { ChatCard } from './chatCard';
import { LuSearch } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';

import { useStore } from 'auth/Module';

export const ChatCardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useStore();
  const currentUserId = user?.id || '672c92f5b5c8bd867f52cbb6';
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { chats, isLoading, isFetchingNextPage, bottomRef } =
    useChatList(debouncedSearchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const renderChatCard = useCallback((chat: Chat) => {
    const isOneOnOne = chat.type === 'ONE_ON_ONE';

    return (
      <ChatCard
        type={chat.type}
        chatId={chat.id}
        key={chat.id}
        name={chat.name}
        lastMessage={
          isOneOnOne && chat.messages.length > 0 && chat.messages[0].content
            ? chat.messages[0].content
            : ''
        }
        lastMessageTime={chat.lastMessageAt}
        profileImage={
          isOneOnOne
            ? chat.initiatorId === currentUserId
              ? chat.participant.profilePicture
              : chat.initiator.profilePicture
            : chat.groupIcon
        }
      />
    );
  }, []);

  return (
    <Box className="p-0">
      <Box className="flex gap-4 items-center py-2 mx-4">
        <Box className="w-full">
          <Input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder={'Search Here...'}
            aria-label="Search chats"
          >
            <LuSearch />
          </Input>
        </Box>
        <Button
          size="icon"
          id="create new chat"
          variant={'solid'}
          type="button"
          role="button"
          aria-label="create new chat"
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="dark:bg-dark-secondary"
        >
          <FaPlus
            role="img"
            className="dark:fill-dark-primary text-[16px] fill-light-primary"
          />
        </Button>
      </Box>
      {isLoading ? (
        <Box className="flex justify-center h-[calc(100vh-100px)] w-full items-center">
          <Spinner aria-label="Loading chats" />
        </Box>
      ) : (
        <Box className="w-full h-[calc(100vh-100px)]">
          {chats?.length === 0 ? (
            <Box className="flex justify-center h-[calc(100vh-100px)] full items-center text-light-secondary dark:text-dark-secondary">
              <span>Chats Not Found</span>
            </Box>
          ) : (
            <ScrollArea className="h-[calc(100vh-100px)] border-none px-2">
              {isLoading ? (
                <Box className="flex justify-center h-full w-full items-center">
                  <Spinner aria-label="Loading chats" />
                </Box>
              ) : (
                <Box className="flex flex-col dark:bg-dark-primary bg-light-primary items-center justify-center mt-2">
                  {chats.map(renderChatCard)}
                  <div ref={bottomRef}>
                    {isFetchingNextPage && (
                      <div className="flex justify-center flex-col items-center">
                        <Spinner />
                        <span>Loading more...</span>
                      </div>
                    )}
                  </div>
                </Box>
              )}
            </ScrollArea>
          )}
        </Box>
      )}
      <CreateChatModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentUserId={currentUserId}
      />
    </Box>
  );
};
