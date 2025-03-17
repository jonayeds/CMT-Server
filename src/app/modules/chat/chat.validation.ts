import { z } from "zod";

const handleChatRequestValudationSchema = z.object({
    status:z.enum(["accepted", "rejected"]),
    chatId:z.string()
})

export const ChatValidation = {
    handleChatRequestValudationSchema
}