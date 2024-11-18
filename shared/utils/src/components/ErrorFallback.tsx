import { Button } from '@social-media/evoke-ui';
import { useTheme } from '../hooks/useTheme';

const handleReload = () => {
  window.location.reload();
};

export const ErrorFallback = () => {
  const theme = useTheme();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light-primary dark:bg-dark-primary text-center p-4 dark:text-dark-lavender">
      <img
        src={`assets/images/${
          theme.isDarkTheme ? 'dark' : 'light'
        }-error-boundary-image.svg`}
        alt="logo"
        width={400}
        height={400}
      />
      <h1 className="text-2xl font-semibold mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-light-silverSteel dark:text-dark-silverSteel mb-6">
        We encountered an unexpected error. Please try refreshing the page.
      </p>
      <Button onClick={handleReload} className="w-fit">
        Reload Page
      </Button>
    </div>
  );
};
