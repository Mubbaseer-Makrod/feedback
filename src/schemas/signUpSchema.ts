import { z } from "zod";


export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 character")
    .max(20, "username cannot be greater then 20 character")
    .regex(/^([A-Za-z0-9]){4,20}$/gm,"username must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6,{message: "password must be at least  6 character"}) 
})