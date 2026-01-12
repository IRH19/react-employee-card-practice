import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL
  
  const [formData, setFormData] = useState({
    id: '', // Make sure ID is included
    name: '',
    role: '',
    status: 'Offline'
  });

  // 1. Load existing data when page opens
  useEffect(() => {
    fetch(`http://localhost:5108/api/employees/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Save changes (PUT request)
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5108/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        navigate('/'); // Go back to dashboard
      } else {
        alert("Error updating employee!");
      }
    })
    .catch(error => console.error("Error:", error));
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #444', borderRadius: '10px' }}>
      <h2>✏️ Edit Employee</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="text" name="name" 
          value={formData.name} onChange={handleChange} 
          required style={{ padding: '10px' }}
        />

        <input 
          type="text" name="role" 
          value={formData.role} onChange={handleChange} 
          required style={{ padding: '10px' }}
        />

        <select name="status" value={formData.status} onChange={handleChange} style={{ padding: '10px' }}>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Busy">Busy</option>
        </select>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#ffcc00', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Update Changes
        </button>
        
        <Link to="/" style={{ textAlign: 'center', marginTop: '10px' }}>Cancel</Link>
      </form>
    </div>
  );
}

export default EditEmployee;
