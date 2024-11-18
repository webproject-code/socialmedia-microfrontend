import { useLogin } from '@social-media/api';
import { Button } from '@social-media/evoke-ui';
import { useStore } from '@social-media/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const { isAuthenticated, login, logout } = useStore();

  const [buttonText, setButtonText] = useState('Login');
  const [activeUser, setActiveUser] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) {
      setButtonText('Logging in...');
    } else if (isAuthenticated) {
      setButtonText('Logout');
    } else {
      setButtonText('Login');
    }
  }, [isPending, isAuthenticated]);

  const loginHandler = (email: string, password: string) => {
    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          setButtonText('Logout');
          login({ isAuthenticated: true, user: data });
          navigate(`/chats`);
        },
      }
    );
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    logout();

    setActiveUser(null);
    setButtonText('Login');
  };

  return (
    <div className=" bg-light-primary dark:bg-dark-primary w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl text-light-secondary dark:text-dark-secondary font-secondary">
        Welcome to chat list mfe
      </h1>

      {!isAuthenticated ? (
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
        </div>
      ) : (
        <Button className="w-fit" onClick={logoutHandler}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
