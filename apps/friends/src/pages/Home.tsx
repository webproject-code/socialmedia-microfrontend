import { useNavigate } from 'react-router-dom';

import { Button } from '@social-media/evoke-ui';

import { useLogin } from '@social-media/api';

const Home: React.FC = () => {
  const { data: user, mutate } = useLogin();
  const navigate = useNavigate();

  const loginHandler = () => {
    mutate({
      email: 'kspatelsimform100@gmail.com',
      password: '123456789',
    });
    navigate(`/friends`);
  };

  return (
    <div className="h-screen bg-light-primary dark:bg-dark-primary">
      {!user ? (
        <Button className="w-fit" onClick={loginHandler}>
          Login
        </Button>
      ) : (
        <p>User LoggedIn</p>
      )}
    </div>
  );
};

export default Home;
