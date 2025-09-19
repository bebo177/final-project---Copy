import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email ({
    message: "Please Enter A Valid Email Address. ",
  }),password: z.
  string()
  .nonempty({message:"Password Is Required"})
  .min(6,"Password must be at least 6 characters long"),
});

export type LoginFormPayload = z.infer<typeof loginFormSchema>
