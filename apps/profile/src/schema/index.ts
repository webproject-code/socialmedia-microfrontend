import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  bio: z.string().max(100, { message: 'Bio must be at most 100 characters' }),
  profilePicture: z
    .instanceof(File)

    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    .refine(
      (file) => ['image/jpg', 'image/png', 'image/svg+xml'].includes(file.type),
      {
        message: 'Only .jpg, .png & .svg formats are allowed',
      }
    )
    .optional(),
});
