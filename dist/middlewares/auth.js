"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../utils/HttpError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        throw new HttpError_1.default(401, 'Unauthorized, Bearer token required');
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET ?? 'secret');
        next();
    }
    catch (err) {
        throw new HttpError_1.default(401, 'Invalid or expired token');
    }
};
exports.default = authMiddleware;
