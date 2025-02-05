import { useEffect, useState } from 'react';
import { Invoice } from '../../invoices/InvoiceJson';
import EditInvoice from './EditInvoice';
import { arrowRight } from '../assets';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Invoices = ({
  filterStatus,
  invoices,
  setInvoices,
  isLight,
}: {
  isLight: boolean;
  filterStatus: string | null;
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<null | { id: string }>(
    null
  );

  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<Invoice | undefined>(
    undefined
  );

  useEffect(() => {
    if (showEditInvoice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEditInvoice]);

  const filteredInvoices = filterStatus
    ? invoices.filter((invoice) => invoice.status === filterStatus)
    : invoices;

  const handleInvoiceClick = (invoiceId: string) => {
    setSelectedInvoice({ id: invoiceId });
  };

  const handleEditClick = (id: string) => {
    setShowEditInvoice(true);
    const invoice = invoices.find((el) => el._id == id);
    if (!invoice) return console.log('not found');
    setEditedInvoice(invoice);
  };

  const handleGoBack = () => {
    setSelectedInvoice(null);
  };

  const handleDelete = async (invoiceId: string) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');

      console.log(invoiceId, 'invoiceId');
      const res = await axios.delete(
        `http://localhost:3000/invoices/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      console.log(data);

      setSelectedInvoice(null);

      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice._id !== data._id)
      );

      setSelectedInvoice(null);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleMarkAsPaid = async (invoiceId: string) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');

      const res = await axios.patch(
        `http://localhost:3000/invoices/${invoiceId}`,
        { status: 'Paid' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === data._id ? { ...invoice, status: 'Paid' } : invoice
        )
      );
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  return (
    <>
      {showEditInvoice && (
        <>
          <div className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.49)] z-10' />
          <EditInvoice
            setInvoices={setInvoices}
            setShowEditInvoice={setShowEditInvoice}
            invoice={editedInvoice}
            isLight={isLight}
          />
        </>
      )}
      <div className='max-w-[730px] mx-auto space-y-4'>
        {selectedInvoice
          ? filteredInvoices
              .filter((invoice) => invoice._id === selectedInvoice.id)
              .map((invoice) => (
                <div key={invoice._id}>
                  <button
                    className={`font-bold text-[15px]  leading-[15px] ${
                      isLight ? 'text-[black]' : 'text-[white]'
                    } `}
                    onClick={handleGoBack}
                  >
                    Go Back
                  </button>
                  <div
                    className={`cursor-pointer h-[72px] ${
                      isLight ? 'bg-white' : 'bg-[#1E2139]'
                    }  w-full p-4 flex rounded-md shadow-md my-5 justify-between items-center`}
                  >
                    <div className='flex gap-[40px] items-center '>
                      <p
                        className={`font-medium text-[13px] leading-[15px]  ${
                          isLight ? 'text-[#888EB0]' : 'text-[#7E88C3]'
                        }`}
                      >
                        Status
                      </p>
                      <ul
                        className={`w-[104px] h-[40px] flex justify-center items-center    rounded-md ${
                          invoice.status === 'Paid'
                            ? 'bg-opacity-40 bg-green-100 text-[#33D69F]'
                            : invoice.status === 'Pending'
                            ? 'bg-opacity-40 bg-orange-200  text-[#FF8F00]'
                            : 'bg-opacity-40 bg-gray-200 text-[#373B53]'
                        }`}
                      >
                        <li className='font-medium text-[15px] leading-[15px]'>
                          {invoice.status}
                        </li>
                      </ul>
                    </div>

                    <div className='flex gap-[20px] items-center'>
                      <div
                        className='w-[73px] h-[48px] font-bold text-[15px] flex justify-center items-center rounded-3xl bg-[#F9FAFE] text-[#7E88C3]'
                        onClick={() => handleEditClick(invoice._id)}
                      >
                        Edit
                      </div>
                      <div
                        className='w-[89px] h-[48px] font-bold text-[15px] flex justify-center items-center rounded-3xl bg-[#EC5757] text-white'
                        onClick={() => handleDelete(invoice._id)}
                      >
                        Delete
                      </div>
                      <div
                        className='w-[131px] h-[48px] font-bold text-[15px] flex justify-center items-center rounded-3xl bg-[#7C5DFA] text-white'
                        onClick={() => handleMarkAsPaid(invoice._id)}
                      >
                        Mark as Paid
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-6  ${
                      isLight ? 'bg-white' : 'bg-[#1E2139]'
                    } rounded-lg shadow-xl  `}
                  >
                    <div className='flex justify-between  items-center'>
                      <div>
                        <h2
                          className={`text-2xl font-bold ${
                            isLight ? 'text-black' : 'text-white'
                          }`}
                        >{`#${invoice._id}`}</h2>
                        <p className='text-[#DFE3FA]'>{invoice.description}</p>
                      </div>
                      <div
                        className={`flex flex-col ${
                          isLight ? 'text-[#7E88C3]' : 'text-[#DFE3FA]'
                        } `}
                      >
                        <span>{invoice.fromStreet}</span>
                        <span>{invoice.fromCity}</span>
                        <span>{invoice.fromPostCode}</span>
                        <span>{invoice.fromCountry}</span>
                      </div>
                    </div>
                    <div className='flex items-start justify-between mt-4'>
                      <div>
                        <p
                          className={`${
                            isLight ? 'text-[#7E88C3]' : 'text-[#DFE3FA]'
                          } `}
                        >
                          Invoice Date
                        </p>
                        <p
                          className={`font-bold ${
                            isLight ? 'text-black' : 'text-white'
                          }`}
                        >{`${invoice.date} ${invoice.month} ${invoice.year}`}</p>
                      </div>
                      <div>
                        <p
                          className={`${
                            isLight ? 'text-[#7E88C3]' : 'text-[#DFE3FA]'
                          } `}
                        >
                          Bill To
                        </p>
                        <p
                          className={`font-bold ${
                            isLight ? 'text-black' : 'text-white'
                          }`}
                        >
                          {invoice.name}
                        </p>
                        <div
                          className={`flex flex-col ${
                            isLight ? 'text-[#7E88C3]' : 'text-[#DFE3FA]'
                          }`}
                        >
                          <span>{invoice.street}</span>
                          <span>{invoice.city}</span>
                          <span>{invoice.postCode}</span>
                          <span>{invoice.country}</span>
                        </div>
                      </div>
                      <div>
                        <p
                          className={`${
                            isLight ? 'text-[#7E88C3]' : 'text-[#DFE3FA]'
                          } `}
                        >
                          Sent to
                        </p>
                        <p
                          className={`font-bold ${
                            isLight ? 'text-black' : 'text-white'
                          }`}
                        >
                          {invoice.email}
                        </p>
                      </div>
                    </div>
                    <div
                      className={` mt-8 bg- shadow-lg rounded-lg  ${
                        isLight ? 'bg-[#F9FAFE]' : 'bg-[#252945]'
                      }`}
                    >
                      <table className='w-full'>
                        <thead>
                          <tr className='text-left text-gray-500 text-sm'>
                            <th className='py-2'>Item Name</th>
                            <th className='py-2'>QTY.</th>
                            <th className='py-2'>Price</th>
                            <th className='py-2'>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoice.items.map((item) => (
                            <tr
                              key={item.itemName}
                              className={`text-left font-bold text-[15px] ${
                                isLight ? 'text-[#0C0E16]' : 'text-[#FFFFFF]'
                              }`}
                            >
                              <td className='py-2'>{item.itemName}</td>
                              <td
                                className={`py-2 ${
                                  isLight ? 'text-[#7E88C3]' : 'text-[#DFE3FA]'
                                } `}
                              >
                                {item.quantity}
                              </td>
                              <td
                                className={`py-2 ${
                                  isLight ? 'text-[#7E88C3]' : 'text-[#DFE3FA]'
                                } `}
                              >
                                £{item.price.toFixed(2)}
                              </td>
                              <td className='py-2 '>
                                £{(item.quantity * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div
                        className={`flex justify-between p-7 text-white rounded-b-md  ${
                          isLight ? 'bg-[#373B53]' : 'bg-[#0C0E16]'
                        }  items-center mt-4 `}
                      >
                        <span className={`text-[13px] font-medium leading-5  `}>
                          Amount Due
                        </span>
                        <span className='ml-2 text-xl font-bold'>
                          £{invoice.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          : filteredInvoices.map((invoice) => (
              <div
                key={invoice._id}
                className={`cursor-pointer h-[72px] ${
                  isLight ? 'bg-white' : 'bg-[#1E2139]'
                }  w-full p-4 flex rounded-md shadow-md justify-between items-center`}
                onClick={() => handleInvoiceClick(invoice._id)}
              >
                <div className='flex gap-[50px]'>
                  <p
                    className={`font-bold text-[15px] leading-[15px] ${
                      isLight ? 'text-black' : 'text-[#FFFFFF]'
                    } `}
                  >
                    <span className='text-[#7E88C3]'>#</span>
                    {invoice._id}
                  </p>
                  <p className='text-[#888EB0] font-medium text-[13px] leading-[15px]'>
                    Due {invoice.date} {invoice.month} {invoice.year}
                  </p>
                  <p className='text-[#888EB0] font-medium text-[13px] leading-[15px]'>
                    {invoice.name}
                  </p>
                </div>
                <div className='flex items-center gap-10'>
                  <p
                    className={`font-bold text-[15px] leading-[24px] ${
                      isLight ? 'text-black' : 'text-[#FFFFFF]'
                    } `}
                  >
                    ${invoice.total}
                  </p>
                  <div className='flex items-center gap-5'>
                    <ul
                      className={`w-[104px] h-[40px] flex justify-center items-center rounded-md ${
                        invoice.status === 'Paid'
                          ? 'bg-opacity-25 bg-green-100 text-[#33D69F]'
                          : invoice.status === 'Pending'
                          ? ' bg-opacity-25 bg-orange-200 text-[#FF8F00]'
                          : 'bg-opacity-25 bg-gray-200 text-[#373B53]'
                      }`}
                    >
                      <li className='font-medium text-[15px] leading-[15px]'>
                        {invoice.status}
                      </li>
                    </ul>
                    <img src={arrowRight} alt='arrow' />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Invoices;
