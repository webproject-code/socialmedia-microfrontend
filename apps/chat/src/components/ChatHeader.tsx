import {
  ChatType,
  GroupChat,
  OneOnOneChat,
  useOneOnOneChatUpdate,
} from '@social-media/api';
import { Avatar, AvatarImage, Button, Input } from '@social-media/evoke-ui';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useMessagesSearch } from '../hooks/useMessagesSearch';
import { useTypingStatus } from '../hooks/useTypingStatus';
import { useChatStore } from '../store/useChatStore';
import ChatSettings from './ChatSettings';
import { useNavigate } from 'react-router-dom';
import GroupChatInfoModal from './GroupChatInfoModal';

interface ChatHeaderProps {
  chatType: ChatType;
  chatId: string;
  name: string;
  avatarUrl: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatarUrl,
  chatType,
  chatId,
}) => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const navigate = useNavigate();

  const { setSearchResults } = useChatStore();

  const { mutate } = useOneOnOneChatUpdate(chatId!);
  const { typingMessage } = useTypingStatus({ chatType });
  const { searchMessages } = useMessagesSearch({ chatId, chatType });

  const oneOnOneChatData = queryClient.getQueryData<OneOnOneChat>([
    'one-on-one',
    chatId,
  ]);

  const handleSearchToggle = () => {
    setIsSearchActive((prev) => !prev);
    setQuery('');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      searchMessages(value);
    } else {
      setSearchResults([]);
    }

    console.log('');
  };

  const handleVanishModeToggle = () => {
    console.log('Vanish mode toggled');

    if (oneOnOneChatData) {
      const settings = {
        vanishMode: !oneOnOneChatData.vanishMode,
      };
      mutate(settings);
    }
  };

  const toggleGroupInfoClick = () => {
    setIsGroupModalOpen((prev) => !prev);
  };

  const handleBackNavigation = () => {
    navigate('/chats');
  };

  return (
    <>
      <div className="chat-header flex items-center justify-between py-3 px-2 md:px-4 sticky top-0 bg-light-primary dark:bg-dark-primary z-10 h-[72px]">
        {!isSearchActive ? (
          <>
            <div className="cursor-pointer flex gap-x-2 md:gap-x-4 items-center">
              <Button
                className="w-fit block md:hidden px-1 md:px-2"
                variant="icon"
                onClick={handleBackNavigation}
              >
                <FaArrowLeft className="dark:text-dark-lavender" />
              </Button>
              <Avatar className="h-7 w-7 md:h-9 md:w-9 ">
                <AvatarImage src={avatarUrl} />
              </Avatar>
              <div className="flex flex-col justify-between h-12">
                <h2 className="text-xl md:text-2xl text-dark-lavender justify-self-start font-semibold font-secondary">
                  {name}
                </h2>
                {typingMessage && (
                  <span className="typing-status dark:text-dark-secondary text-sm">
                    {typingMessage}
                  </span>
                )}
              </div>
            </div>
            <ChatSettings
              chatType={chatType}
              onSearchClick={handleSearchToggle}
              onVanishModeToggle={handleVanishModeToggle}
              isVanishModeEnabled={oneOnOneChatData?.vanishMode}
              onGroupInfoClick={toggleGroupInfoClick}
            />
          </>
        ) : (
          <div className="search-message-container w-full flex items-center justify-center">
            <Button
              className="w-fit"
              variant="icon"
              onClick={handleSearchToggle}
            >
              <FaArrowLeft className="dark:text-dark-lavender" />
            </Button>
            <div className="input-container w-full">
              <Input
                name="search-messages"
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search messages..."
              >
                <FaSearch className="dark:text-dark-lavender" />
              </Input>
            </div>
          </div>
        )}
      </div>
      <GroupChatInfoModal
        isOpen={isGroupModalOpen}
        onClose={toggleGroupInfoClick}
        groupId={chatId}
      />
    </>
  );
};

export default ChatHeader;
