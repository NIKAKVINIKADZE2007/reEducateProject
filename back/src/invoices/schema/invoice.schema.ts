// src/schemas/invoice.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ type: String })
  fromStreet: string;

  @Prop({ type: String })
  fromCity: string;

  @Prop({ type: String })
  fromPostCode: string;

  @Prop({ type: String })
  fromCountry: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  street: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  postCode: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: Date })
  invoiceDate: Date;

  @Prop({ type: String })
  month: string;

  @Prop({ type: Number })
  year: number;

  @Prop({ type: Number })
  date: number;

  @Prop({
    type: String,
    enum: ['Net 1 Day', 'Net 7 Day', 'Net 14 Day', 'Net 30 Day'],
  })
  paymentTerms: string;

  @Prop({ type: String })
  description: string;

  @Prop({
    type: [
      {
        itemName: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
  })
  items: { itemName: string; quantity: number; price: number }[];

  @Prop({ type: Number })
  total: number;

  @Prop({
    type: String,
    enum: ['Pending', 'Paid', 'Draft'],
  })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] })
  user: mongoose.Schema.Types.ObjectId;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
