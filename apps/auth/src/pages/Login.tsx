import { Box, Stack } from '@social-media/evoke-ui';

import LoginForm from '../components/LoginForm';
import { useTheme } from '@social-media/utils';
import AuthContainerCard from '../components/AuthContainerCard';

const Login: React.FC = () => {
  const theme = useTheme();
  return (
    <Stack
      justify="center"
      align="center"
      className="h-full"
      spacing={'xxlarge'}
    >
      <AuthContainerCard
        heading="Welcome Back"
        subHeading="Please Login or register a new account"
        authForm={<LoginForm />}
        footer={true}
        footerText="Don't have an account? "
        footerLinkLabel="Register"
        footerLink="/auth/register"
      />
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
