import { useState, useEffect } from 'react';
import Header from './components/Header';
import Invoices from './components/invoicesComponent';
import invoicesData from '../invoices/InvoiceJson';
import SideBar from './components/SideBar';

export default function App() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [pendingInvoicesCount, setPendingInvoicesCount] = useState<number>(0);

  useEffect(() => {
    const pendingCount = invoicesData.filter(
      (invoice) => invoice.status === 'Pending'
    ).length;
    setPendingInvoicesCount(pendingCount);
  }, []);

  return (
    <div className='bg-white h-screen items-center'>
      <SideBar />
      <header className='mb-16'>
        <Header
          setFilterStatus={setFilterStatus}
          pendingInvoicesCount={pendingInvoicesCount}
        />
      </header>

      <div className=''>
        <Invoices filterStatus={filterStatus} />
      </div>
    </div>
  );
}
