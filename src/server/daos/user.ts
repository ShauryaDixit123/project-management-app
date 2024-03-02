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
    return await dbClient.team.findFirst({
      where: { id },
      include: {
        TeamMembers: {
          include: {
            userIdId: true,
          },
        },
      },
    });
  }
  async getTeamsByUserId(userId: string): Promise<Team[]> {
    return await dbClient.team.findMany({
      where: { TeamMembers: { some: { userId } } },
      include: {
        TeamMembers: {
          include: {
            userIdId: true,
          },
        },
      },
    });
  }
  async getUserDetailsByToken(tkn: string) {
    return await dbClient.user.findFirst({
      where: { token: tkn },
      include: {
        TeamMembers: {
          include: {
            teamIdId: true,
            userIdId: true,
          },
        },
      },
    });
  }
  getUsersByTeamId(params: { id: string }) {
    return dbClient.teamMember.findMany({
      where: { teamId: params.id },
      include: {
        userIdId: true,
      },
    });
  }
  getTeamsByAdminId(params: { adminId: string }) {
    return dbClient.team.findMany({ where: { adminId: params.adminId } });
  }
}
