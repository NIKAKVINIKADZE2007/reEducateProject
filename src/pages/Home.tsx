import SideBar from '../components/SideBar';
import { useState, useEffect } from 'react';
import NewInvoice from '../components/NewInvoice';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showNewInvoice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showNewInvoice]);

  return (
    <div>
      <Header setShowNewInvoice={setShowNewInvoice} />
       <SideBar />
      {showNewInvoice && (
        <>
          <div className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.49)] z-10' />
          <NewInvoice setShowNewInvoice={setShowNewInvoice} />
        </>
      )}
    </div>
  );
};

export default Home;

