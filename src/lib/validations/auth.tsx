import z from "zod";

export const AuthSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type AuthValue = z.infer<typeof AuthSchema>;
