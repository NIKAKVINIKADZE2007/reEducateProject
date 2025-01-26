import InvoiceForm from './InvoiceForm';

export default function NewInvoice({
  setShowNewInvoice,
}: {
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className='absolute inset-0 z-40 top-[73px] desktop:top-0'>
      <div className='absolute h-full w-full overflow-scroll bg-white tablet:max-w-[616px] desktop:max-w-[719px]'>
        <h1 className='text-mainDark font-bold text-[24px] tablet:mt-[59px] leading-8 mb-[22px] tablet:mb-[46px] mx-auto tablet:ml-[56px] desktop:ml-[159px]'>
          New Invoice
        </h1>
        <InvoiceForm setShowNewInvoice={setShowNewInvoice} />
      </div>
    </div>
  );
}
