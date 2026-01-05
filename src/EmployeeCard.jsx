import React, { useState } from 'react';

function EmployeeCard({ name, role }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px', width: '250px' }}>
      <h3>{name}</h3>
      <p>Role: {role}</p>
      <p>Status: <strong>{isActive ? '🟢 Online' : '🔴 Offline'}</strong></p>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Clock Out' : 'Clock In'}
      </button>
    </div>
  );
}

export default EmployeeCard;
