"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Database {
    static instance;
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new client_1.PrismaClient();
        }
        return Database.instance;
    }
    static async closeConnection() {
        if (Database.instance) {
            await Database.instance.$disconnect();
        }
    }
}
exports.default = Database;
