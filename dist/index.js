"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const Database_1 = __importDefault(require("./utils/Database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.APP_PORT ?? 3000;
server_1.default.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Fungsi untuk menutup koneksi database dengan aman
const gracefulShutdown = async (signal) => {
    console.log(`${signal} received: Closing database connection...`);
    try {
        await Database_1.default.closeConnection();
        console.log('Database connection closed.');
        process.exit(0);
    }
    catch (error) {
        console.error('Error closing database connection:', error);
        process.exit(1);
    }
};
// Menangani SIGINT (Ctrl+C) dan SIGTERM (dari Docker)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
