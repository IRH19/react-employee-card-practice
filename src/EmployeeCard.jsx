import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importing Link for navigation

function EmployeeCard({ name, role }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px', width: '250px' }}>
      <h3>{name}</h3>
      <p>Role: {role}</p>
      <p>Status: <strong>{isActive ? '🟢 Online' : '🔴 Offline'}</strong></p>
      
      {/* The new Link to the details page */}
      <div style={{ marginBottom: '15px' }}>
        <Link to={`/employee/${name}`} style={{ color: '#646cff' }}>View Full Profile</Link>
      </div>

      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Clock Out' : 'Clock In'}
      </button>
    </div>
  );
}

export default EmployeeCard;
