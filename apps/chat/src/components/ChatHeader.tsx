import { Button, Input } from '@social-media/evoke-ui';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMessagesSearch } from '../hooks/useMessagesSearch';
import { useChatStore } from '../store/useChatStore';
import { useTypingStatus } from '../hooks/useTypingStatus';

const ChatHeader: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const { searchMessages } = useMessagesSearch();
  const { setSearchResults } = useChatStore();
  const { isTyping, typingUserId } = useTypingStatus();

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
    <div className="chat-header">
      <h2 className="text-3xl">Chat</h2>
      {isTyping && typingUserId && (
        <span className="typing-status">{typingUserId} is typing...</span>
      )}
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
