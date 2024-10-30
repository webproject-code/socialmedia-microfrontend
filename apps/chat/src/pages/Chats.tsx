import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { connectSocket, disconnectSocket } from '../services/socket-services';
import { Container } from '@social-media/evoke-ui';
import ChatWindow from '../components/ChatWindow';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from '../components/ChatHeader';

const Chats: React.FC = () => {
  const [searchParams] = useSearchParams();
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);

  useEffect(() => {
    const chatId = searchParams.get('chatId');
    const chatType = (searchParams.get('chatType') as 'ONE_ON_ONE') || 'GROUP';
    if (chatId && chatType) {
      setCurrentChat(chatId, chatType);
    }
  }, [searchParams, setCurrentChat]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      connectSocket(token);
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <Container className="bg-light-primary dark:bg-dark-primary h-screen w-screen">
      <ChatHeader />
      <ChatWindow />
    </Container>
  );
};

export default Chats;
