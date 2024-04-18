import { z } from "zod";


export const acceptMessageSchema = z.object({
    accpetMessage: z.boolean()
})