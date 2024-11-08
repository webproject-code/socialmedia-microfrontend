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
      className={`message-bubble ${className} ${
        isSentByCurrentUser ? 'justify-end' : 'justify-start'
      } flex items-start gap-x-3 mb-2 mx-5`}
    >
      {!isSentByCurrentUser && (
        <Avatar style={{ width: '36px', height: '36px' }}>
          <AvatarImage src={message.sender.profilePicture} />
        </Avatar>
      )}
      <div className="flex flex-col">
        <div
          className={`message-container px-4 py-2  rounded-xl ${
            isSentByCurrentUser
              ? 'rounded-tr-none dark:bg-dark-secondary'
              : 'rounded-tl-none dark:bg-dark-lavender'
          } max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl`}
        >
          <p className="font-primary text-black break-words">
            {message.content}
          </p>
        </div>
        <span className="message-timestamp self-end text-xs dark:text-dark-silverSteel">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
