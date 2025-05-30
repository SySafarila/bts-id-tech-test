"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    statusCode;
    message;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.default = HttpError;
