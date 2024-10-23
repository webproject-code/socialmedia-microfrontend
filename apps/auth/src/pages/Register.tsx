import { Box, Stack } from '@social-media/evoke-ui';
import { useTheme } from '@social-media/utils';
import { useStore } from '../store/store';
import AuthContainerCard from '../components/AuthContainerCard';
import RegisterStepTwoForm from '../components/forms/RegisterStepTwoForm';
import RegisterStepOneForm from '../components/forms/RegisterStepOneForm';

const Register: React.FC = () => {
  const theme = useTheme();
  const {
    registerForm: { currentStep },
  } = useStore();

  return (
    <Stack
      justify="center"
      align="center"
      spacing={'xxlarge'}
      className="h-full"
    >
      {currentStep === 2 && (
        <AuthContainerCard
          heading="Choose Profile Picture"
          subHeading="Select an avatar from the list or upload your own."
          authForm={<RegisterStepTwoForm />}
        />
      )}

      {currentStep === 1 && (
        <>
          {/* Auth card for registration */}
          <AuthContainerCard
            heading="Create an Account"
            subHeading="Create an account to start using our app"
            authForm={<RegisterStepOneForm />}
            footer={true}
            footerText="Already have an account? "
            footerLinkLabel="Login"
            footerLink="/auth/login"
          />
          {/* Image for larger screens */}
          <Box className="hidden md:block">
            <img
              src={`../assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-register-image.svg`}
              alt="logo"
              width={500}
              height={500}
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default Register;
