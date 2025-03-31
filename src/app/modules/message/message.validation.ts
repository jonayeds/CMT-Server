import { z } from "zod";

const sendMessageValidationSchema = z.object({
    message:z.string(),
    chat:z.string()
})

export const MessageValidations = {
    sendMessageValidationSchema
}

