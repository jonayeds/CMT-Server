import { z } from "zod";

const createContentValidation = z.object({
    title:z.string().min(1,{message:"Title is required"}),
    description:z.string().optional(),
    contentFiles:z.array(z.string()).optional(),
    contentLinks:z.array(z.string()).optional(),
    classroom:z.string(),
})

export const ContentValidation = {
    createContentValidation,
}