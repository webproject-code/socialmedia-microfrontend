import { z } from 'zod';

export const createGroupChatSchema = z.object({
  name: z.string().min(2, 'Group name must be at least 2 characters long'),
  groupDescription: z.string().optional(),
  ownerId: z.string(),
  groupIcon: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/svg'].includes(file.type),
      {
        message: 'Only .jpg, .png & .svg formats are allowed',
      }
    ),
  memberIds: z.string().array().nonempty('At lease add 1 member in group'),
});
