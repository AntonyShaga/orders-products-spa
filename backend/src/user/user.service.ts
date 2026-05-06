import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateAvatar(userId: string, avatarUrl: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        avatarUrl: true,
      },
    });

    const oldAvatar = existingUser?.avatarUrl;

    if (oldAvatar) {
      const filename = oldAvatar.split('/avatars/')[1];

      const filePath = join(process.cwd(), 'public/avatars', filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        avatarUrl,
      },
    });
  }

  async getAvatar(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        avatarUrl: true,
      },
    });

    return user?.avatarUrl ?? null;
  }
}
