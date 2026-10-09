"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.refresh = refresh;
const zod_1 = require("zod");
const auth_service_1 = require("../services/auth.service");
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, 'A senha deve ter ao menos 8 caracteres.'),
    name: zod_1.z.string().optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
const refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1),
});
async function register(req, res, next) {
    try {
        const { email, password, name } = registerSchema.parse(req.body);
        const tokens = await (0, auth_service_1.registerUser)(email, password, name);
        res.status(201).json(tokens);
    }
    catch (err) {
        next(err);
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const tokens = await (0, auth_service_1.loginUser)(email, password);
        res.status(200).json(tokens);
    }
    catch (err) {
        next(err);
    }
}
async function refresh(req, res, next) {
    try {
        const { refreshToken } = refreshSchema.parse(req.body);
        const tokens = await (0, auth_service_1.refreshTokens)(refreshToken);
        res.status(200).json(tokens);
    }
    catch (err) {
        next(err);
    }
}
