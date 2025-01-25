import InvoiceForm from './InvoiceForm';

export default function NewInvoice({
  setShowNewInvoice,
}: {
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className='h-screen w-screen'>
      {/* Invoice form container */}
      <div className='absolute top-0 left-0 h-full w-full bg-white tablet:max-w-[616px] desktop:max-w-[719px] z-20'>
        <h1 className='text-mainDark font-bold text-[24px] leading-8 mb-[22px] tablet:mb-[46px]'>
          New Invoice
        </h1>
        <InvoiceForm setShowNewInvoice={setShowNewInvoice} />
        {/* Invoice buttons */}
      </div>
    </div>
  );
}
