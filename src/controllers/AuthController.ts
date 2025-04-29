import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Database from '../utils/Database';
import HttpError from '../utils/HttpError';

export default class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      throw new HttpError(400, 'Username and password are required');
    }

    const db = Database.getInstance();
    const user = await db.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new HttpError(401, 'Invalid username or password');
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new HttpError(401, 'Invalid username or password');
    }

    const token = jwt.sign(
      {
        username,
      },
      process.env.JWT_SECRET ?? 'secret',
      {
        expiresIn: 60 * 60 * 6, // 6 hours
      },
    );

    res.json({
      token: token,
    });
  }

  static async register(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body as {
      username?: string;
      password?: string;
      email?: string;
    };

    if (!username || !password || !email) {
      throw new HttpError(400, 'Username, Email and password are required');
    }

    const db = Database.getInstance();

    const user = await db.users.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (user) {
      throw new HttpError(400, 'Username or email already exists');
    }

    const hash = bcrypt.hashSync(password, 10);
    await db.users.create({
      data: {
        username,
        password: hash,
        email,
      },
    });

    res.json({
      message: 'Successfully registered',
    });
  }
}
