import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5108/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    })
    .catch(() => alert("Invalid Credentials"));
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: '#a855f7', borderRadius: '50%', filter: 'blur(80px)', top: '10%', left: '20%', opacity: 0.6 }} className="animate-float"></div>
      <div style={{ position: 'absolute', width: '250px', height: '250px', background: '#ec4899', borderRadius: '50%', filter: 'blur(80px)', bottom: '10%', right: '20%', opacity: 0.5 }} className="animate-float"></div>

      {/* The Glass Card */}
      <div className="glass" style={{ width: '350px', padding: '40px', zIndex: 10, textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px', fontWeight: 'bold', letterSpacing: '2px' }}>LOGIN</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text" name="username" placeholder="Username" 
            onChange={handleChange} style={{ padding: '15px' }} 
          />
          <input 
            type="password" name="password" placeholder="Password" 
            onChange={handleChange} style={{ padding: '15px' }} 
          />
          
          <button type="submit" style={{ 
            padding: '15px', 
            background: 'linear-gradient(45deg, #a855f7, #ec4899)', 
            color: 'white', border: 'none', borderRadius: '8px', 
            fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem'
          }}>
            LOG IN
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#ccc' }}>admin / password123</p>
      </div>
    </div>
  );
}

export default Login;
