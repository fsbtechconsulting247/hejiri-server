import { catchErrors } from "../utils/index.js";
import { z } from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required").max(255),
    email: z.email().min(1).max(255),
    phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signUpHandler = catchErrors(async (req, res) => {
  //validate request
  const request = signUpSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  //call service
  //send a response
});
