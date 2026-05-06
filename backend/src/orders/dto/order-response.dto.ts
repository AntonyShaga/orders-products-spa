import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderResponseDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsString()
  id: string;

  @IsNumber()
  serialNumber: number;

  @IsNumber()
  isNew: number;

  @IsString()
  photo: string;

  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsString()
  specification: string;

  @ValidateNested()
  @Type(() => GuaranteeDto)
  guarantee: GuaranteeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  prices: PriceDto[];

  @IsString()
  orderId: string;

  @IsDateString()
  date: string;
}

export class GuaranteeDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;
}

export class PriceDto {
  @IsNumber()
  value: number;

  @IsString()
  symbol: string;

  @IsNumber()
  isDefault: number;
}
