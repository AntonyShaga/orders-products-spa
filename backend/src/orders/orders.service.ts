import { ForbiddenException, Injectable } from '@nestjs/common';
import { GetOrdersDto } from './dto/get-orders.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(dto: GetOrdersDto, userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
        ...(dto.search
          ? {
              title: {
                contains: dto.search,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      include: {
        products: {
          include: {
            prices: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map((order) => ({
      id: order.id,
      title: order.title,
      date: order.date.toISOString(),
      description: order.description,

      products: order.products.map((p) => ({
        id: p.id,
        serialNumber: p.serialNumber,
        isNew: p.isNew ? 1 : 0,
        photo: p.photo,
        title: p.title,
        type: p.type,
        specification: p.specification,

        guarantee: {
          start: p.guaranteeStart.toISOString(),
          end: p.guaranteeEnd.toISOString(),
        },

        price: p.prices.map((pr) => ({
          value: pr.value,
          symbol: pr.symbol,
          isDefault: pr.isDefault ? 1 : 0,
        })),

        order: p.orderId,
        date: p.date.toISOString(),
      })),
    }));
  }
  async createProduct(dto: CreateProductDto, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order || order.userId !== userId) {
      throw new ForbiddenException();
    }

    try {
      const product = await this.prisma.product.create({
        data: {
          title: dto.title,
          serialNumber: dto.serialNumber,
          type: dto.type,
          isNew: dto.isNew,
          photo: dto.photo,
          specification: dto.specification,
          date: new Date(),

          guaranteeStart: new Date(dto.guarantee.start),
          guaranteeEnd: new Date(dto.guarantee.end),

          orderId: dto.orderId,

          prices: {
            create: dto.price,
          },
        },
        include: {
          prices: true,
        },
      });

      return {
        id: product.id,
        serialNumber: product.serialNumber,
        isNew: product.isNew,
        photo: product.photo,
        title: product.title,
        type: product.type,
        specification: product.specification,

        guarantee: {
          start: product.guaranteeStart.toISOString(),
          end: product.guaranteeEnd.toISOString(),
        },

        price: product.prices.map((pr) => ({
          value: pr.value,
          symbol: pr.symbol,
          isDefault: pr.isDefault,
        })),

        order: product.orderId,
        date: product.date.toISOString(),
      };
    } catch (e) {
      console.error('CREATE PRODUCT ERROR:', e);
      throw e;
    }
  }
  async deleteById(id: string, userId: string) {
    const result = await this.prisma.order.deleteMany({
      where: {
        id,
        userId,
      },
    });

    if (result.count === 0) {
      throw new Error('Not found or forbidden');
    }

    return { success: true };
  }
  async deleteProduct(id: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });

    if (!product || product.order.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return { success: true };
  }
  async create(userId: string) {
    const now = new Date();

    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const count = await this.prisma.order.count({
      where: {
        createdAt: {
          gte: startOfDay,
        },
      },
    });

    const number = String(count + 1).padStart(3, '0');
    const title = `ORD-${datePart}-${number}`;

    const order = await this.prisma.order.create({
      data: {
        title,
        description: '',
        date: now,
        userId,
      },
    });

    return {
      id: order.id,
      title: order.title,
      date: order.date.toISOString(),
      description: order.description,
      products: [],
    };
  }
}
