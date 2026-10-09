import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

export class AuthError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function registerUser(email: string, password: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AuthError('Este e-mail já está em uso.', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
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

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AuthError('Credenciais inválidas.', 401);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new AuthError('Credenciais inválidas.', 401);
  }

  return issueTokens(user.id);
}

export async function refreshTokens(refreshToken: string) {
  try {
    const payload = verifyRefreshToken(refreshToken);
    return issueTokens(payload.userId);
  } catch {
    throw new AuthError('Refresh token inválido ou expirado.', 401);
  }
}

function issueTokens(userId: string) {
  return {
    accessToken: signAccessToken({ userId }),
    refreshToken: signRefreshToken({ userId }),
  };
}
