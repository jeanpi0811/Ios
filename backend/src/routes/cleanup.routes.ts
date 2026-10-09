import { Router, Response } from 'express';
import { prisma } from '../config/prisma';
import { requireAuth, AuthedRequest } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

// Lista o histórico de limpezas do usuário autenticado
router.get('/history', async (req: AuthedRequest, res: Response) => {
  const history = await prisma.cleanupHistory.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  res.json(
    history.map((h) => ({ ...h, bytesFreed: h.bytesFreed.toString() }))
  );
});

// Registra o resultado de uma limpeza feita no dispositivo
router.post('/history', async (req: AuthedRequest, res: Response) => {
  const { category, itemsRemoved, bytesFreed, deviceId } = req.body;

  const entry = await prisma.cleanupHistory.create({
    data: {
      userId: req.userId!,
      deviceId: deviceId ?? null,
      category,
      itemsRemoved: Number(itemsRemoved) || 0,
      bytesFreed: BigInt(bytesFreed || 0),
    },
  });

  res.status(201).json({ ...entry, bytesFreed: entry.bytesFreed.toString() });
});

export default router;
