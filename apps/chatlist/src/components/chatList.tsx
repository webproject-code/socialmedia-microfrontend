import { Box, Button, Input, Modal, ScrollArea } from '@social-media/evoke-ui';
import { ChatCard } from './chatCard';
// import { ChatCardMessage, chatMessages } from '../constant';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ChatsListUser,
  useChatList,
  useFriendsWithNoChat,
} from '@social-media/api';
import { Spinner } from '@social-media/utils';
// import { useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import useDebounce from '../hooks/useDebounce';
import { LuSearch } from 'react-icons/lu';
import { FriendCard } from './friendsCard';

const currentUserId = '66b30bbeaea1612592e8609b';

export const ChatListCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading, isFetchingNextPage } = useChatList(
    debouncedSearchTerm,
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const chatListData = useMemo(() => {
    if (!data?.pages) return [];

    const allChats = data.pages.flatMap((page) => page.chats);
    return [...new Set(allChats)];
  }, [data?.pages]);

  const renderChatCard = useCallback(
    (chat: ChatsListUser) => {
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
              ? chat.initiatorId !== currentUserId
                ? chat.participant.profilePicture
                : chat.initiator.profilePicture
              : chat.groupIcon
          }
        />
      );
    },
    [currentUserId]
  );

  return (
    <Box className="p-0">
      <Box className="flex gap-4 items-center py-2">
        <Box className="w-full">
          <Input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder={'Search Here...'}
          >
            <LuSearch />
          </Input>
        </Box>
        <Button
          size="icon"
          variant={'solid'}
          type="button"
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="dark:bg-dark-secondary"
        >
          <FaPlus className="dark:fill-dark-primary text-[16px] fill-light-primary" />
        </Button>
      </Box>
      <ScrollArea className="h-[calc(100vh-150px)] border-none">
        {isLoading ? (
          <Box className="flex justify-center h-full w-full items-center">
            <Spinner />
          </Box>
        ) : (
          <>
            {chatListData.length === 0 && searchTerm && (
              <Box className="flex justify-center h-full w-full items-center">
                <span>Chat Not Found</span>
              </Box>
            )}
            <Box className="flex flex-col dark:bg-dark-primary bg-light-primary items-center justify-center mt-2">
              {chatListData.map(renderChatCard)}
              {isFetchingNextPage && (
                <div className="flex justify-center flex-col items-center">
                  <Spinner />
                  <span>Loading more...</span>
                </div>
              )}
            </Box>
          </>
        )}
      </ScrollArea>
      <AddFriendModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Box>
  );
};

const AddFriendModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //   const [setSearchData, setSetSearchData] = useState<Friends[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading, isFetchingNextPage } = useFriendsWithNoChat(
    debouncedSearchTerm,
    currentUserId,
    null
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );
  const FriendListData = useMemo(() => {
    if (!data?.pages) return [];

    const allFriends = data.pages.flatMap((page) => page.friends);
    return [...new Set(allFriends)];
  }, [data?.pages]);

  return (
    <Modal
      closeOnOutsideClick
      onClose={() => setIsModalOpen((prev) => !prev)}
      showCross
      size="full"
      isOpen={isModalOpen}
    >
      <Modal.Header>
        <h2 className="text-xl font-semibold font-primary dark:text-white text-light-secondary">
          Create new Chat
        </h2>
      </Modal.Header>
      <Modal.Content>
        <Box className="w-full px-2">
          <Input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder={'Search Here...'}
          >
            <LuSearch />
          </Input>
        </Box>
        {isLoading ? (
          <Box className="flex justify-center items-center mt-2 h-screen">
            <Spinner />
          </Box>
        ) : (
          <ScrollArea className="h-[calc(100vh-150px)]">
            <Box className="flex flex-col w-full h-full mt-2">
              {FriendListData.map((user) => {
                return (
                  <FriendCard
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    profilePicture={user.profilePicture}
                    id={user.id}
                  />
                );
              })}
              {isFetchingNextPage && (
                <div className="flex justify-center flex-col items-center">
                  <Spinner />
                  <span>Loading more...</span>
                </div>
              )}
            </Box>
          </ScrollArea>
        )}
      </Modal.Content>
    </Modal>
  );
};
