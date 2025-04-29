"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Database_1 = __importDefault(require("../utils/Database"));
const HttpError_1 = __importDefault(require("../utils/HttpError"));
class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new HttpError_1.default(400, 'Username and password are required');
        }
        const db = Database_1.default.getInstance();
        const user = await db.users.findFirst({
            where: {
                username: username,
            },
        });
        if (!user) {
            throw new HttpError_1.default(401, 'Invalid username or password');
        }
        const comparePassword = bcrypt_1.default.compareSync(password, user.password);
        if (!comparePassword) {
            throw new HttpError_1.default(401, 'Invalid username or password');
        }
        const token = jsonwebtoken_1.default.sign({
            username,
        }, process.env.JWT_SECRET ?? 'secret', {
            expiresIn: 60 * 60 * 6, // 6 hours
        });
        res.json({
            token: token,
        });
    }
    static async register(req, res) {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            throw new HttpError_1.default(400, 'Username, Email and password are required');
        }
        const db = Database_1.default.getInstance();
        const user = await db.users.findFirst({
            where: {
                OR: [{ username: username }, { email: email }],
            },
        });
        if (user) {
            throw new HttpError_1.default(400, 'Username or email already exists');
        }
        const hash = bcrypt_1.default.hashSync(password, 10);
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
exports.default = AuthController;
