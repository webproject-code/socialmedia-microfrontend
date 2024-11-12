import { useTheme } from '@social-media/utils';
import React from 'react';

const NoChatSelected: React.FC = () => {
  const theme = useTheme();
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        {/* Icon or Image Placeholder */}
        <img
          src={`assets/images/${
            theme.isDarkTheme ? 'dark' : 'light'
          }-chat-initiate.svg`}
          alt="logo"
          width={300}
          height={300}
          className="opacity-80"
        />
      </div>
      <h2 className="text-xl font-semibold">Start a New Conversation</h2>
      <p className="mt-2 text-sm text-light-silverSteel dark:text-dark-silverSteel">
        Please select a chat to start a conversation.
      </p>
    </div>
  );
};

export default NoChatSelected;
