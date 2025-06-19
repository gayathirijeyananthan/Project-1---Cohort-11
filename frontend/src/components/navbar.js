import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';  // import CSS here

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      <Link to="/cart">Cart</Link>
      <button onClick={handleLoginClick}>Login</button>
    </nav>
  );
};

export default Navbar;
