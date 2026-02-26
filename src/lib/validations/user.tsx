import { Role, UserRole } from '@/types/common';
import z, { string } from 'zod';
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_CSV_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ProfileSchema = z.object({
  name: z.string().min(5),
  avatar: z.preprocess(
    (file) => {
      if (file instanceof FileList) return file.item(0);
      return file || undefined;
    },
    z
      .instanceof(File)
      .nullable()
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Please upload a valid image type',
      })
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: 'Max 2MB',
      }),
  ),
});

export const UserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  role: z.string<UserRole>(),
});

export const ImportUserSchema = z.object({
  users: z.preprocess(
    (file) => {
      if (file instanceof FileList) return file.item(0);
    },
    z
      .instanceof(File)
      .refine((file) => file.type === 'text/csv', {
        message: 'Please upload a CSV file',
      })
      .refine((file) => file.size <= MAX_CSV_FILE_SIZE, {
        message: 'Max ' + MAX_CSV_FILE_SIZE + 'MB',
      }),
  ),
});

export type ProfileType = z.infer<typeof ProfileSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type ImportUserType = z.infer<typeof ImportUserSchema>;
