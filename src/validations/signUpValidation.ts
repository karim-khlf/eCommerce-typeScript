import { z } from "zod";
const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: " First Name is required" }),
    lastName: z.string().min(1, { message: " Last Name is required" }),
    email: z.string().min(1, { message: " email is required" }).email(),
    password: z
      .string()
      .min(8, { message: " Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: " confirm Password is requierd" }),
  })
  .refine((inputs) => inputs.password === inputs.confirmPassword, {
    message: "password and confirm password does not match",
    path: ["confirmPassword"],
  });
type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
