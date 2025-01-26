import React, { useState } from 'react';
import upArrow from '../assets/upArrow.png';
import plius from '../assets/plius.png';

const Header: React.FC<{
  setFilterStatus: (status: string | null) => void;
  pendingInvoicesCount: number;
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setFilterStatus, pendingInvoicesCount, setShowNewInvoice }) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
    setIsFilterOpen(false);
  };

  return (
    <header className='flex justify-between items-center max-w-[760px] m-auto flex-col sm:flex-row text-center bg-white text-[#0C0E16]'>
      <div className='xl:w-[200px]'>
        <p className='text-[36px] font-bold'>Invoices</p>
        <p className='text-[#888EB0]'>
          There are {pendingInvoicesCount} pending invoices
        </p>
      </div>

      <div className='flex items-center gap-9 flex-col sm:flex-row'>
        <div>
          <p
            className='flex items-center gap-2 text-[15px] font-bold leading-[15px] cursor-pointer'
            onClick={toggleFilter}
          >
            Filter by status
            <img src={plius} className='w-[8px] h-[4px]' alt='arrow' />
          </p>
          {isFilterOpen && (
            <div className='absolute bg-[#373B53] w-[192px] h-[128px] mt-6 shadow-lg rounded-md flex flex-col'>
              <label
                className='p-2 items-center justify-start flex text-[#DFE3FA] cursor-pointer'
                onClick={() => handleFilterChange('Draft')}
              >
                <input type='radio' name='filter' className='mr-2' />
                Draft
              </label>
              <label
                className='p-2 items-center justify-start flex text-[#DFE3FA] cursor-pointer'
                onClick={() => handleFilterChange('Pending')}
              >
                <input type='radio' name='filter' className='mr-2' />
                Pending
              </label>
              <label
                className='p-2 items-center justify-start flex text-[#DFE3FA] cursor-pointer'
                onClick={() => handleFilterChange('Paid')}
              >
                <input type='radio' name='filter' className='mr-2' />
                Paid
              </label>
              <label
                className='p-2 items-center justify-start flex text-[#DFE3FA] cursor-pointer'
                onClick={() => handleFilterChange(null)}
              >
                <input type='radio' name='filter' className='mr-2' />
                All
              </label>
            </div>
          )}
        </div>

        <button
          className='w-[190px] h-[50px] pl-3 rounded-[50px] flex items-center gap-5 bg-[#7C5DFA]'
          onClick={() => setShowNewInvoice(true)}
        >
          <div className='w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-white'>
            <img src={upArrow} alt='plus icon' />
          </div>
          <p className='text-white text-[15px] font-bold leading-[15px]'>
            New Invoice
          </p>
        </button>
      </div>
    </header>
  );
};

export default Header;
