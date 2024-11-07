import React from 'react';

import { Message } from '@social-media/api';
import { Avatar, AvatarImage } from '@social-media/evoke-ui';

interface MessageBubbleProps {
  message: Message;
  isSentByCurrentUser: boolean;
  canDeleteMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isSentByCurrentUser,
  // canDeleteMessage,
}) => {
  const className = isSentByCurrentUser ? 'sent-message' : 'received-message';

  return (
    <div
      className={`message-bubble ${className} relative group flex items-center hover:bg-black/5 p-4 transition w-full`}
    >
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage src={message.sender.profilePicture} />
          </Avatar>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm cursor-pointer dark:text-zinc-300">
                {message.sender.name}
              </p>
            </div>
            <span className="message-timestamp text-xs dark:text-zinc-400">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm dark:text-zinc-300">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
