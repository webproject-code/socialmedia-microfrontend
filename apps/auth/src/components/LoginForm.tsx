import { z } from 'zod';
import { IoIosWarning } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Stack } from '@social-media/evoke-ui';

import { loginSchema } from '../schemas';
import { useLogin } from '@social-media/api';
import { useStore } from '../store/store';
import { Spinner } from '@social-media/utils';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useLogin();
  const { login } = useStore();

  type FormType = z.infer<typeof loginSchema>;

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
    mutate(credentials, {
      onSuccess: (data) => {
        login({
          isAuthenticated: true,
          user: data,
        });
        navigate('/');
      },
    });
  };

  return (
    <Stack direction="column" spacing={'large'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="text-end">
          <Link to="/auth/forgot-password">
            <span className="text-sm text-light-secondary dark:text-dark-secondary text-end">
              Forgot Password ?
            </span>
          </Link>
        </div>
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
          className="p-4 rounded-md border border-red-600 bg-red-300/50 dark:bg-red-700/50 text-red-400"
        >
          <IoIosWarning />
          <p>{error.message}</p>
        </Stack>
      )}
    </Stack>
  );
};

export default LoginForm;
