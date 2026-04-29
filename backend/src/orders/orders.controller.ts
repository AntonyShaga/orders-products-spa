import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CreateProductDto } from './dto/create-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders(
    @Query() query: GetOrdersDto,
    @User('id') userId: string,
  ): Promise<OrderResponseDto[]> {
    return this.ordersService.getAll(query, userId);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string, @User('id') userId: string) {
    return this.ordersService.deleteById(id, userId);
  }
  @Post()
  async createOrder(@User('id') userId: string) {
    return this.ordersService.create(userId);
  }
  @Post('product')
  createProduct(@Body() dto: CreateProductDto, @User('id') userId: string) {
    return this.ordersService.createProduct(dto, userId);
  }
  @Delete('product/:id')
  deleteProduct(@Param('id') id: string, @User('id') userId: string) {
    return this.ordersService.deleteProduct(id, userId);
  }
}
