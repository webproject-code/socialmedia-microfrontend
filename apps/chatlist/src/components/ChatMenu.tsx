import { Box, Button, Input } from '@social-media/evoke-ui';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';
import { CreateChatModal } from './createChatModal';

type ChatMenuProps = {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentUserId: string;
};

const ChatMenu: React.FC<ChatMenuProps> = ({
  searchQuery,
  handleSearch,
  currentUserId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Box className="flex gap-4 items-center py-2 mx-2">
        <Box className="w-full">
          <Input
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={'Search Here...'}
            aria-label="Search chats"
            icon={<LuSearch />}
            iconPosition="left"
          />
        </Box>
        <Button
          size="icon"
          id="create new chat"
          variant={'solid'}
          type="button"
          role="button"
          aria-label="create new chat"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <FaPlus
            role="img"
            className="dark:fill-dark-primary text-[16px] fill-light-primary"
          />
        </Button>
      </Box>
      {isModalOpen && (
        <CreateChatModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
};

export default ChatMenu;
