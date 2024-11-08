import { Avatar, AvatarImage } from '@social-media/evoke-ui';
import React from 'react';
// import { FaSearch } from 'react-icons/fa';
// import { useMessagesSearch } from '../hooks/useMessagesSearch';
// import { useChatStore } from '../store/useChatStore';
import { useTypingStatus } from '../hooks/useTypingStatus';

interface ChatHeaderProps {
  chatType: string;
  name: string;
  avatarUrl: string;
}
const ChatHeader: React.FC<ChatHeaderProps> = ({ name, avatarUrl }) => {
  // const [isSearchActive, setIsSearchActive] = useState(false);
  // const [query, setQuery] = useState('');
  // const { searchMessages } = useMessagesSearch();
  // const { setSearchResults } = useChatStore();
  const { typingMessage } = useTypingStatus();

  // const handleSearchToggle = () => {
  //   setIsSearchActive((prev) => !prev);
  //   setQuery('');
  // };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);

  //   if (value) {
  //     searchMessages(value);
  //   } else {
  //     setSearchResults([]);
  //   }
  // };

  return (
    <div className="chat-header flex items-center justify-between py-3 px-4 sticky top-0 bg-light-primary dark:bg-dark-primary z-10">
      <div className="cursor-pointer flex gap-x-4 items-center">
        <Avatar size="sm">
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex flex-col justify-between h-12">
          <h2 className="text-2xl text-dark-lavender justify-self-start font-semibold font-secondary">
            {name}
          </h2>
          {typingMessage && (
            <span className="typing-status dark:text-dark-secondary text-sm">
              {typingMessage}
            </span>
          )}
        </div>
      </div>
      {/* <Button className="w-fit" variant={'icon'} onClick={handleSearchToggle}>
        <FaSearch />
      </Button>
      {isSearchActive && (
        <Input
          name="search-messages"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search messages..."
        />
      )} */}
    </div>
  );
};

export default ChatHeader;
