import { useProfile } from '@social-media/api';
import React, { ElementRef, useRef } from 'react';
import { useChatQuery } from '../hooks/useChatQuery';
import { useChatScroll } from '../hooks/useChatScroll';
import { useChatSocket } from '../hooks/useChatSocket';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  chatId: string;
  chatType: 'ONE_ON_ONE' | 'GROUP';
  groupOwnerId?: string;
}
const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, chatType }) => {
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const { data: user } = useProfile();

  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  //  infinite query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      chatId,
      chatType,
    });

  useChatSocket({ addKey, updateKey, chatId });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.messages.length ?? 0,
  });

  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Something went wrong</div>;
  }

  return (
    <div
      className="chat-window flex-1 flex flex-col py-4 overflow-y-auto"
      ref={chatRef}
    >
      {/* empty div to cover space */}
      {hasNextPage === false ? <div className="flex-1" /> : null}

      {/* show button to load previous message if there are */}
      {hasNextPage ? (
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
      ) : null}

      {/* render messages */}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.messages.map((message) => (
              <MessageBubble
                message={message}
                isSentByCurrentUser={message.senderId === user?.id}
                canDeleteMessage={message.senderId === user?.id}
                key={message.id}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
