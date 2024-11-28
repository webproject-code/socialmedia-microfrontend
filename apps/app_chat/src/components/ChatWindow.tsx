import React, { ElementRef, useMemo, useRef } from 'react';

import {
  Box,
  Button,
  Container,
  ScrollArea,
  Stack,
} from '@social-media/evoke-ui';
import { ChatType, Message, useProfile } from '@social-media/api';
import { Spinner, useStore } from '@social-media/utils';

import { useChatQuery } from '../hooks/useChatQuery';
import { useChatScroll } from '../hooks/useChatScroll';
import { useChatSocket } from '../hooks/useChatSocket';
import ChatWindowSkeleton from './ChatWindowSkeleton';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  chatId: string;
  chatType: ChatType;
  isGroupOwner?: boolean;
  isVanishMode?: boolean;
}

interface MessagesByDate {
  [date: string]: Array<Message>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  chatType,
  isGroupOwner,
  isVanishMode,
}) => {
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;
  const updateChatSettingsKey = `chat:${chatId}:settings:update`;
  const { data: user } = useProfile();
  const { vanishMessages } = useStore();

  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      chatId,
      chatType,
    });
  useChatSocket({ addKey, updateKey, updateChatSettingsKey, chatId });
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
    if (!data?.pages && !isVanishMode) return {};

    const messagesToGroup = isVanishMode
      ? vanishMessages[chatId] || []
      : data?.pages?.flatMap((page) => page?.messages ?? []) ?? [];

    const groups: MessagesByDate = {};

    messagesToGroup.forEach((message) => {
      const date = new Date(message.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    Object.keys(groups).forEach((date) => {
      groups[date].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });

    return groups;
  }, [data?.pages, isVanishMode, chatId]);

  if (status === 'pending') {
    return <ChatWindowSkeleton />;
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
    <div className="chat-window flex-1 flex flex-col overflow-y-auto bg-gray-300 dark:bg-[#4C4D51]/20">
      <ScrollArea className="h-full" ref={chatRef}>
        {hasNextPage === false && <Box className="flex-grow" />}

        {hasNextPage && (
          <Box className="flex justify-center">
            {isFetchingNextPage ? (
              <Spinner />
            ) : (
              <Button
                className="w-fit dark:bg-dark-secondary bg-light-secondary text-xs"
                size="sm"
                onClick={() => fetchNextPage()}
              >
                Load previous messages
              </Button>
            )}
          </Box>
        )}

        <Box className="flex flex-col-reverse min-h-full">
          {Object.entries(groupedMessages)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([date, messages]) => (
              <Stack direction={'column'} key={date}>
                <div className="text-center text-xs my-2 bg-gray-100 dark:bg-dark-primary text-gray-600 dark:text-dark-silverSteel py-1 rounded-full mx-auto px-4">
                  {formatDateLabel(date)}
                </div>

                <Stack direction={'column'}>
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
                </Stack>
              </Stack>
            ))}
        </Box>
        <div ref={bottomRef} />
      </ScrollArea>
    </div>
  );
};

export default ChatWindow;
