import React, { createContext, useState, useEffect } from 'react';

// Create the context
export type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Provider component to manage the theme state
export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  );

  useEffect(() => {
    // Check initial theme preference and local storage
    const localTheme = localStorage.getItem('theme');
    const prefersDarkTheme =
      localTheme === 'dark' ||
      (!localTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkTheme(prefersDarkTheme);
  }, []);

  useEffect(() => {
    // Update document class when theme changes
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
