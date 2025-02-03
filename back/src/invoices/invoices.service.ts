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

  // async onModuleInit() {
  //   const createFakeInvoice = (): Invoice => {
  //     const fakeItems = Array.from({ length: 3 }).map(() => ({
  //       itemName: faker.commerce.productName(),
  //       quantity: faker.number.int({ min: 1, max: 10 }),
  //       price: parseFloat(faker.commerce.price()),
  //     }));

  //     const total = fakeItems.reduce(
  //       (acc, item) => acc + item.quantity * item.price,
  //       0,
  //     );

  //     return {
  //       fromStreet: faker.location.streetAddress(),
  //       fromCity: faker.location.city(),
  //       fromPostCode: faker.location.zipCode(),
  //       fromCountry: faker.location.country(),
  //       name: faker.person.firstName(),
  //       email: faker.internet.email(),
  //       street: faker.location.streetAddress(),
  //       city: faker.location.city(),
  //       postCode: faker.location.zipCode(),
  //       country: faker.location.country(),
  //       invoiceDate: faker.date.recent(),
  //       month: faker.date.month(),
  //       year: new Date().getFullYear(),
  //       date: faker.date.recent().getDate(),
  //       paymentTerms: faker.helpers.arrayElement([
  //         'Net 1 Day',
  //         'Net 7 Day',
  //         'Net 14 Day',
  //         'Net 30 Day',
  //       ]),
  //       description: faker.commerce.productDescription(),
  //       items: fakeItems,
  //       total: total,
  //       status: faker.helpers.arrayElement(['Draft', 'Pending', 'Paid']), // Randomly set status to Draft or Paid
  //     };
  //   };

  //   const invoices: Invoice[] = [];
  //   const count = await this.invoiceModel.countDocuments();
  //   if (count == 0) {
  //     for (let i = 0; i < 100; i++) {
  //       const invoice = createFakeInvoice();
  //       invoices.push(invoice);
  //     }

  //     await this.invoiceModel.insertMany(invoices);
  //   }
  // }

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
