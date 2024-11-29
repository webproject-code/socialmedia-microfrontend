import { ChatType, useGroupChat, useProfile } from '@social-media/api';
import { Container } from '@social-media/evoke-ui';
import { useSocket } from '@social-media/api';
import { useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatHeaderSkeleton from '../components/ChatHeaderSkeleton';
import ChatWindow from '../components/ChatWindow';
import ChatWindowSkeleton from '../components/ChatWindowSkeleton';
import MessageInput from '../components/MessageInput';
import MessageInputSkeleton from '../components/MessageInputSkeleton';

const GroupChat = () => {
  const { chatId } = useParams();
  const { joinChat } = useSocket();
  const chatType = ChatType.GROUP;

  if (!chatId) {
    redirect('/');
  }
  const { data: user } = useProfile();

  const { data: groupChat, isLoading, error } = useGroupChat(chatId!);

  useEffect(() => {
    if (chatId && chatType) {
      joinChat(chatId, chatType);
    }
  }, [joinChat, chatId, chatType]);

  if (isLoading) {
    return (
      <Container className="min-h-screen w-full flex flex-col bg-light-primary dark:bg-dark-primary">
        <ChatHeaderSkeleton />

        {/* window */}
        <ChatWindowSkeleton />

        {/* input */}
        <MessageInputSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="h-screen bg-light-primary dark:bg-dark-primary">
        something went wrong
      </Container>
    );
  }

  if (chatId && groupChat && user) {
    return (
      <div className="h-[calc(100vh-65px)] md:h-screen w-full flex flex-col">
        <ChatHeader
          chatType={chatType}
          chatId={chatId}
          name={groupChat.name}
          avatarUrl={groupChat.groupIcon}
        />
        <ChatWindow
          chatType={chatType}
          chatId={chatId}
          isGroupOwner={user.id === groupChat.ownerId}
        />
        <MessageInput chatType={chatType} chatId={chatId} />
      </div>
    );
  }
};

export default GroupChat;
