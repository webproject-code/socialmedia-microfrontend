import { z } from 'zod';
import { useEffect } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Stack } from '@social-media/evoke-ui';

import { loginSchema } from '../schemas';
import { useLogin } from '@social-media/api';
import { useStore } from '../store/store';
import { Spinner } from '@social-media/utils';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const { data, mutate, isPending, error } = useLogin();
  const { login } = useStore();

  type FormType = z.infer<typeof loginSchema>;

  useEffect(() => {
    if (data) {
      login({
        isAuthenticated: true,
        user: data,
      });
      navigate('/');
    }
  }, [data]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (credentials: FormType) => {
    mutate(credentials);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mx-0 sm:mx-4 "
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              placeholder="user@gmail.com"
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Password"
              placeholder="********"
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Button disabled={isPending}>
          {!isPending ? (
            'Login'
          ) : (
            <Spinner className="fill-light-primary dark:fill-dark-primary" />
          )}
        </Button>
      </form>
      {/* Error message */}
      {error && (
        <Stack
          align={'center'}
          spacing={'small'}
          className="mt-2 p-4 rounded-md border border-red-600 bg-red-300/50 dark:bg-red-700/50 text-red-400"
        >
          <IoIosWarning />
          <p>{error.message}</p>
        </Stack>
      )}
    </>
  );
};

export default LoginForm;
