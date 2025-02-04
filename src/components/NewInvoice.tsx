import { Invoice } from '../../invoices/InvoiceJson';
import InvoiceForm from './InvoiceForm';

export default function NewInvoice({
  setInvoices,
  setShowNewInvoice,
  isLight,
}: {
  isLight: boolean;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className='absolute inset-0 z-40 top-[73px] desktop:top-0'>
      <div
        className={`absolute h-full w-full overflow-scroll ${
          isLight ? 'bg-white' : 'bg-[#141625]'
        }  tablet:max-w-[616px] desktop:max-w-[719px]`}
      >
        <h1
          className={` ${
            isLight ? 'text-mainDark' : 'text-white'
          }  font-bold text-[24px] tablet:mt-[59px] leading-8 mb-[22px] tablet:mb-[46px] mx-auto tablet:ml-[56px] desktop:ml-[159px]`}
        >
          New Invoice
        </h1>
        <InvoiceForm
          isLight={isLight}
          setInvoices={setInvoices}
          setShowNewInvoice={setShowNewInvoice}
        />
      </div>
    </div>
  );
}
