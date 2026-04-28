import { Module } from '@nestjs/common';
import { ProductTypesController } from './product-types.controller';
import { ProductTypesService } from './product-types.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductTypesController],
  providers: [ProductTypesService, PrismaService],
})
export class ProductTypesModule {}
