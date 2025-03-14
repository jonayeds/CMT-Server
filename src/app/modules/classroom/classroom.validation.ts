import { z } from "zod";

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const classTimeSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  },
  {
    message: "Invalid time format. Please use HH:MM format.",
  }
);

const createClassroomSchema = z.object({
  courseTitle: z.string({ required_error: "Course Title is required" }),
  courseCode: z.string({ required_error: "Course Code is required" }),
  classDays: z.array(z.enum(days as [string])),
  startTime: classTimeSchema,
  endTime: classTimeSchema,
});

export const ClassroomValidation = {
  createClassroomSchema,
};
