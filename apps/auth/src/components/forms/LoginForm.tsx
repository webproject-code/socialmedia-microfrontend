import { z } from 'zod';
import { IoIosWarning } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Input, Stack } from '@social-media/evoke-ui';
import { useLogin } from '@social-media/api';
import { Spinner, loginSchema, useStore } from '@social-media/utils';
import { useState } from 'react';
import PasswordEye from '../PasswordEye';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
            <Box className="relative">
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
            </Box>
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
