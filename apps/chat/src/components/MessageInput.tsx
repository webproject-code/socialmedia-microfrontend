import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Button, Input } from '@social-media/evoke-ui';
import { useProfile } from '@social-media/api';
import { startTyping, stopTyping } from '../services/socket-services';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const { currentChatId } = useChatStore();
  const { data } = useProfile();

  const handleTyping = () => {
    if (currentChatId && data) {
      startTyping(currentChatId, data.id);

      setTimeout(() => stopTyping(currentChatId, data.id), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    handleTyping();
  };

  const handleSendMessage = () => {
    if (message.trim() && data) {
      onSend(message);
      setMessage('');
      stopTyping(currentChatId!, data?.id);
    }
  };
  return (
    <div className="message-input">
      <Input
        name="message"
        type="text"
        value={message}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Type a message..."
      />
      <Button className="w-fit" onClick={handleSendMessage}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
