import type { Request } from 'express';

export interface AuthUser {
  id: string; // В токене мы зашивали id/userId
  email: string;
}

// Данные, которые лежат внутри Access токена
export interface JwtPayload {
  userId: string;
  email: string;
}

// Данные, которые лежат внутри Refresh токена (с ID для базы)
export interface RefreshPayload extends JwtPayload {
  tokenId: string;
}

// То, что возвращает сервер фронтенду
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Типизация для Request, чтобы в контроллерах видеть req.user
export interface AuthRequest extends Request {
  user: AuthUser;
}
