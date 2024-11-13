import React, { useCallback, useState } from 'react';
import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  Divider,
  Input,
  ScrollArea,
} from '@social-media/evoke-ui';
import { Chat, useChatList } from '@social-media/api';
import { Spinner, useDebounce, useTheme } from '@social-media/utils';
import { CreateChatModal } from './createChatModal';
import { ChatCard } from './chatCard';
import { LuSearch } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';

// import { useStore } from 'auth/Module';
import { ChatListSkeleton } from './chatListSkeleton';
import { useChatlistSocketListen } from '../hooks/useChatlistSocketListen';

export const ChatCardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useTheme();
  // const { user } = useStore();
  const currentUserId = '672c92f5b5c8bd867f52cbb6';
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { updateUnreadCount } = useChatlistSocketListen();
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
  }, []);

  return (
    <>
      <Box className="flex gap-4 justify-stretch items-center py-3 px-2">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
          <AvatarImage
            src={'https://mui.com/static/images/avatar/2.jpg'}
            alt={'user-profile'}
            className="ring-0 shadow-lg"
          />
        </Avatar>
        <Box className="p-0">
          <h6 className="font-secondary font-bold text-light-secondary text-xl dark:text-dark-lavender">
            Bujange Bapek
          </h6>
          <p className="font-secondary font-semibold text-sm dark:text-dark-secondary">
            My Account
          </p>
        </Box>
      </Box>
      <Divider
        alignment="horizontal"
        className="my-1 border-b-0 dark:border-dark-silverSteel border-light-silverSteel opacity-15"
      />
      <Box className="flex gap-4 items-center py-2 mx-2">
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
          className="dark:bg-dark-secondary focus-visible:ring-2
      focus-visible:ring-light-secondary
      focus-visible:ring-offset-2
      dark:focus-visible:ring-dark-secondary
      dark:focus-visible:ring-offset-dark-primary
      outline-none"
        >
          <FaPlus
            role="img"
            className="dark:fill-dark-primary text-[16px] fill-light-primary"
          />
        </Button>
      </Box>
      {isLoading ? (
        <Box className="flex flex-col h-[calc(100vh-100px)] w-full px-2">
          <ChatListSkeleton />
        </Box>
      ) : (
        <Box className="w-full h-[calc(100vh-100px)]">
          {chats?.length === 0 ? (
            <Box className="flex justify-center h-[calc(100vh-100px)] w-[100%] items-center text-light-secondary dark:text-dark-secondary">
              <img
                src={
                  isDarkTheme
                    ? 'assets/Images/dark-no-results-found-image 1.svg'
                    : 'assets/Images/light-no-results-found-image 1.svg'
                }
                alt="search not found"
                className="object-fill h-[60%] w-[60%]"
              />
            </Box>
          ) : (
            <ScrollArea className="h-[calc(100vh-100px)] border-none">
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
            </ScrollArea>
          )}
        </Box>
      )}
      <CreateChatModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentUserId={currentUserId}
      />
    </>
  );
};
