import { string, z } from "zod";

const registerUserValidation = z.object({
    name:z.string(),
    email:z.string().email({message:"Invalid Email"}),
    password:z.string({required_error:"Password is required"}).min(6, {message:"Password must be at least 6 Characters long"}),
    role:z.enum(["faculty", "student"], {message:"Invalid Role"}),
    profileImage:z.string().optional(),
})

const loginUserValidationSchema = z.object({
    identification:z.string({required_error:"Email or ID required"}),
    password:z.string({required_error:"Password is Required"})
})

export const UserValidations = {
    registerUserValidation,
    loginUserValidationSchema
}