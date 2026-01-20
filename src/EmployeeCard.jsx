import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeCard({ id, name, role, status, onDelete }) {
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      fetch(`http://localhost:5108/api/employees/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) onDelete(id);
      })
      .catch(err => console.error(err));
    }
  };

  const statusColor = status === "Online" ? "#4ade80" : status === "Busy" ? "#f87171" : "#9ca3af";

  return (
    // Replaced black background with "glass" class
    <div className="glass" style={{ 
      padding: '25px', 
      width: '220px', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      
      {/* Avatar Circle */}
      <div style={{ 
        width: '60px', height: '60px', margin: '0 auto 15px', 
        borderRadius: '50%', background: 'rgba(255,255,255,0.1)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem'
      }}>
        👤
      </div>

      <h3 style={{ margin: '0 0 5px 0' }}>{name}</h3>
      <p style={{ color: '#ccc', fontSize: '0.9rem', margin: '0 0 15px 0' }}>{role}</p>
      
      <div style={{ marginBottom: '20px', fontSize: '0.8rem' }}>
        <span style={{ 
          height: '8px', width: '8px', 
          backgroundColor: statusColor, 
          borderRadius: '50%', 
          display: 'inline-block', 
          marginRight: '8px',
          boxShadow: `0 0 8px ${statusColor}`
        }}></span>
        {status}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Link to={`/employee/${name}`} style={{ color: '#a855f7', textDecoration: 'none', fontSize: '0.85rem' }}>View</Link>
        <Link to={`/edit/${id}`} style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '0.85rem' }}>Edit</Link>
        <button onClick={handleDelete} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
      </div>
    </div>
  );
}

export default EmployeeCard;
