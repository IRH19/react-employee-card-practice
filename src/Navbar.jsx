import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '20px', backgroundColor: '#333', marginBottom: '20px' }}>
      {/* 'Link' is the React version of an HTML <a> tag */}
      <Link to="/" style={{ marginRight: '20px', color: 'white', textDecoration: 'none' }}>Team Dashboard</Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
    </nav>
  );
}

export default Navbar;
