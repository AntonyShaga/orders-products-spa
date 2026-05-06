import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
