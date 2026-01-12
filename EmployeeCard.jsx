import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeCard({ id, name, role, status, onDelete }) {
  
  // Logic to delete THIS specific employee
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      fetch(`http://localhost:5108/api/employees/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          onDelete(id); // Tell the Dashboard to remove this card from the screen
        } else {
          alert("Failed to delete.");
        }
      })
      .catch(err => console.error(err));
    }
  };

  const statusColor = status === "Online" ? "green" : status === "Busy" ? "red" : "gray";

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '10px', 
      padding: '20px', 
      width: '200px', 
      textAlign: 'center',
      backgroundColor: '#1a1a1a'
    }}>
      <h3>{name}</h3>
      <p style={{ color: '#aaa' }}>{role}</p>
      
      <div style={{ marginBottom: '15px' }}>
        <span style={{ 
          height: '10px', width: '10px', 
          backgroundColor: statusColor, 
          borderRadius: '50%', 
          display: 'inline-block', 
          marginRight: '8px' 
        }}></span>
        {status}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {/* Link to the Full Profile */}
        <Link to={`/employee/${name}`} style={{ fontSize: '0.8rem', color: '#646cff' }}>View</Link>
        
        {/* Link to the Edit Page */}
        <Link to={`/edit/${id}`} style={{ fontSize: '0.8rem', color: '#ffcc00' }}>Edit</Link>
        
        {/* Delete Button */}
        <button onClick={handleDelete} style={{ fontSize: '0.8rem', backgroundColor: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
