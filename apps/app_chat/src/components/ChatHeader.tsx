import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import {
  ChatType,
  OneOnOneChat,
  useGroupMembers,
  useOneOnOneChatUpdate,
} from '@social-media/api';
import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  Divider,
  Input,
  ScrollArea,
} from '@social-media/evoke-ui';
import { useStore } from '@social-media/utils';

import { useMessagesSearch } from '../hooks/useMessagesSearch';
import { useTypingStatus } from '../hooks/useTypingStatus';
import ChatSettings from './ChatSettings';
import GroupChatInfoModal from './GroupChatInfoModal';
import SearchedMessage from './SearchedMessage';

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
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const { searchResults, setSearchResults, clearVanishMessages } = useStore();
  const { mutate } = useOneOnOneChatUpdate(chatId!);
  const { typingMessage } = useTypingStatus({ chatId, chatType });
  const { searchMessages } = useMessagesSearch({ chatId, chatType });
  const { data, isLoading: isGroupMemberLoading } = useGroupMembers(chatId);

  let oneOnOneChatData: OneOnOneChat | undefined;

  if (chatType === ChatType.ONE_ON_ONE) {
    oneOnOneChatData = queryClient.getQueryData<OneOnOneChat>([
      'one-on-one',
      chatId,
    ]);
  }

  const handleSearchToggle = () => {
    setIsSearchActive((prev) => !prev);
    setQuery('');
  };

  useEffect(() => {
    setIsSearchActive(false);
    setQuery('');
    setSearchResults([]);
  }, [chatId, setSearchResults]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      searchMessages(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleVanishModeToggle = () => {
    if (oneOnOneChatData) {
      const settings = {
        vanishMode: !oneOnOneChatData.vanishMode,
      };
      mutate(settings, {
        onSuccess: () => {
          clearVanishMessages(chatId);
        },
      });
    }
  };

  const toggleGroupInfoClick = () => {
    setIsGroupModalOpen((prev) => !prev);
  };

  const handleBackNavigation = () => {
    navigate('/chats');
  };

  const renderGroupDetails = () => {
    if (isGroupMemberLoading)
      return <span className="text-sm">Getting group details...</span>;

    if (data)
      return (
        <span className="max-w-[220px] truncate">
          {data.members.slice(0, 3).map((member, index) => (
            <span key={member.id}>
              <Link
                to={`/users/${member.id}`}
                className="hover:underline text-sm"
              >
                {member.name}
              </Link>
              {index < data.members.length - 1 && ', '}
            </span>
          ))}
          {data.members.length > 3 && (
            <span className="text-sm">+{data.members.length - 3} more</span>
          )}
        </span>
      );
  };

  const renderChatInfoContent = () => {
    if (typingMessage)
      return (
        <span
          className={`text-sm ${typingMessage ? 'opacity-100' : 'opacity-0'}`}
        >
          {typingMessage}
        </span>
      );

    if (chatType === ChatType.GROUP) {
      return renderGroupDetails();
    }

    return null;
  };

  return (
    <>
      <div
        className={`chat-header flex items-center justify-between py-2 md:py-3 px-2 md:px-4  ${
          oneOnOneChatData?.vanishMode
            ? 'dark:bg-purple-800 bg-light-lavender'
            : 'dark:bg-dark-primary bg-light-primary'
        } z-10 h-[64px] md:h-[72px] shadow-md`}
      >
        {!isSearchActive ? (
          <>
            <div className="cursor-pointer flex gap-x-2 md:gap-x-4 items-center">
              <Button
                className="w-fit block md:hidden px-1 md:px-2"
                variant="icon"
                onClick={handleBackNavigation}
              >
                <FaArrowLeft className="text-light-secondary dark:text-dark-lavender" />
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatarUrl} className="ring-0" />
              </Avatar>
              <div className="flex flex-col justify-center h-12 transition-all duration-300 ease-in-out">
                <h2
                  className="text-xl  text-light-secondary leading-none dark:text-dark-lavender font-bold font-secondary transition-all duration-300 ease-in-out"
                  onClick={toggleGroupInfoClick}
                >
                  {name}
                </h2>

                <div
                  className={`text-light-silverSteel dark:text-dark-secondary transition-opacity duration-300 ease-in-out truncate max-w-56 sm:max-w-none`}
                >
                  {renderChatInfoContent()}
                </div>
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
          <div className="search-message-container w-full relative flex items-center justify-center">
            <Button
              className="w-fit"
              variant="icon"
              onClick={handleSearchToggle}
            >
              <FaArrowLeft className="text-light-secondary dark:text-dark-lavender" />
            </Button>
            <div className="input-container w-full ">
              <Input
                name="search-messages"
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search messages..."
                autoFocus={true}
                autoComplete="off"
                icon={<FaSearch className="dark:text-dark-lavender" />}
                iconPosition="left"
              />

              {query && (
                <Box className="search-results-container px-4 py-2 absolute bg-light-primary dark:bg-dark-primary top-11 left-0 w-full">
                  {searchResults.length > 0 ? (
                    <ul aria-label="Search results">
                      <ScrollArea
                        css={{
                          maxHeight: '500px',
                        }}
                        aria-label="scroll area"
                      >
                        {searchResults.map((message) => (
                          <>
                            <li
                              key={message.id}
                              className="search-result-item flex items-center gap-4 py-2"
                            >
                              <Avatar className="w-7 h-7">
                                <AvatarImage
                                  src={message.sender.profilePicture}
                                  className="ring-0"
                                />
                              </Avatar>
                              <Box className="flex flex-col gap-y-1 w-full">
                                <Box className="flex items-center gap-2">
                                  <span className="text-light-secondary dark:text-dark-secondary">
                                    {message.sender.name}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {new Date(
                                      message.createdAt
                                    ).toLocaleDateString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </Box>
                                <SearchedMessage
                                  content={message.content}
                                  query={query}
                                />
                              </Box>
                            </li>
                            <Divider
                              alignment="horizontal"
                              className="my-1 border-b-0 dark:border-dark-silverSteel border-light-silverSteel opacity-15"
                            />
                          </>
                        ))}
                      </ScrollArea>
                    </ul>
                  ) : (
                    <p className="text-gray-500">No messages found.</p>
                  )}
                </Box>
              )}
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
