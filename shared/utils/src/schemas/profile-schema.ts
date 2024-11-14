import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        'Name can only contain letters, spaces, hyphens, and apostrophes',
    })
    .trim(),
  bio: z
    .string()
    .max(200, { message: 'Bio must be at most 200 characters long' })
    .trim(),
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type),
      {
        message: 'Only .jpeg, .png & .svg formats are allowed',
      }
    )
    .optional(),
});
