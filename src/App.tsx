import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth/sign-in' element={<SignIn />} />
        <Route path='/auth/sign-up' element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
