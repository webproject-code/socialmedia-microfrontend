import { Stack } from '@social-media/evoke-ui';
import AuthContainerCard from '../components/AuthContainerCard';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  return (
    <Stack align={'center'} justify={'center'} className="h-full w-full">
      <AuthContainerCard
        heading="Reset Password"
        subHeading="Please enter your email to reset your password"
        authForm={<ForgotPasswordForm />}
        footer={true}
        footerText="Back to Login ?"
        footerLink="/auth/login"
        footerLinkLabel="Click Here"
      />
    </Stack>
  );
};

export default ForgotPassword;
