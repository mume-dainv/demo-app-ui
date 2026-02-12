import z from "zod";

export const ProfileSchema = z.object({
    name: z.email(),
    avatar: z.file()
})

export type Profile = z.infer<typeof ProfileSchema>
