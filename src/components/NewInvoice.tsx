import InvoiceForm from './InvoiceForm';

export default function NewInvoice({
  setShowNewInvoice,
}: {
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className='absolute inset-0 z-40'>
      <div className='absolute h-full w-full overflow-scroll bg-white tablet:max-w-[616px] desktop:max-w-[719px]'>
        <h1 className='text-mainDark font-bold text-[24px] leading-8 mb-[22px] tablet:mb-[46px] mx-auto tablet:ml-[159px]'>
          New Invoice
        </h1>
        <InvoiceForm setShowNewInvoice={setShowNewInvoice} />
      </div>
    </div>
  );
}
