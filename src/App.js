import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup.jsx';
import Bookdetails from './pages/Bookdetails';
import Signin from './pages/Signin';
import Cart from './pages/Cart';
import Errorpage from './pages/Errorpage';
import { ToastContainer } from 'react-toastify';
import Account from './pages/Account';
import loader from "../src/assets/images/loader.gif";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="loader-wrapper">
          <img src={loader} alt="loader" />
        </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bookdetail/:id" element={<Bookdetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<Errorpage />} />
          </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
