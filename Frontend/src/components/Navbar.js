import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '1rem', color: '#fff' }}>Home</Link>
      <Link to="/login" style={{ marginRight: '1rem', color: '#fff' }}>Login</Link>
      <Link to="/signup" style={{ color: '#fff' }}>Signup</Link>
    </nav>
  );
};

export default Navbar;