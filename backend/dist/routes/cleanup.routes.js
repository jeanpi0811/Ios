"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../config/prisma");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.requireAuth);
// Lista o histórico de limpezas do usuário autenticado
router.get('/history', async (req, res) => {
    const history = await prisma_1.prisma.cleanupHistory.findMany({
        where: { userId: req.userId },
        orderBy: { createdAt: 'desc' },
        take: 50,
    });
    res.json(history.map((h) => ({ ...h, bytesFreed: h.bytesFreed.toString() })));
});
// Registra o resultado de uma limpeza feita no dispositivo
router.post('/history', async (req, res) => {
    const { category, itemsRemoved, bytesFreed, deviceId } = req.body;
    const entry = await prisma_1.prisma.cleanupHistory.create({
        data: {
            userId: req.userId,
            deviceId: deviceId ?? null,
            category,
            itemsRemoved: Number(itemsRemoved) || 0,
            bytesFreed: BigInt(bytesFreed || 0),
        },
    });
    res.status(201).json({ ...entry, bytesFreed: entry.bytesFreed.toString() });
});
exports.default = router;
