import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const accessSecret = configService.get<string>('JWT_ACCESS_SECRET');
        const refreshSecret = configService.get<string>('JWT_REFRESH_SECRET');
        const accessExpire = configService.get<string>('JWT_ACCESS_EXPIRES_IN');
        const refreshExpire = configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN',
        );
        const requiredVars = {
          JWT_ACCESS_SECRET: accessSecret,
          JWT_REFRESH_SECRET: refreshSecret,
          JWT_ACCESS_EXPIRES_IN: accessExpire,
          JWT_REFRESH_EXPIRES_IN: refreshExpire,
        };

        Object.entries(requiredVars).forEach(([key, value]) => {
          if (!value) {
            throw new Error(`Critical Auth Variable MISSING: ${key}`);
          }
        });

        return {
          secret: accessSecret,
          signOptions: {
            expiresIn: accessExpire as StringValue,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
