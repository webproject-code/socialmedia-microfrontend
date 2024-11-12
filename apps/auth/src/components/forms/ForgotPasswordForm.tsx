import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword } from '@social-media/api';
import { Controller, useForm } from 'react-hook-form';
import { forgotPasswordSchema } from '../../schemas';
import { z } from 'zod';
import { Box, Button, Input } from '@social-media/evoke-ui';
import { Spinner, StatusMessageBox } from '@social-media/utils';

const ForgotPasswordForm = () => {
  const { data: message, mutate, error, isPending } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  type FormData = z.infer<typeof forgotPasswordSchema>;

  const onSubmit = (data: FormData) => {
    mutate(data.email, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Box className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder="Enter your email"
              error={!!errors.email}
              errorMessage={errors.email?.message}
              helperText="We will send you a link to reset your password"
            />
          )}
        />
        <Button type="submit" disabled={isPending || !!message}>
          {!isPending ? (
            'Reset Password'
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

export default ForgotPasswordForm;
