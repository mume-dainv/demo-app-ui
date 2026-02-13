import z, { string } from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
]
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
export const ProfileSchema = z.object({
    name: z.string().min(5),
    avatar: z
    .preprocess((file) => {
      if (file instanceof FileList) return file.item(0);
      return file || undefined;
    },
    z
    .instanceof(File)
    .nullable()
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image type",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max 2MB",
    }))
    
})

export type Profile = z.infer<typeof ProfileSchema>
