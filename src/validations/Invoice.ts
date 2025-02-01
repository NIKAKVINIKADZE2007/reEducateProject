import * as Yup from 'yup';

export const invoiceSchema = Yup.object({
  fromStreet: Yup.string().required('Street Address is required'),
  fromCity: Yup.string().required('City is required'),
  fromPostCode: Yup.string().required('Post Code is required'),
  fromCountry: Yup.string().required('Country is required'),
  name: Yup.string().required("Client's Name is required"),
  email: Yup.string()
    .email('Invalid email format')
    .required("Client's Email is required"),
  street: Yup.string().required('Client street is required'),
  city: Yup.string().required('City is required'),
  postCode: Yup.string().required('Post Code is required'),
  country: Yup.string().required('Country is required'),
  date: Yup.number().required('Date is required'),
  month: Yup.string().required('Month is required'),
  year: Yup.number().required('Year is required'),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  description: Yup.string().required('Project Description is required'),
  items: Yup.array()
    .of(
      Yup.object({
        itemName: Yup.string().required('Item Name is required'),
        quantity: Yup.number()
          .positive('Quantity must be greater than zero')
          .integer('Quantity must be a whole number')
          .required('Quantity is required'),
        price: Yup.number()
          .positive('Price must be greater than zero')
          .required('Price is required'),
      })
    )
    .min(1, 'At least one item is required')
    .default([{ itemName: '', price: 0, quantity: 0 }]),
  total: Yup.number().required(),
});

export type InvoiceFormData = Yup.InferType<typeof invoiceSchema>;
