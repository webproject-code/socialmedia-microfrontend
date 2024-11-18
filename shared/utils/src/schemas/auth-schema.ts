import { z } from 'zod';

const authSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string(),
});

export const registrationStepOneSchema = authSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export const registrationStepTwoSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/svg'].includes(file.type),
      {
        message: 'Only .jpg, .png & .svg formats are allowed',
      }
    )
    .optional()
    .or(z.string()),
});

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
});

export const forgotPasswordSchema = authSchema.pick({
  email: true,
});

export const resetPasswordSchema = authSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
