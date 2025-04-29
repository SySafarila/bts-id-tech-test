"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const library_1 = require("@prisma/client/runtime/library");
const multer_1 = require("multer");
const HttpError_1 = __importDefault(require("./HttpError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function errorHandler(err, _req, res, _next) {
    if (err instanceof HttpError_1.default && err.statusCode < 500) {
        res.status(err.statusCode).json({
            message: err.message,
            status_code: err.statusCode,
        });
        return;
    }
    if (err instanceof
        (library_1.PrismaClientKnownRequestError ||
            library_1.PrismaClientUnknownRequestError ||
            library_1.PrismaClientRustPanicError ||
            library_1.PrismaClientInitializationError ||
            library_1.PrismaClientValidationError)) {
        console.error('Prisma error:', err);
        res.status(500).json({
            message: 'Database error',
            status_code: 500,
        });
        return;
    }
    if (err instanceof multer_1.MulterError) {
        console.error('Multer error:', err);
        res.status(400).json({
            message: 'File upload error',
            status_code: 400,
        });
        return;
    }
    if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
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
