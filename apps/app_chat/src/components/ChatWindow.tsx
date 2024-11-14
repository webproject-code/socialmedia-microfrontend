import { ChatType, Message, useProfile } from '@social-media/api';
import { Container } from '@social-media/evoke-ui';
import React, { ElementRef, useMemo, useRef } from 'react';
import { useChatSocket } from '../hooks/useChatSocket';
import MessageBubble from './MessageBubble';
import { useChatQuery } from '../hooks/useChatQuery';
import { useChatScroll } from '../hooks/useChatScroll';

interface ChatWindowProps {
  chatId: string;
  chatType: ChatType;
  isGroupOwner?: boolean;
}

interface MessagesByDate {
  [date: string]: Array<Message>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  chatType,
  isGroupOwner,
}) => {
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;
  const { data: user } = useProfile();

  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  console.log('in chat window calling chat query');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      chatId,
      chatType,
    });
  console.log(data, 'data in window');
  useChatSocket({ addKey, updateKey, chatId });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.messages.length ?? 0,
  });

  const formatDateLabel = (date: string) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (today.toDateString() === messageDate.toDateString()) {
      return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === messageDate.toDateString()) {
      return 'Yesterday';
    }

    return messageDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    if (!data?.pages) return {};

    const groups: MessagesByDate = {};

    // Process pages in reverse order
    [...data.pages].reverse().forEach((page) => {
      if (!page?.messages) return;

      // Process messages in each page
      page.messages.forEach((message) => {
        const date = new Date(message.createdAt).toDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
      });
    });

    // Sort messages within each date group
    Object.keys(groups).forEach((date) => {
      groups[date].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });

    return groups;
  }, [data?.pages]);

  if (status === 'pending') {
    return (
      <Container className="h-screen bg-light-primary dark:bg-dark-primary">
        <div className="flex-1 justify-center items-center">Loading...</div>
      </Container>
    );
  }

  if (status === 'error') {
    return (
      <Container className="h-screen bg-light-primary dark:bg-dark-primary">
        <div className="flex-1 justify-center items-center">
          Something went wrong while fetching messages...
        </div>
      </Container>
    );
  }

  return (
    <div
      className="chat-window flex-1 flex flex-col py-4 overflow-y-auto dark:bg-[#4C4D51]/20"
      ref={chatRef}
    >
      {hasNextPage === false && <div className="flex-1" />}

      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <div className="h-6 w-6 text-zinc-500 border-1 rounded-full animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {Object.entries(groupedMessages)
          .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
          .map(([date, messages]) => (
            <div key={date} className="flex flex-col">
              <div className="text-center text-xs my-2 bg-gray-100 dark:bg-dark-primary dark:text-dark-silverSteel py-1 rounded-full mx-auto px-4">
                {formatDateLabel(date)}
              </div>
              <div className="flex flex-col">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isSentByCurrentUser={message.senderId === user?.id}
                    canDeleteMessage={
                      message.senderId === user?.id || Boolean(isGroupOwner)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
