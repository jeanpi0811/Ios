"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.refreshTokens = refreshTokens;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../config/prisma");
const jwt_1 = require("../utils/jwt");
class AuthError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}
exports.AuthError = AuthError;
async function registerUser(email, password, name) {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new AuthError('Este e-mail já está em uso.', 409);
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            passwordHash,
            name,
            settings: { create: {} },
            subscription: { create: {} },
        },
    });
    return issueTokens(user.id);
}
async function loginUser(email, password) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AuthError('Credenciais inválidas.', 401);
    }
    const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!valid) {
        throw new AuthError('Credenciais inválidas.', 401);
    }
    return issueTokens(user.id);
}
async function refreshTokens(refreshToken) {
    try {
        const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
        return issueTokens(payload.userId);
    }
    catch {
        throw new AuthError('Refresh token inválido ou expirado.', 401);
    }
}
function issueTokens(userId) {
    return {
        accessToken: (0, jwt_1.signAccessToken)({ userId }),
        refreshToken: (0, jwt_1.signRefreshToken)({ userId }),
    };
}
