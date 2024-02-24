/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Prisma, Team, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { db as dbClient } from "../db";
export class UserDaos {
  db: PrismaClient;
  constructor(db: PrismaClient) {
    if (db) {
      this.db = db;
      return this;
    }
    this.db = dbClient;
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.db.user.create({ data });
  }
  async getByToken(token: string) {
    return await this.db.user.findFirst({ where: { token } });
  }
  async getByEmail(email: string): Promise<User | null> {
    return await this.db.user.findFirst({ where: { email } });
  }
  async getById(id: string) {
    return await this.db.user.findFirst({ where: { id } });
  }
  async changeUserStatus(id: string, status: boolean) {
    return await this.db.user.update({
      where: { id },
      data: { isIn: status },
    });
  }
  async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
    return await this.db.team.create({
      data: data,
      include: {
        TeamMembers: true,
      },
    });
  }
  async addToTeam(data: Prisma.TeamMemberCreateInput) {
    return await this.db.teamMember.create({ data });
  }
  async getTeamById(id: string): Promise<Team> {
    return await this.db.team.findFirst({ where: { id } });
  }
}
