import { Button, Input } from '@social-media/evoke-ui';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMessagesSearch } from '../hooks/useMessagesSearch';
import { useChatStore } from '../store/useChatStore';

interface ChatHeaderProps {
  chatType: string;
  name: string;
}
const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const { searchMessages } = useMessagesSearch();
  const { setSearchResults, isTyping } = useChatStore();

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
  };

  return (
    <div className="chat-header h-12 flex items-center px-3 dark:text-dark-secondary">
      <h2 className="text-3xl">{name}</h2>
      {isTyping && <span className="typing-status"> is typing...</span>}
      <Button className="w-fit" variant={'icon'} onClick={handleSearchToggle}>
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
      )}
    </div>
  );
};

export default ChatHeader;
