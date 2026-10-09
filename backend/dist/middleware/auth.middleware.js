"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token ausente.' });
    }
    const token = header.replace('Bearer ', '');
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
}
