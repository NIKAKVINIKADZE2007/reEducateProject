// validationSchema.ts

import * as Yup from 'yup';

export const invoiceSchema = Yup.object({
  fromStreet: Yup.string().required('Street Address is required'),
  fromCity: Yup.string().required('City is required'),
  fromPostCode: Yup.string().required('Post Code is required'),
  fromCountry: Yup.string().required('Country is required'),
  price: Yup.number().required('price is requred'),
  name: Yup.string().required("Client's Name is required"),
  email: Yup.string()
    .email('Invalid email format')
    .required("Client's Email is required"),
  street: Yup.string().required('client street is requeired'),
  month: Yup.string().required('client street is requeired'),
  country: Yup.string().required('county is requred'),
  year: Yup.number().required('client street is requeired'),
  date: Yup.number().required('client street is requeired'),
  city: Yup.string().required('city is required'),
  postCode: Yup.string().required('postCode is required'),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  description: Yup.string().required('Project Description is required'),
  itemName: Yup.string().required('Project Description is required'),
  quantity: Yup.number().required('quantity is requred'),
});

export type InvoiceFormData = Yup.InferType<typeof invoiceSchema>;
