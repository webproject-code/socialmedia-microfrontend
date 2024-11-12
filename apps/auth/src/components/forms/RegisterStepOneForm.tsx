import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@social-media/evoke-ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useStore } from '../../store/store';
import { registrationStepOneSchema } from '../../schemas';

const RegisterStepOneForm: React.FC = () => {
  const { registerForm, updateRegisterForm, goToNextStep } = useStore();

  type FormType = Omit<
    z.infer<typeof registrationStepOneSchema>,
    'profilePicture'
  >;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationStepOneSchema),
    defaultValues: {
      email: registerForm.step1.email,
      name: registerForm.step1.name,
      password: registerForm.step1.password,
      confirmPassword: registerForm.step1.confirmPassword,
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    updateRegisterForm({ step1: data });
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-0 sm:mx-4">
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
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Username"
            placeholder="Jhone Doe"
            error={!!errors.name}
            errorMessage={errors.name?.message}
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
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Confirm Password"
            placeholder="********"
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message} // This should display the correct error message
          />
        )}
      />
      <Button type="submit">Next</Button>
    </form>
  );
};

export default RegisterStepOneForm;
