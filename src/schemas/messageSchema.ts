import { z } from "zod";



export const messageSchema = z.object({
    message: z.string()
        .min(20, {message: "Message must have at least 20 character"})
        .max(300, {message: "Message must not be longer then 300 character"})
})