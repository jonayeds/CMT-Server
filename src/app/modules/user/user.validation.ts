import { z } from "zod";

const registerUserValidation = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6, {message:"Password must be at least 6 Characters long"}),
    role:z.enum(["faculty", "student"]),
    profileImage:z.string().optional(),

})

export const UserValidations = {
    registerUserValidation
}