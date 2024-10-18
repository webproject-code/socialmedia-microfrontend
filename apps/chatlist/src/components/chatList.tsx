import { Box, Button, Modal, ScrollArea } from '@social-media/evoke-ui';
import { ChatCard } from './chatCard';
// import { ChatCardMessage, chatMessages } from '../constant';
import { useEffect, useState } from 'react';
import { ChatSearch } from './chatSearch';
import { useChatList, User } from '@social-media/api';
import { Spinner } from '@social-media/utils';

export const ChatListCard = () => {
  const [chatListData, setChatListData] = useState<User[]>([]);
  const { data: chatList, isLoading, isError, error } = useChatList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (chatList) {
      setChatListData(chatList.users);
    }
  }, [chatList, isLoading, isError, error]);

  return (
    <Box className="p-0">
      <ChatSearch setData={setChatListData} setIsModalOpen={setIsModalOpen} />
      <h3 className="text-[20px] mt-2 font-semibold font-primary text-light-secondary dark:textdark-secondary">
        Chats
      </h3>
      <ScrollArea className="h-[calc(100vh-150px)] border-none">
        {isLoading ? (
          <Box className="flex justify-center h-full w-full items-center">
            <Spinner />
          </Box>
        ) : (
          <div className="flex flex-col dark:bg-dark-primary bg-light-primary items-center justify-center mt-2">
            {chatListData.map((chats) => {
              return (
                <ChatCard
                  key={chats.id}
                  name={chats.name}
                  lastMessage={chats.bio}
                  lastMessageTime={''}
                  profileImage={chats.profilePicture}
                />
              );
            })}
          </div>
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
  return (
    <Modal
      closeOnOutsideClick
      onClose={() => setIsModalOpen((prev) => !prev)}
      showCross
      size="lg"
      isOpen={isModalOpen}
    >
      <Modal.Header>
        <h2 className="text-xl font-semibold dark:text-white text-gray-600">
          Delete User?
        </h2>
      </Modal.Header>
      <Modal.Content>
        <p className="dark:text-white text-gray-600">
          Are You sure to delete the user?
        </p>
      </Modal.Content>
      <Modal.Footer className="flex justify-between">
        <Button
          className="w-25 justify-center"
          onClick={() => setIsModalOpen((prev) => !prev)}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          className="w-25 justify-center"
          onClick={() => setIsModalOpen((prev) => !prev)}
          variant="destructive"
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
