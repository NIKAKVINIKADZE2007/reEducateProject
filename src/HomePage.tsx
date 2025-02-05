import { useState, useEffect } from 'react';
import Header from './components/Header';
import Invoices from './components/invoicesComponent';
import { Invoice } from '../invoices/InvoiceJson';
import SideBar from './components/SideBar';
import { useNavigate } from 'react-router-dom';
import NewInvoice from './components/NewInvoice';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function HomePage() {
  const [isLight, setIsLight] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [pendingInvoicesCount, setPendingInvoicesCount] = useState<number>(0);
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  const getUser = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    try {
      const res = await axios.get('http://localhost:3000/auth/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvoices(res.data.invoices);
      console.log(res.data);
    } catch (e) {
      router('/auth/sign-in');
    }
  };

  const getInvoices = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    try {
      const res = await axios.get(
        'http://localhost:3000/invoices/user-invoices',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoices(res.data);
      console.log(res.data, 'invoices');
    } catch (e) {
      console.log(e, 'error');
    }
  };

  useEffect(() => {
    const loadPage = async () => {
      await getUser();
      await getInvoices();
    };

    loadPage();
  }, []);

  useEffect(() => {
    const pendingCount = invoices.filter(
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

  // if (loader) return <p>loading</p>;

  const router = useNavigate();

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
