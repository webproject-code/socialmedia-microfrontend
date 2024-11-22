import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPassword } from '@social-media/api';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Input } from '@social-media/evoke-ui';
import {
  Spinner,
  StatusMessageBox,
  resetPasswordSchema,
} from '@social-media/utils';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import PasswordEye from '../PasswordEye';

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="********"
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <PasswordEye
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Input
                {...field}
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                placeholder="********"
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
              <PasswordEye
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
            </div>
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
