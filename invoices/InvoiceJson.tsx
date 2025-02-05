export interface Invoice {
  _id: string;
  fromStreet: string;
  fromCity: string;
  fromPostCode: string;
  fromCountry: string;
  name: string;
  email: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
  date: number;
  month: string;
  year: number;
  paymentTerms: string;
  description: string;
  items: {
    itemName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Pending' | 'Paid' | 'Draft';
}
