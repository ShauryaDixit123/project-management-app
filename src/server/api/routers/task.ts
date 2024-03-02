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
import { Prisma, Story, Task } from "@prisma/client";
import { UserDaos } from "~/server/daos/user";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return "pong";
  }),
  createStory: publicProcedure
    .input(storyUpsertValidation)
    .mutation(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      return await ts.createStory({
        id: undefined,
        dueDate: input.dueDate,
        title: input.title,
        des: input.des,
        stage: input.stage,
        priority: input.priority,
        ReporterId: {
          connect: {
            id: input.reporterId,
          },
        },
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
    .mutation(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      const inp: Prisma.TaskCreateInput = {
        title: input.title,
        des: input.des,
        priority: input.priority,
        dueDate: input.dueDate,
        stage: input.stage,
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
      if (input.storyId !== undefined) {
        console.log("xzczxczxzx");
        inp.storyIdId = {
          connect: {
            id: input.storyId,
          },
        };
      }
      await ts.createTask(inp);
    }),
  updateTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        des: z.string().optional(),
        priority: z.string().optional(),
        dueDate: z.string().optional(),
        stage: z.string().optional(),
        assigneeId: z.string().optional(),
        reporterId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      const td = await ts.getTaskById({ id: input.id ?? "" });
      const inp: Prisma.TaskUpdateInput = {
        ...(td?.assignee && { assigneeId: { disconnect: true } }),
        ...input,
        assigneeId: {
          connect: {
            id: input.assigneeId ?? td?.assignee,
          },
        },
        reporterId: {
          connect: {
            id: input.reporterId ?? td?.reporter,
          },
        },
      };
      console.log(inp);
      await ts.updateTask(inp);
    }),
  updateStory: publicProcedure
    .input(storyUpsertValidation)
    .mutation(async ({ ctx, input }) => {
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
  getStoryByTeam: publicProcedure
    .input(taskFetchValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      return await ts.getStoryByTeamId({
        id: input.id,
      });
    }),
  getTeamTasksByStage: publicProcedure
    .input(taskFetchValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      const us = new UserDaos();
      const mapp = new Map();
      const res = await us.getUsersByTeamId({ id: input.id });
      const pres = res.map(
        async (tm) => await ts.getTasksByUserId({ id: tm.userIdId.id }),
      );
      const resp = await Promise.all(pres);
      resp.flat().forEach((val) => {
        if (mapp.has(val.stage)) {
          mapp.set(val.stage, [...mapp.get(val.stage), val]);
        } else {
          mapp.set(val.stage, [val]);
        }
      });
      return Object.fromEntries(mapp);

      // can add some sort of check for stages to save and get only the required stages
    }),
  getStoryByTeamIdByStage: publicProcedure
    .input(taskFetchValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      const resp = await ts.getStoryByTeamId({
        id: input.id,
      });
      const mapp = new Map();
      resp.flat().forEach((val) => {
        if (mapp.has(val.stage)) {
          mapp.set(val.stage, [...mapp.get(val.stage), val]);
        } else {
          mapp.set(val.stage, [val]);
        }
      });
      return Object.fromEntries(mapp);
    }),
  getTeamByAdminId: publicProcedure
    .input(taskFetchValidation)
    .query(async ({ ctx, input }) => {
      const ts = new TaskDaos();
      return await ts.getTasksByTeamId({
        id: input.id,
      });
    }),
});
