/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prisma, Team, User } from "@prisma/client";
import { db } from "../db";

export class UserDaos {
  async create(data: Prisma.UserCreateInput) {
    return await db.user.create({ data });
  }
  async getByToken(token: string) {
    return await db.user.findFirst({ where: { token } });
  }
  async getByEmail(email: string) {
    return await db.user.findFirst({ where: { email } });
  }
  async getById(id: string) {
    return await db.user.findFirst({ where: { id } });
  }
  async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
    return await db.team.create({
      data: data,
      include: {
        TeamMembers: true,
      },
    });
  }
  async addToTeam(data: Prisma.TeamMemberCreateInput) {
    return await db.teamMember.create({ data });
  }
}
