import { useState } from 'react';
import invoicesData, { Invoice } from '../../invoices/InvoiceJson';

const Invoices = ({
  filterStatus,
  invoices,
  setInvoices,
}: {
  filterStatus: string | null;
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<null | { id: string }>(
    null
  );

  const filteredInvoices = filterStatus
    ? invoices.filter((invoice) => invoice.status === filterStatus)
    : invoices;

  const handleInvoiceClick = (invoiceId: string) => {
    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice(null); // Deselect if already selected
    } else {
      setSelectedInvoice({ id: invoiceId });
    }
  };

  const handleGoBack = () => {
    setSelectedInvoice(null); // Go back to the list of invoices
  };

  const handleDelete = (invoiceId: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== invoiceId)
    );
    setSelectedInvoice(null); // Go back to the list after deletion
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: 'Paid' } : invoice
      )
    );
  };

  return (
    <div className='max-w-[730px] mx-auto space-y-4'>
      {selectedInvoice
        ? filteredInvoices
            .filter((invoice) => invoice.id === selectedInvoice.id)
            .map((invoice) => (
              <div key={invoice.id}>
                <button
                  className='font-bold text-[15px] leading-[15px]'
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
                <div className='cursor-pointer h-[72px] bg-white w-full p-4 flex rounded-md shadow-md justify-between items-center'>
                  <div className='flex gap-[40px] items-center'>
                    <p className='font-medium text-[13px] leading-[15px]'>
                      Status
                    </p>
                    <ul
                      className={`w-[104px] h-[40px] flex justify-center items-center rounded-md ${
                        invoice.status === 'Paid'
                          ? 'bg-green-100 text-[#33D69F]'
                          : invoice.status === 'Pending'
                          ? 'bg-orange-200 text-[#FF8F00]'
                          : 'bg-gray-200 text-[#373B53]'
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
                      onClick={() => handleInvoiceClick(invoice.id)}
                    >
                      Edit
                    </div>
                    <div
                      className='w-[89px] h-[48px] font-bold text-[15px] flex justify-center items-center rounded-3xl bg-[#EC5757] text-white'
                      onClick={() => handleDelete(invoice.id)}
                    >
                      Delete
                    </div>
                    <div
                      className='w-[131px] h-[48px] font-bold text-[15px] flex justify-center items-center rounded-3xl bg-[#7C5DFA] text-white'
                      onClick={() => handleMarkAsPaid(invoice.id)}
                    >
                      Mark as Paid
                    </div>
                  </div>
                </div>
                <div className={`p-6 border rounded-lg shadow-md`}>
                  <div className='flex justify-between items-center'>
                    <div>
                      <h2 className='text-2xl font-bold'>{`#${invoice.id}`}</h2>
                      <p>{invoice.itemName}</p>
                    </div>
                    <div className='flex flex-col'>
                      <span>{invoice.fromStreet}</span>
                      <span>{invoice.fromCity}</span>
                      <span>{invoice.fromPostCode}</span>
                      <span>{invoice.fromCountry}</span>
                    </div>
                  </div>
                  <div className='flex items-start justify-between mt-4'>
                    <div>
                      <p className='text-gray-500'>Invoice Date</p>
                      <p className='font-bold'>{`${invoice.date} ${invoice.month} ${invoice.year}`}</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Bill To</p>
                      <p className='font-bold'>{invoice.name}</p>
                      <div className='flex flex-col'>
                        <span>{invoice.street}</span>
                        <span>{invoice.city}</span>
                        <span>{invoice.postCode}</span>
                        <span>{invoice.country}</span>
                      </div>
                    </div>
                    <div>
                      <p className='text-gray-500'>Sent to</p>
                      <p className='font-bold'>{invoice.email}</p>
                    </div>
                  </div>
                  <div className='mt-8 bg-gray-50 rounded-lg'>
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
                        <tr className='border-t'>
                          <td className='py-2'>{invoice.itemName}</td>
                          <td className='py-2'>{invoice.quantity}</td>
                          <td className='py-2'>£{invoice.price.toFixed(2)}</td>
                          <td className='py-2'>
                            £{(invoice.quantity * invoice.price).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={`flex justify-between items-center mt-4 `}>
                      <span>Amount Due</span>
                      <span className='ml-2 text-xl font-bold'>
                        £{(invoice.quantity * invoice.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
        : filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className='cursor-pointer h-[72px] bg-white w-full p-4 flex rounded-md shadow-md justify-between items-center'
              onClick={() => handleInvoiceClick(invoice.id)}
            >
              <div className='flex gap-[50px]'>
                <p className='font-bold text-[15px] leading-[15px]'>
                  <span className='text-[#7E88C3]'>#</span>
                  {invoice.id}
                </p>
                <p className='text-[#888EB0] font-medium text-[13px] leading-[15px]'>
                  Due {invoice.date} {invoice.month} {invoice.year}
                </p>
                <p className='text-[#888EB0] font-medium text-[13px] leading-[15px]'>
                  {invoice.name}
                </p>
              </div>
              <div className='flex items-center gap-10'>
                <p className='font-bold text-[15px] leading-[24px]'>
                  ${(invoice.quantity * invoice.price).toFixed(2)}
                </p>
                <div className='flex items-center gap-5'>
                  <ul
                    className={`w-[104px] h-[40px] flex justify-center items-center rounded-md ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-[#33D69F]'
                        : invoice.status === 'Pending'
                        ? 'bg-orange-200 text-[#FF8F00]'
                        : 'bg-gray-200 text-[#373B53]'
                    }`}
                  >
                    <li className='font-medium text-[15px] leading-[15px]'>
                      {invoice.status}
                    </li>
                  </ul>
                  <img src={invoice.leftArrow} alt='arrow' />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Invoices;
