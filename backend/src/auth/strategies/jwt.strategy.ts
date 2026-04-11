import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
type Cookies = {
  accessToken?: string;
};
function extractTokenFromCookie(req: Request): string | null {
  const cookies = req.cookies as Cookies;
  if (!cookies) {
    return null;
  }

  return cookies.accessToken ?? null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookie]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'secret',
    });
  }

  validate(payload: { userId: string; email: string }) {
    return {
      userId: payload.userId,
      email: payload.email,
    };
  }
}
