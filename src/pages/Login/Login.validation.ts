import * as zod from "zod"
export const ZodLogin = zod
  .object({
    email: zod.email(),
    password: zod
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password is pattern is not valid",
      ),
  })
export type LoginDataForm = zod.infer<typeof ZodLogin>;
