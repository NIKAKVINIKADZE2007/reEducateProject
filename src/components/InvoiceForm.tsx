import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InvoiceFormData, invoiceSchema } from '../validations/Invoice';
import PopUp from './PopUp';
import { useState, useEffect } from 'react';
import leftArrow from '../assets/icon-arrow-left.svg';
import invoices, { Invoice } from '../../invoices/InvoiceJson';

export default function InvoiceForm({
  setShowNewInvoice,
  setInvoices,
  invoice,
}: {
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  invoice?: Invoice;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: yupResolver(invoiceSchema),
    defaultValues: invoice || {},
  });

  console.log(invoice);

  // logics

  const getMonthAbbreviation = (date: string): string => {
    const monthAbbreviations: string[] = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthAbbreviations[Number(date.split('-')[1])];
  };

  useEffect(() => {
    if (invoice) {
      setSelected(invoice.paymentTerms);
      const date = new Date(`${invoice.year}-${invoice.month}-${invoice.date}`);
      setValue('invoiceDate', date);
    }
  }, []);

  const [selected, setSelected] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelection = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  const options = ['Net 1 Day', 'Net 7 Day', 'Net 14 Day', 'Net 30 Day'];

  const onSubmit = (data: InvoiceFormData, status: string) => {
    console.log(data, 'data');

    const updatedInvoice = {
      ...data,
      id: invoice?.id || `${invoices.length + 1}`,
      status: status as 'Pending' | 'Draft',
      leftArrow: leftArrow,
    };

    if (invoice) {
      setInvoices((prevInvoices) =>
        prevInvoices.map((item) =>
          item.id === invoice.id ? { ...item, ...updatedInvoice } : item
        )
      );
    } else {
      // Otherwise, add a new invoice
      setInvoices((prevInvoices) => [...prevInvoices, updatedInvoice]);
    }

    reset(); // Reset the form
    setShowNewInvoice(false);

    console.log(invoice);
    console.log(setShowNewInvoice);
  };

  // design
  return (
    <form
      className='w-full absolute tablet:max-w-[719px] mx-auto'
      onSubmit={handleSubmit((data) => {
        onSubmit(data, 'Pending');
      })}
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
                {...register('fromStreet')}
              />
              {errors.fromStreet && (
                <p className='text-red-500'>{errors.fromStreet?.message}</p>
              )}
            </div>

            <div className='w-full flex-col flex tablet:flex-row'>
              <div className='flex gap-6 mt-[25px] w-full'>
                {/* City */}
                <div className='w-full'>
                  <label className='text-blueGray text-[13px]'>City</label>
                  <input
                    className='input'
                    type='text'
                    {...register('fromCity')}
                  />
                  {errors.fromCity && (
                    <p className='text-red-500'>{errors.fromCity?.message}</p>
                  )}
                </div>

                {/* Post Code */}
                <div className='w-full'>
                  <label className='text-blueGray text-[13px]'>Post Code</label>
                  <input
                    className='input'
                    type='text'
                    {...register('fromPostCode')}
                  />
                  {errors.fromPostCode && (
                    <p className='text-red-500'>
                      {errors.fromPostCode?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className='mt-[25px] tablet:ml-6'>
                <label className='text-blueGray text-[13px]'>Country</label>
                <input
                  className='input'
                  type='text'
                  {...register('fromCountry')}
                />
                {errors.fromCountry && (
                  <p className='text-red-500'>{errors.fromCountry?.message}</p>
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
            <input className='input' type='text' {...register('name')} />
            {errors.name && (
              <p className='text-red-500'>{errors.name?.message}</p>
            )}
          </div>

          {/* Client Email */}
          <div className='w-full mt-[25px]'>
            <label className='text-blueGray text-[13px]'>Client’s Email</label>
            <input className='input' type='text' {...register('email')} />
            {errors.email && (
              <p className='text-red-500'>{errors.email?.message}</p>
            )}
          </div>

          {/* Street Address */}
          <div className='w-full mt-[25px]'>
            <label className='text-blueGray text-[13px]'>Street Address</label>
            <input className='input' type='text' {...register('street')} />
            {errors.street && (
              <p className='text-red-500'>{errors.street?.message}</p>
            )}
          </div>
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
              <input className='input' type='text' {...register('postCode')} />
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

        {/* Additional Fields */}
        <div className='w-full flex-col flex'>
          <div className='flex gap-6 mt-[25px] w-full'>
            {/* Invoice Date */}
            <div className='w-full'>
              <label className='text-blueGray text-[13px]'>Invoice Date</label>
              <input
                className='input'
                onChange={(e) => {
                  setValue(`month`, getMonthAbbreviation(e.target.value));
                  const dates = e.target.value.split('-');
                  setValue('date', Number(dates[2]));
                  setValue('year', Number(dates[0]));
                  setValue('invoiceDate', new Date());
                }}
                type='date'
                value={
                  invoice
                    ? `${invoice.year}-${invoice.month}-${invoice.date}`
                    : ''
                }
              />
              {errors.invoiceDate && (
                <p className='text-red-500'>{errors.invoiceDate?.message}</p>
              )}
            </div>

            {/* Payment Terms */}
            <div className='w-full tablet:ml-6'>
              <label className='text-blueGray text-[13px]'>Payment Terms</label>
              <button
                type='button'
                className='input text-start'
                onClick={() => setIsOpen(!isOpen)}
              >
                {selected}
              </button>

              {isOpen && (
                <div className='absolute z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg'>
                  {options.map((option) => (
                    <button
                      type='button'
                      key={option}
                      onClick={() => {
                        handleSelection(option);
                        setValue('paymentTerms', option);
                      }}
                      className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
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
            <input className='input' type='text' {...register('description')} />
            {errors.description && (
              <p className='text-red-500'>{errors.description?.message}</p>
            )}
          </div>
        </div>
        <PopUp register={register} invoice={invoice} />
      </div>
      <div className='opacity-[0.1] w-full h-[64px]   mt-6 bg-gradient-to-r from-[#979797] to-[#979797]  bg-opacity-[0.02] tablet:hidden' />
      <div
        className={`flex items-center  h-[91px] px-6 text-[15px] tablet:max-w-[504px] desktop:ml-[159px] tablet:mx-auto  ${
          invoice ? ' justify-end' : 'justify-between'
        } `}
      >
        <button
          type='button'
          onClick={() => setShowNewInvoice(false)}
          className='h-[48px] max-w-[84px] w-full text-blueGray bg-[#F9FAFE] rounded-3xl'
        >
          Discard
        </button>
        <div
          className={`flex justify-between max-w-[236px]   ${
            invoice ? ' w-[138px] ml-8' : 'w-full'
          }`}
        >
          <button
            onClick={handleSubmit((data) => {
              onSubmit(data, 'Draft');
            })}
            className={`text-darkGray bg-[#373B53] h-[48px] max-w-[117px] w-full rounded-3xl ${
              invoice ? 'hidden' : ''
            }`}
          >
            Save as Draft
          </button>

          <button
            type='submit'
            className='text-white bg-purpleDark h-[48px] max-w-[112px] w-full rounded-3xl'
          >
            Save & Send
          </button>
        </div>
      </div>
    </form>
  );
}
