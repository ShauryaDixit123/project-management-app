/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { UserDaos } from "~/server/daos/user";
import { hashPassword, userValidation } from "~/server/validations/user";
import bcrypt from "bcrypt";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return "pong";
  }),
  createAdmin: publicProcedure
    .input(userValidation)
    .mutation(async ({ ctx, input }) => {
      console.log(input, "input");
      const us = new UserDaos();
      const hshPwd = hashPassword(input.password);
      const ad = await us.create({
        ...input,
        password: hshPwd,
        isAdmin: true,
        isIn: true,
        mob: input.mob ?? "",
      });
      const tm = await us.createTeam({
        name: `${input.name}'s Team 1`,
        adminIdId: {
          connect: {
            id: ad.id,
          },
        },
        TeamMembers: {
          create: {
            userId: ad.id,
          },
        },
      });
      return { user: { ...ad, password: "" }, team: tm };
    }),

  signIn: publicProcedure
    .input(userValidation)
    .mutation(async ({ ctx, input }) => {
      const us = new UserDaos();
      const ud = await us.getByEmail(input.email);
      if (!ud) {
        throw new Error("User not found");
      }
      bcrypt.compare(input.password, ud.password, (err, res) => {
        if (err) {
          throw new Error("Error comparing passwords");
        }
        if (!res) {
          throw new Error("Invalid password");
        }
      });
      await us.changeUserStatus(ud.id, true);
      return { user: { ...ud, isIn: true, password: "" } };
    }),
  addMemberToTeam: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const us = new UserDaos();
      let ud = await us.getByEmail(input.email);
      if (!ud) {
        const hshPwd = hashPassword("password");
        ud = await us.create({
          email: input.email,
          password: hshPwd,
          isAdmin: false,
        });
      }
      await us.addToTeam({
        teamIdId: {
          connect: {
            id: input.teamId,
          },
        },
        userIdId: {
          connect: {
            id: ud?.id,
          },
        },
      });
      return { user: ud };
    }),
  getTeamsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const us = new UserDaos();
      return await us.getTeamsByUserId(input.userId);
    }),

  getUserDetailsByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const us = new UserDaos();
      return await us.getUserDetailsByToken(input.token);
    }),
  getTeamMembers: publicProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const us = new UserDaos();
      return await us.getTeamById(input.teamId);
    }),
  getTeamsByAdminId: publicProcedure
    .input(z.object({ adminId: z.string() }))
    .query(async ({ ctx, input }) => {
      const us = new UserDaos();
      return await us.getTeamsByAdminId({
        adminId: input.adminId,
      });
    }),
  createTeam: publicProcedure
    .input(z.object({ name: z.string(), adminId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const us = new UserDaos();
      return await us.createTeam({
        name: input.name,
        adminIdId: {
          connect: {
            id: input.adminId,
          },
        },
      });
    }),
});
