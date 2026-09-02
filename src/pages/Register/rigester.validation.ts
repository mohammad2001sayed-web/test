import * as zod from "zod"
export const ZodRegister = zod
  .object({
    name: zod
      .string()
      .regex(/^[a-zA-Z\s]{3,20}$/, "Name is pattern is not valid"),
    username: zod
      .string()
      .regex(/^[a-zA-Z\s]{3,20}$/, "Name is pattern is not valid"),
    email: zod.email(),
    dateOfBirth: zod.string().refine((value) => {
      const selectedDate = new Date(value);
      const today = new Date();

      if (today.getFullYear() - selectedDate.getFullYear() > 21) {
        return true;
      }
    }, "يجب أن يكون عمرك 21 سنة أو أكثر"),
    gender: zod.enum(["male", "female"]),
    password: zod
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password is pattern is not valid",
      ),
    rePassword: zod
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password is pattern is not valid",
      ),
  })
  .refine(
    function name({ password, rePassword }) {
      if (password === rePassword) {
        return true;
      }
    },
    {
      error: "password and conferm password",
      path: ["rePassword"],
    },
  );
export type RegisterDataForm = zod.infer<typeof ZodRegister>;
