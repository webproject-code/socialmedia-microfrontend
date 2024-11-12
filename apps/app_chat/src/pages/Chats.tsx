import { useProfile } from '@social-media/api';
import { Container } from '@social-media/evoke-ui';
import React from 'react';
import { Outlet, redirect } from 'react-router-dom';

const Chats: React.FC = () => {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <Container className="h-screen bg-light-primary dark:bg-dark-primary">
        Fetching profile
      </Container>
    );
  }
  if (!data) redirect('/');
  else {
    return (
      <Container className="h-full bg-light-primary dark:bg-dark-primary">
        <Outlet />
      </Container>
    );
  }
};

export default Chats;
