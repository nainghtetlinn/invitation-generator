import { z } from 'zod'

export const invitationSchema = z.object({
  department: z.object({
    long: z.string(),
    short: z.string(),
  }),
  year: z.object({
    text: z.string(),
    number: z.number(),
    suffix: z.string(),
  }),
  academic: z.object({
    start: z.string(),
    end: z.string(),
  }),
  schedule: z.object({
    date: z.string(),
    day: z.string(),
    time: z.string(),
    place: z.string().min(1),
  }),
})

export const memberSchema = z.object({
  name: z.string().min(1),
  roll: z.string().min(1),
  repeater: z.boolean(),
})

export const groupSchema = z.object({
  title: z.string().min(1),
  members: z.array(memberSchema),
})

export const groupsSchema = z.object({
  groups: z.array(groupSchema),
})

export type Invitation = z.infer<typeof invitationSchema>
export type Groups = z.infer<typeof groupsSchema>
