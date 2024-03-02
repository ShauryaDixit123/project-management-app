import { z } from "zod";

export const storyUpsertValidation = z.object({
  id: z.string().optional(),
  dueDate: z.string().min(1),
  title: z.string().min(1),
  des: z.string().optional(),
  teamId: z.string(),
  priority: z.string().min(1),
  createdBy: z.string().min(1),
  stage: z.string().min(1),
  reporterId: z.string().min(1),
});

export const taskUpsertValidation = z.object({
  id: z.string().optional(),
  dueDate: z.string().min(1),
  title: z.string().min(1),
  des: z.string().optional(),
  stage: z.string(),
  priority: z.string().min(1),
  assigneeId: z.string().min(1),
  reporterId: z.string().min(1),
  storyId: z.string().optional(),
});

export const taskFetchValidation = z.object({
  id: z.string(),
});
