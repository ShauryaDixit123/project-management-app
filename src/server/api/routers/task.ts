/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  storyUpsertValidation,
  taskFetchValidation,
  taskUpsertValidation,
} from "~/server/validations/task";
import { TaskDaos } from "~/server/daos/task";
import { Prisma } from "@prisma/client";

export const taskRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return "pong";
  }),
  createStory: publicProcedure
    .input(storyUpsertValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      return await ts.createStory({
        id: undefined,
        dueDate: input.dueDate,
        title: input.title,
        des: input.des,
        stage: input.stage,
        priority: input.priority,
        TeamIdId: {
          connect: {
            id: input.teamId,
          },
        },
        CreatedById: {
          connect: {
            id: input.createdBy,
          },
        },
      });
    }),
  createTask: publicProcedure
    .input(taskUpsertValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      const inp: Prisma.TaskCreateInput = {
        ...input,
        stage: "open",
        assigneeId: {
          connect: {
            id: input.assigneeId,
          },
        },
        reporterId: {
          connect: {
            id: input.reporterId,
          },
        },
      };
      if (input.storyId) {
        inp.storyIdId = {
          connect: {
            id: input.storyId,
          },
        };
      }
      await ts.createTask(inp);
    }),
  updateTask: publicProcedure
    .input(taskUpsertValidation)
    .mutation(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      const td = await ts.getTaskById({ id: input.id ?? "" });
      const inp: Prisma.TaskUpdateInput = {
        ...td,
        ...input,
        assigneeId: {
          connect: {
            id: input.assigneeId || td?.assignee,
          },
        },
        reporterId: {
          connect: {
            id: input.reporterId || td?.reporter,
          },
        },
      };
      console.log(inp);
      await ts.updateTask(inp);
    }),
  updateStory: publicProcedure
    .input(storyUpsertValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      const stry = await ts.getStoryById({ id: input.id ?? "" });
      const inp = {
        ...stry,
        ...input,
        id: input.id ?? "",
        TeamIdId: {
          connect: {
            id: input.teamId,
          },
        },
        CreatedById: {
          connect: {
            id: input.createdBy,
          },
        },
      };
      await ts.updateStory(inp);
    }),
  getTaskByStory: publicProcedure
    .input(taskFetchValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      return await ts.getTasksByStoryId({
        id: input.id,
      });
    }),
});
