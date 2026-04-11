import { Injectable } from '@nestjs/common';
import { GetOrdersDto } from './dto/get-orders.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(dto: GetOrdersDto) {
    const orders = await this.prisma.order.findMany({
      where: dto.search
        ? {
            title: {
              contains: dto.search,
              mode: 'insensitive',
            },
          }
        : {},
      include: {
        products: {
          include: {
            prices: true,
          },
        },
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

  async deleteById(id: string) {
    await this.prisma.price.deleteMany({
      where: {
        product: {
          orderId: id,
        },
      },
    });

    await this.prisma.product.deleteMany({
      where: {
        orderId: id,
      },
    });

    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
