import { z } from "zod";

const submitAssignmentValidation = z.object({
    assignment:z.string({required_error:'Assignment Id is Required'}),
    submissionFile:z.string({required_error:'Submission File is Required'}),
})

export const SubmissionValidations ={
    submitAssignmentValidation
}
