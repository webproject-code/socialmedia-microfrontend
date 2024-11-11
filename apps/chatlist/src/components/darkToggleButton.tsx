import { useTheme } from '@social-media/utils';

import { IoSunny, IoMoon } from 'react-icons/io5';

export const DarkModeToggle = () => {
  const { toggleTheme, isDarkTheme } = useTheme();

  const toggleDarkMode = () => {
    // setDarkMode(!darkMode);
    toggleTheme();
  };

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkTheme ? (
        <IoSunny className="w-5 h-5" />
      ) : (
        <IoMoon className="w-5 h-5" />
      )}
    </button>
  );
};
