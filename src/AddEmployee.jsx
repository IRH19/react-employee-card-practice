import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    status: 'Online'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5108/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        // SUCCESS: Go to Dashboard
        navigate('/dashboard');
      } else {
        alert("Error adding employee!");
      }
    })
    .catch(error => console.error("Error:", error));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="glass" style={{ width: '400px', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '25px', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
          ➕ Add Team Member
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <input 
            type="text" name="name" placeholder="Full Name" 
            onChange={handleChange} required 
          />
          
          <input 
            type="text" name="role" placeholder="Job Title" 
            onChange={handleChange} required 
          />
          
          <select name="status" onChange={handleChange}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Busy">Busy</option>
          </select>

          <button type="submit" className="btn-glass" style={{ background: 'linear-gradient(45deg, #7c3aed, #db2777)', border: 'none' }}>
            Save Employee
          </button>

          {/* FIX: Link points to /dashboard, NOT / */}
          <Link to="/dashboard" style={{ marginTop: '10px', color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>
            Cancel & Go Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;

