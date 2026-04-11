import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetOrdersDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  search?: string;
}
