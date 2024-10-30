import React, { useEffect, useRef } from 'react';

import { useChatStore } from '../store/useChatStore';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import InfiniteScrollList from './InfiniteScrollList';
import MessageInput from './MessageInput';
import { sendMessage } from '../services/socket-services';

const ChatWindow = () => {
  const { currentChatId, currentChatType, searchResults } = useChatStore();

  //  infinite query
  const { messages, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteScroll({
      chatId: currentChatId || '',
      chatType: currentChatType || 'ONE_ON_ONE',
    });

  const messagesRef = useRef<HTMLDivElement | null>(null);

  const scrollToMessage = (messageId: string) => {
    const element = document.getElementById(messageId);

    console.log(element, messagesRef.current);
    if (element && messagesRef.current) {
      messagesRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (currentChatId) {
      refetch();
    }
  }, [currentChatId, refetch]);

  return (
    <div className="chat-window" ref={messagesRef}>
      <InfiniteScrollList
        items={messages.map((message) => (
          <div key={message.id} id={message.id}>
            {message.content}
          </div>
        ))}
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      />

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => scrollToMessage(result.id)}
              className="search-result-item"
            >
              {result.content}
            </div>
          ))}
        </div>
      )}
      <MessageInput
        onSend={(message) => sendMessage(currentChatId!, message)}
      />
    </div>
  );
};

export default ChatWindow;
