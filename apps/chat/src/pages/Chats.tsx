import { useProfile } from '@social-media/api';
import { Container } from '@social-media/evoke-ui';
import React from 'react';
import { Outlet, redirect } from 'react-router-dom';

const Chats: React.FC = () => {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <div>Fetching profile</div>;
  }
  if (!data) redirect('/');
  else {
    return (
      <Container className="bg-light-primary dark:bg-dark-primary h-full w-full flex flex-col">
        <Outlet />
      </Container>
    );
  }
};

export default Chats;
