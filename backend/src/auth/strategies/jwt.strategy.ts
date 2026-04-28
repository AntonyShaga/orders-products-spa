import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

type RequestWithCookies = Request & {
  cookies?: {
    accessToken?: string;
  };
};

const extractTokenFromCookie = (req: Request): string | null => {
  const token = (req as RequestWithCookies).cookies?.accessToken;
  return token ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookie]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: { userId: string; email: string }) {
    if (!payload || !payload.userId) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.userId,
      email: payload.email,
    };
  }
}
