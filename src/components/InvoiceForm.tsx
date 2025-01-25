import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InvoiceFormData, invoiceSchema } from '../validations/Invoice';
import PopUp from './PopUp';

export default function InvoiceForm({
  setShowNewInvoice,
}: {
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: yupResolver(invoiceSchema),
  });

  const onSubmit = () => {
    console.log('submited');
  };

  return (
    <form
      className='w-full absolute tablet:max-w-[719px] mx-auto'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col w-full desktop:ml-[159px] max-w-[327px] tablet:max-w-[504px] tablet:mx-auto'>
        <div className='w-full'>
          <h3 className='text-[15px] font-bold text-purpleDark mb-[25px]'>
            Bill From
          </h3>

          <div className='w-full'>
            {/* Street Address */}
            <div className='w-full'>
              <label className='text-blueGray text-[13px]'>
                Street Address
              </label>
              <input
                className='input'
                type='text'
                {...register('streetAddress')}
              />
              {errors.streetAddress && (
                <p className='text-red-500'>{errors.streetAddress?.message}</p>
              )}
            </div>

            <div className='w-full flex-col flex tablet:flex-row'>
              <div className='flex gap-6 mt-[25px] w-full'>
                {/* City */}
                <div className='w-full'>
                  <label className='text-blueGray text-[13px]'>City</label>
                  <input className='input' type='text' {...register('city')} />
                  {errors.city && (
                    <p className='text-red-500'>{errors.city?.message}</p>
                  )}
                </div>

                {/* Post Code */}
                <div className='w-full'>
                  <label className='text-blueGray text-[13px]'>Post Code</label>
                  <input
                    className='input'
                    type='text'
                    {...register('postCode')}
                  />
                  {errors.postCode && (
                    <p className='text-red-500'>{errors.postCode?.message}</p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className='mt-[25px] tablet:ml-6'>
                <label className='text-blueGray text-[13px]'>Country</label>
                <input className='input' type='text' {...register('country')} />
                {errors.country && (
                  <p className='text-red-500'>{errors.country?.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className='w-full'>
          <h3 className='text-[15px] font-bold text-purpleDark mb-[25px] mt-[42px]'>
            Bill To
          </h3>

          {/* Client Name */}
          <div className='w-full'>
            <label className='text-blueGray text-[13px]'>Client’s Name</label>
            <input className='input' type='text' {...register('clientName')} />
            {errors.clientName && (
              <p className='text-red-500'>{errors.clientName?.message}</p>
            )}
          </div>

          {/* Client Email */}
          <div className='w-full mt-[25px]'>
            <label className='text-blueGray text-[13px]'>Client’s Email</label>
            <input className='input' type='text' {...register('clientEmail')} />
            {errors.clientEmail && (
              <p className='text-red-500'>{errors.clientEmail?.message}</p>
            )}
          </div>

          {/* Street Address */}
          <div className='w-full mt-[25px]'>
            <label className='text-blueGray text-[13px]'>Street Address</label>
            <input
              className='input'
              type='text'
              {...register('streetAddress')}
            />
            {errors.streetAddress && (
              <p className='text-red-500'>{errors.streetAddress?.message}</p>
            )}
          </div>
        </div>

        {/* Additional Fields */}
        <div className='w-full flex-col flex'>
          <div className='flex gap-6 mt-[25px] w-full'>
            {/* Invoice Date */}
            <div className='w-full'>
              <label className='text-blueGray text-[13px]'>Invoice Date</label>
              <input
                className='input'
                type='date'
                {...register('invoiceDate')}
              />
              {errors.invoiceDate && (
                <p className='text-red-500'>{errors.invoiceDate?.message}</p>
              )}
            </div>

            {/* Payment Terms */}
            <div className='w-full tablet:ml-6'>
              <label className='text-blueGray text-[13px]'>Payment Terms</label>
              <input
                className='input'
                type='text'
                {...register('paymentTerms')}
              />
              {errors.paymentTerms && (
                <p className='text-red-500'>{errors.paymentTerms?.message}</p>
              )}
            </div>
          </div>

          {/* Project Description */}
          <div className='mt-[25px]'>
            <label className='text-blueGray text-[13px]'>
              Project Description
            </label>
            <input
              className='input'
              type='text'
              {...register('projectDescription')}
            />
            {errors.projectDescription && (
              <p className='text-red-500'>
                {errors.projectDescription?.message}
              </p>
            )}
          </div>
        </div>
        <PopUp />
      </div>
      <div className='opacity-[0.1] w-full h-[64px]   mt-6 bg-gradient-to-r from-[#979797] to-[#979797]  bg-opacity-[0.02] tablet:hidden' />
      <div className='flex items-center justify-between h-[91px] px-6 text-[15px] tablet:max-w-[504px] desktop:ml-[159px] tablet:mx-auto'>
        <button
          type='button'
          onClick={() => setShowNewInvoice(false)}
          className='h-[48px] max-w-[84px] w-full text-blueGray bg-[#F9FAFE] rounded-3xl'
        >
          Discard
        </button>
        <div className='flex justify-between max-w-[236px] w-full'>
          <button className='text-darkGray bg-[#373B53] h-[48px] max-w-[117px] w-full rounded-3xl'>
            Save as Draft
          </button>

          <button className='text-white bg-purpleDark h-[48px] max-w-[112px] w-full rounded-3xl'>
            Save & Send
          </button>
        </div>
      </div>
    </form>
  );
}
