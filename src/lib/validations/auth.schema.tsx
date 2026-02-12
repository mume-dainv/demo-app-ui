import z, { email } from "zod";

export const AuthSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export type Auth = z.infer<typeof AuthSchema>;

