import { Prisma, Team, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { db as dbClient } from "../db";
export class UserDaos {
  async create(data: Prisma.UserCreateInput) {
    return await dbClient.user.create({ data });
  }
  async getByToken(token: string) {
    return await dbClient.user.findFirst({ where: { token } });
  }
  async getByEmail(email: string): Promise<User | null> {
    return await dbClient.user.findFirst({ where: { email } });
  }
  async getById(id: string) {
    return await dbClient.user.findFirst({ where: { id } });
  }
  async changeUserStatus(id: string, status: boolean) {
    return await dbClient.user.update({
      where: { id },
      data: { isIn: status },
    });
  }
  async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
    return await dbClient.team.create({
      data: data,
      include: {
        TeamMembers: true,
      },
    });
  }
  async addToTeam(data: Prisma.TeamMemberCreateInput) {
    return await dbClient.teamMember.create({ data });
  }
  async getTeamById(id: string): Promise<Team | null> {
    return await dbClient.team.findFirst({ where: { id } });
  }
}
