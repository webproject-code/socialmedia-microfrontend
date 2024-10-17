import { Link } from 'react-router-dom';
import { Box, Button, Card, Stack } from '@social-media/evoke-ui';

import LoginForm from '../components/LoginForm';
import { useTheme } from '@social-media/utils';

const Login: React.FC = () => {
  const theme = useTheme();
  return (
    <Stack
      justify="center"
      align="center"
      className="h-full"
      spacing={'xxlarge'}
    >
      <Card className="bg-light-modalColor dark:bg-dark-modalColor max-w-[450px] rounded-lg mx-2">
        <Card.Header className="text-center">
          <h2 className="text-2xl font-bold text-light-secondary dark:text-dark-secondary">
            Welcome Back
          </h2>
          <p>Please Login or register a new account</p>
        </Card.Header>
        <Card.Content className="py-0">
          <LoginForm />
        </Card.Content>
        <Card.Footer>
          <Stack justify={'center'} align={'center'} spacing={'small'}>
            <p className="text-gray-500">
              <span> Already have an account ?</span>
            </p>
            <Button
              asChild={true}
              variant="link"
              className="w-fit text-light-secondary dark:text-white p-0"
            >
              <Link to="/auth/register/step-1">Register</Link>
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
      <Box className="hidden md:block">
        <img
          src={`../assets/images/${
            theme.isDarkTheme ? 'dark' : 'light'
          }-login-image.svg`}
          alt="logo"
          width={500}
          height={500}
        />
      </Box>
    </Stack>
  );
};

export default Login;
