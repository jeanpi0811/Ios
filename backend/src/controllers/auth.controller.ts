import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { registerUser, loginUser, refreshTokens } from '../services/auth.service';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres.'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const tokens = await registerUser(email, password, name);
    res.status(201).json(tokens);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const tokens = await loginUser(email, password);
    res.status(200).json(tokens);
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const tokens = await refreshTokens(refreshToken);
    res.status(200).json(tokens);
  } catch (err) {
    next(err);
  }
}
