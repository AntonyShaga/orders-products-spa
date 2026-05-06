import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.email);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async register(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      return await this._refresh(refreshToken);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        (error.code === 'P1000' || error.code === 'P1017')
      ) {
        await this.prisma.$disconnect();
        await this.prisma.$connect();

        return await this._refresh(refreshToken);
      }

      throw error;
    }
  }

  private async _refresh(refreshToken: string) {
    const tokens = await this.prisma.refreshToken.findMany();

    for (const token of tokens) {
      const isValid = await argon2.verify(token.tokenHash, refreshToken);

      if (isValid) {
        await this.prisma.refreshToken.delete({
          where: { id: token.id },
        });

        const user = await this.prisma.user.findUnique({
          where: { id: token.userId },
        });

        if (!user) throw new UnauthorizedException();

        const newTokens = await this.generateTokens(user.id, user.email);

        await this.saveRefreshToken(user.id, newTokens.refreshToken);

        return newTokens;
      }
    }

    throw new UnauthorizedException();
  }

  async logout(refreshToken: string) {
    const tokens = await this.prisma.refreshToken.findMany();

    for (const token of tokens) {
      const isValid = await argon2.verify(token.tokenHash, refreshToken);

      if (isValid) {
        await this.prisma.refreshToken.delete({
          where: { id: token.id },
        });
        return;
      }
    }

    throw new UnauthorizedException();
  }

  private async generateTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ userId, email }, { expiresIn: '15m' }),
      this.jwtService.signAsync({ userId, email }, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: hashedRefreshToken,
        expiresAt,
      },
    });
  }
}
