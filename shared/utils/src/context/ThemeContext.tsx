import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@social-media/evoke-ui';
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const lightTheme = createTheme({
  colors: {
    variants: {
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#3366CC',
      },
      levender: {
        main: '#D4BFFF',
      },
      silverSteel: {
        main: '#6b7280',
      },
      modalColor: {
        main: '#F4F4F9',
      },
    },
  },
});

const darkTheme = createTheme({
  colors: {
    variants: {
      primary: {
        main: '#24293C',
      },
      secondary: {
        main: '#AACCFF',
      },
      levender: {
        main: '#E6E6FA',
      },
      silverSteel: {
        main: '#A7A9AA',
      },
      modalColor: {
        main: '#0F0E21',
      },
    },
  },
});

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
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
