import { Box } from '@social-media/evoke-ui';
import { useTheme } from '@social-media/utils';
import React from 'react';

const ChatNotFound: React.FC = () => {
  const { isDarkTheme } = useTheme();
  return (
    <Box className="flex justify-center h-full items-center flex-col text-light-silverSteel/50 dark:text-dark-silverSteel/50">
      <img
        src={
          isDarkTheme
            ? 'assets/images/dark-no-results-found-image.svg'
            : 'assets/images/light-no-results-found-image.svg'
        }
        width={300}
        height={300}
        alt="no-search-results-found-img"
        className="object-fill"
      />

      <p className="font-primary">No chats found !</p>
    </Box>
  );
};

export default ChatNotFound;
