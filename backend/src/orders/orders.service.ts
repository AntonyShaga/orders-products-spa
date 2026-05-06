import { ForbiddenException, Injectable } from '@nestjs/common';
import { GetOrdersDto } from './dto/get-orders.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-product.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(dto: GetOrdersDto, userId: string): Promise<OrderResponseDto[]> {
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
        items: {
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

      items: order.items.map((p) => ({
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

        prices: p.prices.map((pr) => ({
          value: pr.value,
          symbol: pr.symbol,
          isDefault: pr.isDefault ? 1 : 0,
        })),

        orderId: p.orderId,
        date: p.date.toISOString(),
      })),
    }));
  }
  async createProduct(dto: CreateOrderItemDto, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order || order.userId !== userId) {
      throw new ForbiddenException();
    }

    try {
      const items = await this.prisma.orderItem.create({
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
            create: dto.prices,
          },
        },
        include: {
          prices: true,
        },
      });

      return {
        id: items.id,
        serialNumber: items.serialNumber,
        isNew: items.isNew,
        photo: items.photo,
        title: items.title,
        type: items.type,
        specification: items.specification,

        guarantee: {
          start: items.guaranteeStart.toISOString(),
          end: items.guaranteeEnd.toISOString(),
        },

        prices: items.prices.map((pr) => ({
          value: pr.value,
          symbol: pr.symbol,
          isDefault: pr.isDefault,
        })),

        orderId: items.orderId,
        date: items.date.toISOString(),
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
    const items = await this.prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });

    if (!items || items.order.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.prisma.orderItem.delete({
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
      items: [],
    };
  }
}
