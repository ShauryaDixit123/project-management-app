import { Prisma, Team, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { db as dbClient } from "../db";

export class TaskDaos {
  db: PrismaClient;
  constructor() {
    this.db = dbClient;
  }

  async createTask(data: Prisma.TaskCreateInput) {
    return await dbClient.task.create({ data });
  }
  async createStory(data: Prisma.StoryCreateInput) {
    return await dbClient.story.create({ data });
  }
  async updateStory(data: Prisma.StoryUpdateInput) {
    return await dbClient.story.update({
      data,
      where: {
        id: data.id as string,
      },
    });
  }
  async updateTask(data: Prisma.TaskUpdateInput) {
    return await dbClient.task.update({
      data,
      where: {
        id: data.id as string,
      },
    });
  }
  async getTaskById(params: { id: string }) {
    return await dbClient.task.findFirst({ where: { id: params.id } });
  }
  async getStoryById(params: { id: string }) {
    return await dbClient.story.findFirst({ where: { id: params.id } });
  }
  getStoryByTeamId(params: { id: string }) {
    return dbClient.story.findMany({ where: { teamId: params.id } });
  }
  getTasksByStoryId(params: { id: string }) {
    return dbClient.task.findMany({ where: { storyId: params.id } });
  }
}
