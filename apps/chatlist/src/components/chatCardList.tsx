import { User } from '@social-media/api';
import { useStore } from '@social-media/utils';
import React, { useCallback, useState } from 'react';

import ChatListHeader from './ChatListHeader';
import ChatMenu from './ChatMenu';
import ConversationList from './ConversationList';

export const ChatCardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useStore();
  const currentUserId = (user as User).id;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  return (
    <div className="flex flex-col h-full">
      <ChatListHeader user={user as User} />
      <ChatMenu
        searchQuery={searchTerm}
        handleSearch={handleChange}
        currentUserId={currentUserId}
      />
      <ConversationList
        searchQuery={searchTerm}
        currentUserId={currentUserId}
      />
    </div>
  );
};
