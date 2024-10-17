import { Button, Stack } from '@social-media/evoke-ui';
import { Link } from 'react-router-dom';

const AuthLinks: React.FC = () => {
  return (
    <Stack spacing="large">
      <Button className="w-fit">
        <Link to="/auth/login">Login</Link>
      </Button>
    </Stack>
  );
};

export default AuthLinks;
