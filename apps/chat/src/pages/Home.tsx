import React from 'react';

import { useLogin } from '@social-media/api';
import { Box, Button, Stack } from '@social-media/evoke-ui';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { data: user, mutate } = useLogin();
  const navigate = useNavigate();

  const loginHandler = () => {
    mutate({
      email: 'kspatelsimform100@gmail.com',
      password: '123456789',
    });
  };

  return (
    <Box className="bg-light-primary dark:bg-dark-primary h-screen w-screen">
      <Stack
        justify="center"
        align="center"
        direction="column"
        className="h-full w-full"
      >
        {!user ? (
          <Box>
            <h2 className="dark:text-white text-4xl font-semibold">
              Welcome to the Chat Microfrontend
            </h2>
            <Button onClick={loginHandler}>Login</Button>
          </Box>
        ) : (
          <Box>
            <h2 className="dark:text-white text-4xl font-semibold">
              Home page of Chat Microfrontend
            </h2>
            <Button onClick={() => navigate('/chats')}>Chats</Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Home;
