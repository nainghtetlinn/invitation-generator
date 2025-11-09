import { z } from "zod";
import { DEPARTMENTS, YEARS } from "./constants";

const academicYearSchema = z
  .string()
  .min(1, "Academic year is required")
  .regex(/^\d{4}-\d{4}$/, "Format must be YYYY-YYYY")
  .refine((val) => {
    const [start, end] = val.split("-").map(Number);
    return end === start + 1;
  }, "End year must be exactly one greater than start year");

export const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rollNo: z.string().min(1, "Roll number is required"),
  repeater: z.boolean(),
});

export const groupSchema = z.object({
  title: z.string().min(1, "Title is required"),
  members: z.array(memberSchema).min(1, "At least one member is required"),
});

export const invitationSchema = z.object({
  type: z.string().min(1, "Type of invitation is required"),
  professor: z.string().min(1, "Professor name is required"),
  department: z
    .string()
    .refine(
      (val) => DEPARTMENTS.find((d) => d.short === val),
      "Please select a department"
    ),
  year: z
    .string()
    .refine((val) => YEARS.find((y) => y.text === val), "Please select a year"),
  academic: academicYearSchema,
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please select a date",
    })
    .refine(
      (date) => new Date(date) > new Date(),
      "Date cannot be in the past"
    ),
  time: z.string().min(1, "Time is required"),
  place: z.string().min(1, "Place is required"),
  groups: z
    .array(groupSchema)
    .min(1, "At least one group is required")
    .max(5, "You can add at most 5 groups"),
});

export type Invitation = z.infer<typeof invitationSchema>;
export type Group = z.infer<typeof groupSchema>;
export type Member = z.infer<typeof memberSchema>;
