import {
  IsString,
  IsEmail,
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  IsEnum,
  IsInt,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

class InvoiceItemDTO {
  @IsString()
  @Length(1, 255)
  itemName: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  constructor(data: Partial<InvoiceItemDTO>) {
    Object.assign(this, data);
  }
}

export class CreateInvoiceDto {
  @IsString()
  @Length(1, 255)
  fromStreet: string;

  @IsString()
  @Length(1, 100)
  fromCity: string;

  @IsString()
  @Length(1, 20)
  fromPostCode: string;

  @IsString()
  @Length(1, 100)
  fromCountry: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 255)
  street: string;

  @IsString()
  @Length(1, 100)
  city: string;

  @IsString()
  @Length(1, 20)
  postCode: string;

  @IsString()
  @Length(1, 100)
  country: string;

  @IsInt()
  @Min(1)
  @Max(31)
  date: number;

  @IsString()
  @Length(3, 15)
  month: string;

  @IsInt()
  @Min(2000)
  @Max(2100)
  year: number;

  @IsString()
  @Length(1, 100)
  paymentTerms: string;

  @IsString()
  @Length(1, 500)
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDTO)
  items: InvoiceItemDTO[];

  @IsNumber()
  @IsPositive()
  total: number;

  @IsEnum(['Pending', 'Paid', 'Draft'])
  status: 'Pending' | 'Paid' | 'Draft';

  constructor(data: Partial<CreateInvoiceDto>) {
    Object.assign(this, data);
  }
}
