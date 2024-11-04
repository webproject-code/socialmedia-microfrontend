import { Button, Stack } from '@social-media/evoke-ui';
import { Link } from 'react-router-dom';

const AuthLinks: React.FC = () => {
  return (
    <Stack spacing="large">
      <Link to="/auth/login">
        <Button>Login</Button>
      </Link>

      <Link to="/auth/register">
        <Button>Register</Button>
      </Link>

      <Link to="/auth/forgot-password">
        <Button>Forgot Password</Button>
      </Link>
    </Stack>
  );
};

export default AuthLinks;
