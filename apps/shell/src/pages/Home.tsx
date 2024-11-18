import { Box, Button, Divider, Stack } from '@social-media/evoke-ui';
import { useStore } from '@social-media/utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Stack className="w-full h-full">
      <Stack align="center" justify="center" className="w-full">
        <h1 className="text-2xl font-semibold text-light-secondary dark:text-dark-secondary">
          Welcome to Social Media App
        </h1>
      </Stack>
      <Divider
        alignment="vertical"
        className="xs:hidden md:block border-light-silverSteel dark:border-dark-silverSteel opacity-15"
      />

      {/* Profile Section */}
      <Box className="w-[400px] xs:hidden md:block bg-light-modalColor dark:bg-dark-modalColor">
        <Stack
          direction="column"
          align="center"
          spacing="large"
          justify="center"
          className="h-full"
        >
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full mx-auto object-cover"
          />
          <Stack direction="column" align="center" spacing="small">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-light-silverSteel dark:text-dark-silverSteel mb-2 text-sm md:text-base">
              {user.email}
            </p>
            <Button
              size="sm"
              className="w-fit"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              View Profile
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Home;
