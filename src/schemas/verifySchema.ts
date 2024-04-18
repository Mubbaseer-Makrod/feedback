import { z } from "zod";


export const verifySchema = z.object({
    code: z.string().length(6, {message: "Code length must be 6 digit"})
})