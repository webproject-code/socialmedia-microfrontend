import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateOneOnOneChat,
  useDebounce,
  useFriendsWithNoChat,
} from '@social-media/api';
import { CreateGroupChatForm } from './forms/createGroupChatForm';
import { Box, Button, Input, Modal, ScrollArea } from '@social-media/evoke-ui';
import { Spinner } from '@social-media/utils';
import { FaPlus } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';
import { FriendCard } from './friendCard';

interface CreateChatModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
}

export const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  currentUserId,
}) => {
  const [groupChat, setGroupChat] = useState<boolean>(false);
  const [memberIds, setMemberIds] = useState<{ id: string; name: string }[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading, isFetchingNextPage } = useFriendsWithNoChat(
    debouncedSearchTerm,
    currentUserId,
    null
  );
  const navigate = useNavigate();
  const { mutate } = useCreateOneOnOneChat();

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

  const OneOnOneClickHandle = (id: string) => {
    mutate(
      { initiatorId: currentUserId, participantId: id },
      {
        onSuccess: (data) => {
          navigate(`/chat/${data.id}?type=ONE_ON_ONE`);
        },
      }
    );
  };

  const GroupClickHandle = (id: string, name: string) => {
    setMemberIds((prev) => {
      if (prev.some((member) => member.id === id)) {
        return prev;
      }
      return [...prev, { id, name }];
    });
  };

  const handleCardClick = (id: string, name: string) => {
    if (groupChat) {
      return GroupClickHandle(id, name);
    } else {
      return OneOnOneClickHandle(id);
    }
  };

  return (
    <Modal
      closeOnOutsideClick
      onClose={() => setIsModalOpen(false)}
      showCross
      size="full"
      isOpen={isModalOpen}
    >
      <Modal.Header>
        <h2 className="text-xl font-semibold font-primary dark:text-white text-light-secondary">
          New Chat
        </h2>
      </Modal.Header>
      <Modal.Content>
        <Box className="w-full px-4">
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
        <Box className="p-2 px-4">
          <Button
            role="button"
            type="button"
            onClick={() => {
              setGroupChat(!groupChat);
              setMemberIds([]);
            }}
            variant={groupChat ? 'destructive' : 'outline'}
            className={
              groupChat
                ? 'border-2 border-red-600/50 text-red-600 bg-transparent hover:text-light-primary hover:bg-red-600'
                : 'dark:text-dark-secondary dark:border-dark-secondary/50 hover:bg-light-secondary hover:text-light-primary dark:hover:bg-dark-secondary dark:hover:text-dark-primary border-light-secondary/50 text-light-secondary'
            }
          >
            {groupChat ? (
              'Cancel Group'
            ) : (
              <>
                <FaPlus className="mr-2" />
                New Group
              </>
            )}
          </Button>
        </Box>
        {groupChat && (
          <CreateGroupChatForm
            ownerId={currentUserId}
            memberList={memberIds}
            setMemberList={setMemberIds}
          />
        )}
        {isLoading ? (
          <Box className="flex justify-center items-center mt-2 h-[calc(100vh-200px)]">
            <Spinner />
          </Box>
        ) : (
          <Box className="w-full h-[calc(100vh-200px)]">
            {FriendListData?.length === 0 ? (
              <Box className="flex justify-center h-full w-full items-center text-light-secondary dark:text-dark-secondary">
                <span>User Not Found</span>
              </Box>
            ) : (
              <ScrollArea className="h-[calc(100vh-150px)] px-2">
                <Box className="flex flex-col w-full h-full mt-2">
                  {FriendListData.map((user) => (
                    <FriendCard
                      key={user.id}
                      name={user.name}
                      email={user.email}
                      profilePicture={user.profilePicture}
                      onClickHandler={() => handleCardClick(user.id, user.name)}
                    />
                  ))}
                  {isFetchingNextPage && (
                    <div className="flex justify-center flex-col items-center">
                      <Spinner />
                      <span>Loading more...</span>
                    </div>
                  )}
                </Box>
              </ScrollArea>
            )}
          </Box>
        )}
      </Modal.Content>
    </Modal>
  );
};
