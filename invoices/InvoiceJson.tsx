export interface Invoice {
  id: string;
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

const invoices: Invoice[] = [
  {
    id: 'AB1234',
    fromStreet: '12 Baker Street',
    fromCity: 'Manchester',
    fromPostCode: 'M1 1AA',
    fromCountry: 'United Kingdom',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    street: '42 Willow Lane',
    city: 'Leeds',
    postCode: 'LS1 4JF',
    country: 'United Kingdom',
    date: 12,
    month: 'Sep',
    year: 2021,
    paymentTerms: 'Net 7 Days',
    description: 'Web Development',
    items: [
      {
        itemName: 'Landing Page',
        quantity: 2,
        price: 200.0,
      },
    ],
    total: 400,
    status: 'Pending',
  },
  {
    id: 'CD5678',
    fromStreet: '45 High Street',
    fromCity: 'Birmingham',
    fromPostCode: 'B1 2JT',
    fromCountry: 'United Kingdom',
    name: 'Jane Smith',
    email: 'janesmith@mail.com',
    street: '56 Oak Avenue',
    city: 'Sheffield',
    postCode: 'S1 2GH',
    country: 'United Kingdom',
    date: 3,
    month: 'Oct',
    year: 2021,
    paymentTerms: 'Net 14 Days',
    description: 'Logo Design',
    items: [
      {
        itemName: 'Company Logo',
        quantity: 1,
        price: 300.0,
      },
    ],
    status: 'Paid',
    total: 300,
  },
  {
    id: 'EF9012',
    fromStreet: "33 Queen's Road",
    fromCity: 'Liverpool',
    fromPostCode: 'L3 5QQ',
    fromCountry: 'United Kingdom',
    name: 'Emily Brown',
    email: 'emilybrown@mail.com',
    street: '10 Maple Drive',
    city: 'York',
    postCode: 'YO1 6HG',
    country: 'United Kingdom',
    date: 25,
    month: 'Jul',
    year: 2021,
    paymentTerms: 'Net 1 Day',
    description: 'Marketing Consultation',
    items: [
      {
        itemName: 'Strategy Session',
        quantity: 3,
        price: 450.0,
      },
    ],
    total: 1350,
    status: 'Draft',
  },
  {
    id: 'GH3456',
    fromStreet: '21 Abbey Lane',
    fromCity: 'Glasgow',
    fromPostCode: 'G1 2YY',
    fromCountry: 'United Kingdom',
    name: 'Michael Green',
    email: 'michaelgreen@mail.com',
    street: '78 Elm Street',
    city: 'Edinburgh',
    postCode: 'EH1 3RG',
    country: 'United Kingdom',
    date: 8,
    month: 'Aug',
    year: 2021,
    paymentTerms: 'Net 30 Days',
    description: 'SEO Services',
    items: [
      {
        itemName: 'Website Audit',
        quantity: 1,
        price: 500.0,
      },
    ],
    total: 500,
    status: 'Pending',
  },
  {
    id: 'IJ7890',
    fromStreet: '66 Victoria Road',
    fromCity: 'Cardiff',
    fromPostCode: 'CF1 4DR',
    fromCountry: 'United Kingdom',
    name: 'Sarah White',
    email: 'sarahwhite@mail.com',
    street: '3 Sunset Boulevard',
    city: 'Swansea',
    postCode: 'SA1 8ER',
    country: 'United Kingdom',
    date: 15,
    month: 'Nov',
    year: 2021,
    paymentTerms: 'Net 7 Days',
    description: 'Content Writing',
    items: [
      {
        itemName: 'Blog Post',
        quantity: 5,
        price: 100.0,
      },
    ],
    total: 500,
    status: 'Paid',
  },
  {
    id: 'KL4321',
    fromStreet: '88 King Street',
    fromCity: 'Newcastle',
    fromPostCode: 'NE1 1NE',
    fromCountry: 'United Kingdom',
    name: 'Chris Taylor',
    email: 'christaylor@mail.com',
    street: '99 Pine Road',
    city: 'Nottingham',
    postCode: 'NG1 5QH',
    country: 'United Kingdom',
    date: 30,
    month: 'Dec',
    year: 2021,
    paymentTerms: 'Net 14 Days',
    description: 'App Design',
    items: [
      {
        itemName: 'UI Design',
        quantity: 2,
        price: 600.0,
      },
    ],
    total: 1200,
    status: 'Pending',
  },
  {
    id: 'MN8765',
    fromStreet: '14 Market Street',
    fromCity: 'Belfast',
    fromPostCode: 'BT1 4DB',
    fromCountry: 'United Kingdom',
    name: 'Olivia Davis',
    email: 'oliviadavis@mail.com',
    street: '20 Birch Way',
    city: 'Aberdeen',
    postCode: 'AB1 6HJ',
    country: 'United Kingdom',
    date: 11,
    month: 'Jun',
    year: 2021,
    paymentTerms: 'Net 1 Day',
    description: 'Photography',
    items: [
      {
        itemName: 'Portrait Session',
        quantity: 1,
        price: 250.0,
      },
    ],
    total: 250,
    status: 'Draft',
  },
  {
    id: 'OP6543',
    fromStreet: '5 Castle Road',
    fromCity: 'Bath',
    fromPostCode: 'BA1 3AA',
    fromCountry: 'United Kingdom',
    name: 'Daniel Evans',
    email: 'danielevans@mail.com',
    street: '15 Ocean View',
    city: 'Brighton',
    postCode: 'BN1 7JW',
    country: 'United Kingdom',
    date: 18,
    month: 'Jan',
    year: 2021,
    paymentTerms: 'Net 30 Days',
    description: 'Video Editing',
    items: [
      {
        itemName: 'Promo Video',
        quantity: 1,
        price: 700.0,
      },
    ],
    total: 700,
    status: 'Paid',
  },
];

export default invoices;
