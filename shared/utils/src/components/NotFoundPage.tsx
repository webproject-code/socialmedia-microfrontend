import { Box, Button, Stack } from '@social-media/evoke-ui';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <Stack
      className="h-screen w-screen bg-light-primary dark:bg-dark-primary dark:text-dark-lavender"
      align={'center'}
      justify={'center'}
      direction={'column'}
      spacing="xxlarge"
    >
      <h1 className="text-8xl font-bold text-light-secondary dark:text-dark-secondary">
        404
      </h1>
      <Box className="text-center">
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </Box>

      <Link to={'/'}>
        <Button className="w-fit">Go Back to Home</Button>
      </Link>
    </Stack>
  );
};
