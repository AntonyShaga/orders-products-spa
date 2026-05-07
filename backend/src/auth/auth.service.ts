import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '../../generated/prisma/client';
import { AuthTokens, RefreshPayload } from './types/auth-request.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const { accessToken, refreshToken, tokenId } = await this.generateTokens(
      user.id,
      user.email,
    );

    await this.saveRefreshToken(user.id, refreshToken, tokenId);

    return {
      accessToken,
      refreshToken,
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

    const { accessToken, refreshToken, tokenId } = await this.generateTokens(
      user.id,
      user.email,
    );

    await this.saveRefreshToken(user.id, refreshToken, tokenId);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
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

  private async _refresh(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = await this.jwtService.verifyAsync<RefreshPayload>(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

      const tokenData = await this.prisma.refreshToken.findUnique({
        where: { id: payload.tokenId },
      });

      if (!tokenData) {
        throw new UnauthorizedException('Session not found');
      }

      const isValid = await argon2.verify(tokenData.tokenHash, refreshToken);
      if (!isValid) {
        throw new UnauthorizedException('Invalid token hash');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: tokenData.userId },
      });
      if (!user) throw new UnauthorizedException('User no longer exists');

      await this.prisma.refreshToken.delete({
        where: { id: tokenData.id },
      });

      const newTokens = await this.generateTokens(user.id, user.email);

      await this.saveRefreshToken(
        user.id,
        newTokens.refreshToken,
        newTokens.tokenId,
      );

      return {
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
      };
    } catch {
      throw new UnauthorizedException('Refresh session expired or invalid');
    }
  }

  private async generateTokens(userId: string, email: string) {
    const tokenId = crypto.randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        },
      ),
      this.jwtService.signAsync(
        { userId, email, tokenId },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        },
      ),
    ]);

    return { accessToken, refreshToken, tokenId };
  }

  async logout(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<RefreshPayload>(
        refreshToken,
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        },
      );

      await this.prisma.refreshToken.delete({
        where: { id: payload.tokenId },
      });
    } catch {
      return;
    }
  }
  private async saveRefreshToken(
    userId: string,
    refreshToken: string,
    tokenId: string,
  ): Promise<void> {
    const hashedToken = await argon2.hash(refreshToken);
    const maxAgeMs =
      Number(this.configService.get<number>('COOKIE_REFRESH_MAXAGE')) ||
      604800000;
    const expiresAt = new Date(Date.now() + maxAgeMs);

    const sessionCount = await this.prisma.refreshToken.count({
      where: { userId },
    });

    if (sessionCount >= 5) {
      const oldestSession = await this.prisma.refreshToken.findFirst({
        where: { userId },
        orderBy: { expiresAt: 'asc' },
      });

      if (oldestSession) {
        await this.prisma.refreshToken.delete({
          where: { id: oldestSession.id },
        });
      }
    }

    await this.prisma.refreshToken.create({
      data: {
        id: tokenId,
        userId,
        tokenHash: hashedToken,
        expiresAt,
      },
    });
  }
}
