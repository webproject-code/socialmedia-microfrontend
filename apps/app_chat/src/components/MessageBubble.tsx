import React, { useState } from 'react';
import { FaBan } from 'react-icons/fa';

import { ChatType, Message } from '@social-media/api';
import { Avatar, AvatarImage } from '@social-media/evoke-ui';

import DeleteButton from './DeleteMessageButton';
import DeleteMessageModal from './DeleteMessageModal';

interface MessageBubbleProps {
  message: Message;
  isSentByCurrentUser: boolean;
  canDeleteMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isSentByCurrentUser,
  canDeleteMessage,
}) => {
  const isGroupMessage = message.groupChatId ? true : false;
  const bubbleAlignment = isSentByCurrentUser ? 'justify-end' : 'justify-start';
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`message-bubble flex items-start gap-x-3 mb-3 mx-5 ${bubbleAlignment}`}
    >
      {!isSentByCurrentUser && isGroupMessage && (
        <MessageAvatar profilePicture={message.sender.profilePicture} />
      )}

      <div className="flex flex-col">
        <MessageContainer
          isSentByCurrentUser={isSentByCurrentUser}
          isGroupMessage={isGroupMessage}
          message={message}
          canDeleteMessage={canDeleteMessage}
          onDelete={openDeleteModal}
        />
        <MessageTimestamp timestamp={message.createdAt} />
      </div>
      <DeleteMessageModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        messageId={message.id}
        chatId={message.oneOnOneChatId ?? message.groupChatId}
        chatType={message.oneOnOneChatId ? ChatType.ONE_ON_ONE : ChatType.GROUP}
      />
    </div>
  );
};

export default MessageBubble;

interface MessageContainerProps {
  isSentByCurrentUser: boolean;
  isGroupMessage: boolean;
  canDeleteMessage: boolean;
  message: Message;
  onDelete: () => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  isSentByCurrentUser,
  isGroupMessage,
  canDeleteMessage,
  message,
  onDelete,
}) => (
  <div
    className={`relative shadow-md group ${getMessageContainerStyles(
      isSentByCurrentUser
    )}`}
  >
    {!isSentByCurrentUser && isGroupMessage && (
      <SenderName name={message.sender.name} />
    )}
    <MessageContent
      content={message.content}
      isDeleted={message.isDeleted}
      isSentByCurrentUser={isSentByCurrentUser}
    />
    {canDeleteMessage && !message.isDeleted && (
      <DeleteButton onClick={onDelete} />
    )}
  </div>
);

const MessageAvatar: React.FC<{ profilePicture: string }> = ({
  profilePicture,
}) => (
  <Avatar className="h-6 w-6">
    <AvatarImage src={profilePicture} className="ring-0" />
  </Avatar>
);

const SenderName: React.FC<{ name: string }> = ({ name }) => (
  <h3 className="text-sm font-semibold dark:text-dark-primary">{name}</h3>
);

const MessageContent: React.FC<{
  isSentByCurrentUser: boolean;
  content: string;
  isDeleted: boolean;
}> = ({ content, isDeleted, isSentByCurrentUser }) => (
  <p className={getMessageTextStyles(isSentByCurrentUser, isDeleted)}>
    {isDeleted ? (
      <span className="flex gap-1 justify-between items-center">
        {' '}
        <FaBan /> <span>This message has been deleted</span>
      </span>
    ) : (
      content
    )}
  </p>
);

const MessageTimestamp: React.FC<{ timestamp: string }> = ({ timestamp }) => (
  <span className="message-timestamp self-end text-xs text-gray-600 dark:text-dark-silverSteel">
    {formatMessageTime(timestamp)}
  </span>
);

const getMessageContainerStyles = (isSentByCurrentUser: boolean): string => {
  const baseStyles =
    'px-4 py-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl';
  const conditionalStyles = isSentByCurrentUser
    ? 'rounded-tr-none dark:bg-dark-secondary bg-light-secondary'
    : 'rounded-tl-none dark:bg-dark-lavender bg-light-primary';

  return `${baseStyles} ${conditionalStyles} `;
};

const getMessageTextStyles = (
  isSentByCurrentUser: boolean,
  isDeleted: boolean
): string => {
  if (isDeleted) {
    return `font-primary italic ${
      isSentByCurrentUser ? 'text-gray-300 dark:text-gray-500' : 'text-gray-500'
    } break-words text-sm`;
  }

  const sentStyles = 'text-white dark:text-black'; // Current user's message is white in light mode

  const receivedStyles = 'text-gray-800 dark:text-black';

  return `font-primary ${
    isSentByCurrentUser ? sentStyles : receivedStyles
  } break-words text-sm`;
};

const formatMessageTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
  });
};
