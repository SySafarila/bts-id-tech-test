import app from './server';
import Database from './utils/Database';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.APP_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Fungsi untuk menutup koneksi database dengan aman
const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} received: Closing database connection...`);
  try {
    await Database.closeConnection();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing database connection:', error);
    process.exit(1);
  }
};

// Menangani SIGINT (Ctrl+C) dan SIGTERM (dari Docker)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
