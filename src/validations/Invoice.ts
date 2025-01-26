// validationSchema.ts

import * as Yup from 'yup';

export const invoiceSchema = Yup.object({
  streetAddress: Yup.string().required('Street Address is required'),
  city: Yup.string().required('City is required'),
  postCode: Yup.string().required('Post Code is required'),
  country: Yup.string().required('Country is required'),
  clientName: Yup.string().required("Client's Name is required"),
  clientEmail: Yup.string()
    .email('Invalid email format')
    .required("Client's Email is required"),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  projectDescription: Yup.string().required('Project Description is required'),
  items: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Item name is required'),
        quantity: Yup.number()
          .required('Quantity is required')
          .positive('Quantity must be greater than 0'),
        price: Yup.number()
          .required('Price is required')
          .positive('Price must be greater than 0'),
      })
    )
    .min(1, 'At least one item must be added'),
});

export type InvoiceFormData = Yup.InferType<typeof invoiceSchema>;
