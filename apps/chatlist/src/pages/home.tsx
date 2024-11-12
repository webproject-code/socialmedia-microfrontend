import { Button } from '@social-media/evoke-ui';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-light-primary dark:bg-dark-primary w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl text-light-secondary dark:text-dark-secondary font-secondary">
        Welcome to chat list mfe
      </h1>
      <Button
        variant="solid"
        className="w-40 font-primary"
        onClick={() => navigate('/chats')}
      >
        Go to ChatList
      </Button>
    </div>
  );
};
