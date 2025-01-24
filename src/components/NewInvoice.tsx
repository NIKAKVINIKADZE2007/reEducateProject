export default function NewInvoice() {
  return (
    <div>
      <div className='h-screen w-full bg-white '>
        <div className='mx-auto w-[327px]'>
          <h1 className='text-mainDark font-bold text-[24px] leading-8 mb-[22px] tablet:mb-[46px]'>
            New Invoice
          </h1>
          <form className='flex flex-col'>
            <div>
              <h3 className='text-[15px] font-bold text-purpleDark mb-[25px]'>
                Bill To
              </h3>
            </div>
          </form>
        </div>
      </div>
      {/* <div className='absolute top-0 h-screen w-screen bg-[#000000] opacity-[0.49]' /> */}
    </div>
  );
}
