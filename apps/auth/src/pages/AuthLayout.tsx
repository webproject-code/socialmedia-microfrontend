import { Box } from '@social-media/evoke-ui';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <Box className="bg-light-primary dark:bg-dark-primary dark:text-white w-screen h-screen ">
      <Outlet />
    </Box>
  );
};

export default Auth;
