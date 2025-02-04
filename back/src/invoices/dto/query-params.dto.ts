import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class QueryParamsDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsInt()
  @IsPositive()
  take: number = 10;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsInt()
  @IsPositive()
  page: number = 1;
}
