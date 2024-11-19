import { ChatType, useOneOnOneChat, useProfile } from '@social-media/api';
import { Container } from '@social-media/evoke-ui';
import { useSocket } from '@social-media/utils';
import { useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatHeaderSkeleton from '../components/ChatHeaderSkeleton';
import ChatWindow from '../components/ChatWindow';
import ChatWindowSkeleton from '../components/ChatWindowSkeleton';
import MessageInput from '../components/MessageInput';
import MessageInputSkeleton from '../components/MessageInputSkeleton';

const OneOnOneChat = () => {
  const { chatId } = useParams();
  const { joinChat } = useSocket();
  const chatType = ChatType.ONE_ON_ONE;

  if (!chatId) {
    redirect('/');
  }

  const { data: user } = useProfile();

  const { data, isLoading, error } = useOneOnOneChat(chatId!);

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

  if (data && user && chatId) {
    const name =
      data.initiatorId === user.id
        ? data.participant.name
        : data.initiator.name;
    const avatarUrl =
      data.initiatorId === user.id
        ? data.participant.profilePicture
        : data.initiator.profilePicture;
    return (
      <div className="min-h-screen w-full flex flex-col">
        <ChatHeader
          chatType={chatType}
          chatId={chatId}
          name={name}
          avatarUrl={avatarUrl}
        />
        <ChatWindow
          chatType={chatType}
          chatId={chatId}
          isVanishMode={data.vanishMode}
        />
        <MessageInput chatType={chatType} chatId={chatId} />
      </div>
    );
  }
};

export default OneOnOneChat;
