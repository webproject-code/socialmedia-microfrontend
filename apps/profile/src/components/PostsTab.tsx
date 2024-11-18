import { Box, Stack } from '@social-media/evoke-ui';
import { useTheme } from '@social-media/utils';

const PostsTab = () => {
  const theme = useTheme();
  return (
    <Stack
      align="center"
      justify="center"
      direction="column"
      className="text-center h-full text-light-silverSteel/50 dark:text-dark-silverSteel/50 rounded-md p-4 "
    >
      <img
        src={`assets/images/${
          theme.isDarkTheme ? 'dark' : 'light'
        }-no-results-found-image.svg`}
        alt="logo"
        width={300}
        height={300}
        className="opacity-80"
      />
      <Box>
        <h1 className="font-secondary font-medium text-xl sm:text-2xl mb-2">
          No Posts
        </h1>
        <p className="font-medium text-base sm:text-lg">
          Nothing here yet. Share something to get started!
        </p>
      </Box>
    </Stack>
  );
};

export default PostsTab;
