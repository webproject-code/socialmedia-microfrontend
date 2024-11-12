import React from 'react';

const NoChatSelected: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="mb-4">
        {/* Icon or Image Placeholder */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20h9m-9 0a9 9 0 01-9-9m9 9V9m0 0a9 9 0 0118 0 9 9 0 01-18 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold">No Chat Selected</h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please select a chat to start a conversation.
      </p>
    </div>
  );
};

export default NoChatSelected;
