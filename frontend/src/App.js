import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { ToastContainer } from 'react-toastify'; // import this
import 'react-toastify/dist/ReactToastify.css';  // import CSS for toastify

import HomePage from './pages/Homepage';
import BooksPage from './pages/Bookpage';
import CartPage from './pages/Cartpage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Registerform';
import AdminDashboard from './pages/Admin/AdminDahboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Add more routes as needed */}

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
