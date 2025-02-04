import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { faker } from '@faker-js/faker';
import { Invoice } from './schema/invoice.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel('invoice') private readonly invoiceModel: Model<Invoice>,
  ) {}

  create(createInvoiceDto: CreateInvoiceDto) {
    return createInvoiceDto;
  }

  findAll({ page, take }: QueryParamsDto) {
    const limit = Math.min(take, 10);
    return this.invoiceModel
      .find()
      .skip((page - 1) * 10)
      .limit(limit);
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
