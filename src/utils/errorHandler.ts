import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import HttpError from './HttpError';
import jwt from 'jsonwebtoken';

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof HttpError && err.statusCode < 500) {
    res.status(err.statusCode).json({
      message: err.message,
      status_code: err.statusCode,
    });
    return;
  }

  if (
    err instanceof
    (PrismaClientKnownRequestError ||
      PrismaClientUnknownRequestError ||
      PrismaClientRustPanicError ||
      PrismaClientInitializationError ||
      PrismaClientValidationError)
  ) {
    console.error('Prisma error:', err);
    res.status(500).json({
      message: 'Database error',
      status_code: 500,
    });
    return;
  }

  if (err instanceof MulterError) {
    console.error('Multer error:', err);
    res.status(400).json({
      message: 'File upload error',
      status_code: 400,
    });
    return;
  }

  if (err instanceof jwt.JsonWebTokenError) {
    console.error('JWT error:', err);
    res.status(401).json({
      message: 'Token invalid',
      status_code: 401,
    });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', status_code: 500 });
}
