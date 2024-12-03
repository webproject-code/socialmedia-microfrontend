import { string, z } from 'zod';

export const createGroupChatSchema = z.object({
  name: z
    .string()
    .min(2, 'Group name must be at least 2 characters long')
    .max(15, 'Group name must be at most 15 characters long'),
  groupDescription: z
    .string()
    .min(2, 'Group description must be at least 2 character long')
    .max(200, 'Group description must be at most 200 characters long'),
  ownerId: z.string(),
  groupIcon: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type),
      {
        message: 'Only .jpg, .png & .svg formats are allowed',
      }
    )
    .optional(),
  memberIds: z.array(string()),
});
