import { Stack } from '@social-media/evoke-ui';
import AuthContainerCard from '../components/AuthContainerCard';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';

const ResetPassword: React.FC = () => {
  return (
    <Stack align={'center'} justify={'center'} className="h-full w-full">
      <AuthContainerCard
        heading="Create New Password"
        subHeading="Your new password must be different from previous used passwords"
        authForm={<ResetPasswordForm />}
        footer={true}
        footerText="Back to Login ?"
        footerLink="/auth/login"
        footerLinkLabel="Click Here"
      />
    </Stack>
  );
};

export default ResetPassword;
