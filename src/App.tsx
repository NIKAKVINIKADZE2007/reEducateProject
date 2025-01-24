'use client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Invoice } from './pages/Invoice';
import Header from './components/Header';
import { useState } from 'react';

export default function App() {
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  return (
    <BrowserRouter>
      <Header setShowNewInvoice={setShowNewInvoice} />
      <Routes>
        <Route path='/' element={<Home showNewInvoice={showNewInvoice} />} />
        <Route path='/:id' element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}
