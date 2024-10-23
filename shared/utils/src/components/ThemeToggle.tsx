import React from 'react';

import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';

import { useTheme } from '../hooks/useTheme';
import { Button } from '@social-media/evoke-ui';

export const ThemeToggle: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme(); // Use the generalized context

  return (
    <Button
      onClick={toggleTheme}
      variant={'icon'}
      className="w-fit p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={
        isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'
      }
    >
      {isDarkTheme ? (
        <FaSun className="w-5 h-5 text-yellow-500" />
      ) : (
        <FaMoon className="w-5 h-5 text-gray-700" />
      )}
    </Button>
  );
};
