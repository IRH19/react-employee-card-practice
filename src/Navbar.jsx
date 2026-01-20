import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the token
    localStorage.removeItem('token');
    // 2. Go back to Login Page
    navigate('/');
  };

  return (
    <nav className="glass" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      marginBottom: '30px',
      borderRadius: '0 0 20px 20px', // Rounded only at bottom
      borderTop: 'none' 
    }}>
      {/* Brand Name */}
      <h2 style={{ margin: 0, fontWeight: 'bold', letterSpacing: '1px' }}>
        AddSol<span style={{ color: '#a855f7' }}>Tech</span>
      </h2>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/dashboard" className="btn-glass">
          📊 Dashboard
        </Link>
        
        <Link to="/add" className="btn-glass">
          ➕ Add Employee
        </Link>

        {/* LOGOUT BUTTON */}
        <button onClick={handleLogout} className="btn-glass" style={{ borderColor: '#ef4444', color: '#fca5a5' }}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

