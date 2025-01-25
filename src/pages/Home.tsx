import { useState } from 'react';
import NewInvoice from '../components/NewInvoice';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  return (
    <div>
      <Header setShowNewInvoice={setShowNewInvoice} />
      {showNewInvoice && <NewInvoice setShowNewInvoice={setShowNewInvoice} />}
      {showNewInvoice && (
        <div className='absolute top-0 left-0 h-[200vh] w-screen bg-[#000000] opacity-[0.49] z-10' />
      )}
    </div>
  );
};

export default Home;
