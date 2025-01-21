import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Invoice from './pages/Invoice';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}
