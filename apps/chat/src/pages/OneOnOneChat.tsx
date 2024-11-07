import { useOneOnOneChat, useProfile } from '@social-media/api';
import { useSocket } from '@social-media/utils';
import { useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

const OneOnOneChat = () => {
  const { chatId } = useParams();
  const { joinChat } = useSocket();
  const chatType = 'ONE_ON_ONE';

  if (!chatId) {
    redirect('/');
  }

  const { data: user } = useProfile();

  const { data, isLoading, error } = useOneOnOneChat(chatId!);

  useEffect(() => {
    if (chatId && chatType) {
      joinChat(chatId, chatType);
    }
  }, [joinChat, chatId]);

  if (isLoading) {
    return <div>Loading chat...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (data && user && chatId) {
    const name =
      data.initiatorId === user.id ? data.participantId : data.initiatorId;
    return (
      <>
        <ChatHeader chatType={chatType} name={name} />
        <ChatWindow chatType={chatType} chatId={chatId} />
        <MessageInput chatType={chatType} chatId={chatId} />
      </>
    );
  }
};

export default OneOnOneChat;
