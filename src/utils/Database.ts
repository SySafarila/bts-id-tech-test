import { PrismaClient } from '@prisma/client';

export default class Database {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient();
    }

    return Database.instance;
  }

  public static async closeConnection(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect();
    }
  }
}
