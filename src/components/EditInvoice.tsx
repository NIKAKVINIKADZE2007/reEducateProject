import React from 'react';
import { Invoice } from '../../invoices/InvoiceJson';
import InvoiceForm from './InvoiceForm';

export default function EditInvoice({
  setInvoices,
  setShowEditInvoice,
  invoice,
  isLight,
}: {
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  setShowEditInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  invoice: Invoice | undefined;
  isLight: boolean;
}) {
  return (
    <div className='absolute inset-0 z-40 top-[73px] desktop:top-0'>
      <div
        className={`absolute h-full w-full overflow-scroll  tablet:max-w-[616px] desktop:max-w-[719px] ${
          isLight ? 'bg-white' : 'bg-[#141625]'
        }`}
      >
        <h1
          className={`${
            isLight ? 'text-[black]' : 'text-[white]'
          }  font-bold text-[24px] tablet:mt-[59px] leading-8 mb-[22px] tablet:mb-[46px] mx-auto tablet:ml-[56px] desktop:ml-[159px] `}
        >
          Edit #{invoice?.id}
        </h1>
        <InvoiceForm
          setInvoices={setInvoices}
          setShowNewInvoice={setShowEditInvoice}
          invoice={invoice}
          isLight={isLight}
        />
      </div>
    </div>
  );
}
