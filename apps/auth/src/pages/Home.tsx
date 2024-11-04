import { Box, Card, Stack } from '@social-media/evoke-ui';
import { useStore } from '../store/store';
import UserProfileCard from '../components/UserProfileCard';
import AuthLinks from '../components/AuthLinks';

const Home: React.FC = () => {
  const { isAuthenticated } = useStore();

  return (
    <Box className="bg-light-primary dark:bg-dark-primary h-screen w-screen">
      <Stack
        justify="center"
        align="center"
        direction="column"
        className="h-full w-full"
      >
        {!isAuthenticated && (
          <Box>
            <h2 className="dark:text-white text-4xl font-semibold">
              Welcome to the Auth Microfrontend
            </h2>
          </Box>
        )}
        <Card className="shadow-lg rounded-lg p-6 w-fit dark:bg-dark-modalColor">
          {isAuthenticated ? <UserProfileCard /> : <AuthLinks />}
        </Card>
      </Stack>
    </Box>
  );
};

export default Home;
