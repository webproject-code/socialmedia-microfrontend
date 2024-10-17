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

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
});
