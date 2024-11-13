import { z } from 'zod';

export const groupSettingsSchema = z.object({
  name: z
    .string()
    .min(1, 'Group name is required')
    .max(50, 'Group name is too long'),
  groupDescription: z.string().max(200, 'Description is too long'),
});

export type GroupSettingsFormData = z.infer<typeof groupSettingsSchema>;
