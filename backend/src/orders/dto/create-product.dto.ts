import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class GuaranteeDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;
}

class PriceDto {
  @IsNumber()
  value: number;

  @IsString()
  symbol: string;

  @IsBoolean()
  isDefault: boolean;
}

export class CreateOrderItemDto {
  @IsString()
  orderId: string;

  @IsString()
  title: string;

  @IsNumber()
  serialNumber: number;

  @IsString()
  type: string;

  @IsBoolean()
  isNew: boolean;

  @IsString()
  photo: string;

  @IsString()
  specification: string;

  @ValidateNested()
  @Type(() => GuaranteeDto)
  guarantee: GuaranteeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  prices: PriceDto[];
}
