import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email().min(1, "Informe seu e-mail"),
  password: z.string().min(1, "Informe sua senha"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
