import { z } from "zod";

const createClassroomSchema = z.object({
        courseTitle:z.string({required_error:"Course Title is required"}),
        courseCode:z.string({required_error:"Course Code is required"}),
})

export const ClassroomValidation = {
    createClassroomSchema
}