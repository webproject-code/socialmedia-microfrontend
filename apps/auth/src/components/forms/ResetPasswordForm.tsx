import { Box, Button } from '@social-media/evoke-ui';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useResetPassword } from '@social-media/api';
import {
  Spinner,
  StatusMessageBox,
  resetPasswordSchema,
} from '@social-media/utils';

import PasswordInput from '../PasswordInput';

const ResetPasswordForm = () => {
  const { data: message, mutate, error, isPending } = useResetPassword();
  const token = useSearchParams()[0].get('token');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  type FormData = z.infer<typeof resetPasswordSchema>;

  const onSubmit = (data: FormData) => {
    localStorage.setItem('token', token as string);
    if (token) {
      const credentials = {
        ...data,
        token,
      };

      mutate(credentials);
    }
  };

  return (
    <Box className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Password"
              {...field}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Confirm Password"
              {...field}
              isError={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        <Button disabled={isPending || !!message}>
          {!isPending ? (
            'Change Password'
          ) : (
            <Spinner className="fill-light-primary dark:fill-dark-primary" />
          )}
        </Button>
      </form>
      {error && (
        <StatusMessageBox status="error" statusMessage={error.message} />
      )}
      {message && <StatusMessageBox status="success" statusMessage={message} />}
    </Box>
  );
};

export default ResetPasswordForm;
