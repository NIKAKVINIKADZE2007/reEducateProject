import { useState, useEffect } from 'react';
import Header from './components/Header';
import Invoices from './components/invoicesComponent';
import invoicesData from '../invoices/InvoiceJson';
import SideBar from './components/SideBar';
import NewInvoice from './components/NewInvoice';

export default function App() {
  const [isLight, setIsLight] = useState(true);
  const [invoices, setInvoices] = useState(invoicesData);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [pendingInvoicesCount, setPendingInvoicesCount] = useState<number>(0);
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  const fetchdata = async () => {
    const res = await fetch('http://localhost:3000');
    const data = await res.text();
    console.log(data);
  };

  useEffect(() => {
    fetchdata();
    const pendingCount = invoicesData.filter(
      (invoice) => invoice.status === 'Pending'
    ).length;
    setPendingInvoicesCount(pendingCount);
  }, []);

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
    <div
      className={`${
        isLight ? 'bg-white' : 'bg-[#141625]'
      } h-[140vh] items-center`}
    >
      {showNewInvoice && (
        <>
          <div className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.49)] z-10' />
          <NewInvoice
            isLight={isLight}
            setShowNewInvoice={setShowNewInvoice}
            setInvoices={setInvoices}
          />
        </>
      )}
      <SideBar isLight={isLight} setIsLight={setIsLight} />
      <header className='mb-16'>
        <Header
          isLight={isLight}
          setFilterStatus={setFilterStatus}
          setShowNewInvoice={setShowNewInvoice}
          pendingInvoicesCount={pendingInvoicesCount}
        />
      </header>

      <div className=''>
        <Invoices
          isLight={isLight}
          invoices={invoices}
          setInvoices={setInvoices}
          filterStatus={filterStatus}
        />
      </div>
    </div>
  );
}
