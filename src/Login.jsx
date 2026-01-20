import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5108/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Save Token
        localStorage.setItem('token', data.token);
        // 2. Redirect to Dashboard (Not "/")
        navigate('/dashboard');
      } else {
        setError('Invalid Username or Password');
      }
    } catch (err) {
      setError('Server Error: Is the Backend running?');
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '20px' 
    }}>
      <div className="glass" style={{ width: '350px', padding: '40px', textAlign: 'center' }}>
        
        <h1 style={{ marginBottom: '10px', fontSize: '2rem' }}>AddSol<span style={{ color: '#a855f7' }}>Tech</span></h1>
        <p style={{ color: '#ccc', marginBottom: '30px' }}>Internal Portal Login</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
          />
          
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
          />

          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.2)', 
              border: '1px solid #ef4444', 
              color: '#fca5a5', 
              padding: '10px', 
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="btn-glass" style={{ 
            background: 'linear-gradient(45deg, #7c3aed, #db2777)', 
            border: 'none',
            fontSize: '1rem',
            marginTop: '10px'
          }}>
            Login Access
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#888' }}>
          System Admin Only
        </p>

      </div>
    </div>
  );
}

export default Login;

