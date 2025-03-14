import { TDays } from "./classroom.interface";

export type TClassTime = {
    classDays:TDays[];
    startTime:string;
    endTime:string;
}

export const hasClassConflicts = (newClass: TClassTime, existingClasses: TClassTime[])=>{
    const newStartTime = new Date(`1970-01-01T${newClass.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newClass.endTime}`);
    for(const existingClass of existingClasses){
        const existingStartTime = new Date(`1970-01-01T${existingClass.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${existingClass.endTime}`);
        let hasConflict = false;
        existingClass.classDays.some(day=>{
            if(newClass.classDays.includes(day)){
                if(newStartTime < existingEndTime && newEndTime > existingStartTime){
                    hasConflict = true;
                    return true;
                }
            }
        })
        if(hasConflict){
            return true;
        }
    }
    return false;
}