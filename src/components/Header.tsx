import { useState } from 'react';
import upArrow from '../assets/upArrow.png';
import plius from '../assets/plius.png';

type Props = {
  setShowNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ setShowNewInvoice }) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <header className='flex justify-between items-center max-w-[760px] flex-col sm:flex-row text-center bg-white text-[#0C0E16]'>
      <div className='xl:w-[200px]'>
        <p className='text-[36px] font-bold'>Invoices</p>
        <p className='text-[#888EB0]'>There are 34 pending invoices</p>
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
              <label className='p-2 items-center justify-start flex text-[#DFE3FA]'>
                <input type='checkbox' className='mr-2' />
                Draft
              </label>
              <label className='p-2 items-center justify-start flex text-[#DFE3FA]'>
                <input type='checkbox' className='mr-2' />
                Pending
              </label>
              <label className='p-2 items-center justify-start flex text-[#DFE3FA]'>
                <input type='checkbox' className='mr-2' />
                Completed
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
