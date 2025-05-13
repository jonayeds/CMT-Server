import { model, Schema } from "mongoose";
import { ISubmission } from "./submission.interface";

const submissionSchema = new Schema<ISubmission>({
    student:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignment:{
        type:Schema.Types.ObjectId,
        ref:"Assignment",
        required:true
    },
    isLate:{
        type:Boolean,
        required:true
    },
    marks:{
        type:Number,
    },
    submissionFile:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const Submission = model<ISubmission>("Submission",submissionSchema)