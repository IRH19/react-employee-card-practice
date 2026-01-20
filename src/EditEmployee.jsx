import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    status: 'Offline'
  });

  useEffect(() => {
    fetch(`http://localhost:5108/api/employees/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5108/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        // SUCCESS: Go to Dashboard
        navigate('/dashboard');
      } else {
        alert("Error updating employee!");
      }
    })
    .catch(error => console.error("Error:", error));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="glass" style={{ width: '400px', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '25px', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
          ✏️ Edit Profile
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <input 
            type="text" name="name" 
            value={formData.name} onChange={handleChange} 
            required 
          />

          <input 
            type="text" name="role" 
            value={formData.role} onChange={handleChange} 
            required 
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Busy">Busy</option>
          </select>

          <button type="submit" className="btn-glass" style={{ background: 'linear-gradient(45deg, #7c3aed, #db2777)', border: 'none' }}>
            Update Changes
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

export default EditEmployee;

