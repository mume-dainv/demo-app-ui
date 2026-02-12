import z from "zod";

export const ProfileSchema = z.object({
    name: z.string().min(5),
    avatar: z.file()
})

export type Profile = z.infer<typeof ProfileSchema>
