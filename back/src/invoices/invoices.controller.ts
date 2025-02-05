import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('invoices')
@UseGuards(IsAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Req() request, @Body() createInvoiceDto: CreateInvoiceDto) {
    const userId = request.userId;
    return this.invoicesService.create(userId, createInvoiceDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.invoicesService.findAll(queryParams);
  }

  @Get('/user-invoices')
  findUserInvoices(@User() userId) {
    return this.invoicesService.findUserInvoices(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() userId: string) {
    return this.invoicesService.remove(id, userId);
  }
}
