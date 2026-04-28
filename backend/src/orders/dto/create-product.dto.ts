import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class GuaranteeDto {
  @IsString()
  start: string;

  @IsString()
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

export class CreateProductDto {
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
  price: PriceDto[];
}
