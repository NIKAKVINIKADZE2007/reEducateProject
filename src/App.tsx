import { useState, useEffect } from 'react';
import Header from './components/Header';
import Invoices from './components/invoicesComponent';
import invoicesData from '../invoices/InvoiceJson';
import SideBar from './components/SideBar';
import NewInvoice from './components/NewInvoice';

export default function App() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [pendingInvoicesCount, setPendingInvoicesCount] = useState<number>(0);
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  useEffect(() => {
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
    <div className='bg-white h-screen items-center'>
      {showNewInvoice && (
        <>
          <div className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.49)] z-10' />
          <NewInvoice
            setShowNewInvoice={setShowNewInvoice}
            setInvoices={setInvoices}
          />
        </>
      )}
      <SideBar />
      <header className='mb-16'>
        <Header
          setFilterStatus={setFilterStatus}
          setShowNewInvoice={setShowNewInvoice}
          pendingInvoicesCount={pendingInvoicesCount}
        />
      </header>

      <div className=''>
        <Invoices
          invoices={invoices}
          setInvoices={setInvoices}
          filterStatus={filterStatus}
        />
      </div>
    </div>
  );
}
