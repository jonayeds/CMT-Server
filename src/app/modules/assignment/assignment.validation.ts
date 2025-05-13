import { z } from "zod";

const  createAssignmentValidationSchema = z.object({
    classroom:z.string(),
    title:z.string({required_error:'Assignment Title is Required'}),
    description:z.string().optional(),
    totalMarks:z.number().positive({message:"Marks must be positive number"}),
    deadline:z.string()
})

export const AssignmentValidations = {
    createAssignmentValidationSchema
}