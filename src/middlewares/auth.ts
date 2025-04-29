import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/HttpError';
import jsonwebtoken from 'jsonwebtoken';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  let token: string | null = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new HttpError(401, 'Unauthorized, Bearer token required');
  }

  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET ?? 'secret');
    next();
  } catch (err) {
    throw new HttpError(401, 'Invalid or expired token');
  }
};

export default authMiddleware;
