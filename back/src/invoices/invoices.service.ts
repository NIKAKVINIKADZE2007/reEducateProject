import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { faker } from '@faker-js/faker';
import { Invoice } from './schema/invoice.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { QueryParamsDto } from './dto/query-params.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel('invoice') private readonly invoiceModel: Model<Invoice>,
    @InjectModel('user') private userModel: Model<User>,
  ) {}

  async create(userId: string, createInvoiceDto: CreateInvoiceDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('user not found');

    const newPost = await this.invoiceModel.create({
      ...createInvoiceDto,
      user: user._id,
    });
    await this.userModel.findByIdAndUpdate(user._id, {
      $push: { invoices: newPost._id },
    });
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

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid Id');
    console.log(id);

    const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(
      id,
      updateInvoiceDto,
      { new: true, runValidators: true },
    );

    console.log(updatedInvoice, 'rames');
    return updatedInvoice;
  }

  async remove(id: string, userId: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid Id');
    console.log(userId);
    const user = await this.userModel.findById(userId);

    if (!user) throw new NotFoundException('user not found');

    const expense = await this.invoiceModel.findById(id);

    console.log(userId, 'userid');
    console.log(expense.user.toString(), 'user');

    const deletedInvoice = await this.invoiceModel.findByIdAndDelete(id);

    await this.userModel.findOneAndUpdate(user._id, {
      $push: { invoices: deletedInvoice._id },
    });

    return '';
  }

  async findUserInvoices(userId: string) {
    const invoices = await this.invoiceModel.find({ user: userId });
    console.log(invoices);
    return invoices;
  }
}
