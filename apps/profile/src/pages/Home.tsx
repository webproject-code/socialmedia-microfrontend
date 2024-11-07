import { useLogin } from '@social-media/api';
import { Button, Stack } from '@social-media/evoke-ui';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';

const Home: React.FC = () => {
  const { mutate, isPending } = useLogin();
  const { setUser, setVisitedUser } = useStore();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('Login');
  const [activeUser, setActiveUser] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) {
      setButtonText('Logging in...');
    } else if (token) {
      setButtonText('Logout');
    } else {
      setButtonText('Login');
    }
  }, [isPending, token]);

  const loginHandler = (email: string, password: string) => {
    setActiveUser(email);
    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          setButtonText('Logout');
          setUser(data);
          navigate(`/users/${data.id}`);
        },
      }
    );
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setUser(null);
    setVisitedUser(null);
    setActiveUser(null);
    setButtonText('Login');
  };

  return (
    <div className="h-screen bg-light-primary dark:bg-dark-primary flex items-center justify-center">
      <Stack
        spacing="medium"
        justify="center"
        align="center"
        className="text-center rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800"
        direction="column"
      >
        <h1 className="text-3xl font-bold dark:text-white">
          Welcome to Profile Microfrontend
        </h1>

        {!token ? (
          <div className="flex gap-4">
            <Button
              className="w-fit"
              onClick={() =>
                loginHandler('kspatelsimform100@gmail.com', '12345678')
              }
              disabled={isPending}
            >
              {isPending && activeUser === 'kspatelsimform100@gmail.com'
                ? 'Logging in User 1...'
                : 'Login as User 1'}
            </Button>
            <Button
              className="w-fit"
              onClick={() => loginHandler('vatsal@gmail.com', '12345678')}
              disabled={isPending}
            >
              {isPending && activeUser === 'vatsal@gmail.com'
                ? 'Logging in User 2...'
                : 'Login as User 2'}
            </Button>
          </div>
        ) : (
          <Button className="w-fit" onClick={logoutHandler}>
            {buttonText}
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default Home;
