import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Send credentials to Backend
    fetch('http://localhost:5108/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Login Failed");
      }
    })
    .then(data => {
      // 2. Save the "Key" (Token) to browser storage
      localStorage.setItem('token', data.token);
      
      // 3. Go to Dashboard
      navigate('/dashboard');
    })
    .catch(error => {
      alert("Invalid Username or Password!");
      console.error(error);
    });
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto', padding: '30px', border: '1px solid #444', borderRadius: '10px', textAlign: 'center' }}>
      <h2>🔒 Admin Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="text" name="username" placeholder="Username" 
          onChange={handleChange} 
          style={{ padding: '10px' }} 
        />
        
        <input 
          type="password" name="password" placeholder="Password" 
          onChange={handleChange} 
          style={{ padding: '10px' }} 
        />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#646cff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <p style={{fontSize: '0.8rem', color: '#888'}}>Hint: admin / password123</p>
    </div>
  );
}

export default Login;

