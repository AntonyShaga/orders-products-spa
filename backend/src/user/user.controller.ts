import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import type { Express } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: (_, file, cb) => {
          const ext = file.mimetype.split('/')[1];

          cb(null, `${Date.now()}.${ext}`);
        },
      }),
    }),
  )
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/avatars/${file.filename}`,
    };
  }
}
