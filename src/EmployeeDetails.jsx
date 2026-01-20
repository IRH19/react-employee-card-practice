import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetails() {
  const { name } = useParams();
  const [employee, setEmployee] = useState(null);

  // Helper to find the employee by name (since we don't have an ID in the URL here)
  useEffect(() => {
    fetch('http://localhost:5108/api/employees')
      .then(res => res.json())
      .then(data => {
        const found = data.find(e => e.name === name);
        setEmployee(found);
      })
      .catch(err => console.error(err));
  }, [name]);

  if (!employee) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="glass" style={{ width: '500px', padding: '40px', textAlign: 'left' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>
          <div style={{ fontSize: '3rem', marginRight: '20px' }}>👤</div>
          <div>
            <h2 style={{ margin: 0 }}>Employee Profile</h2>
            <span style={{ color: '#ccc', fontSize: '0.9rem' }}>SQL Database Record</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '1.1rem' }}>
          <div>
            <strong style={{ color: '#a855f7' }}>Name:</strong> {employee.name}
          </div>
          <div>
            <strong style={{ color: '#a855f7' }}>Role:</strong> {employee.role}
          </div>
          <div>
            <strong style={{ color: '#a855f7' }}>Status:</strong> {employee.status}
          </div>
          <div>
            <strong style={{ color: '#a855f7' }}>ID:</strong> {employee.id}
          </div>
        </div>

        {/* FIX: Link points to /dashboard, NOT / */}
        <div style={{ marginTop: '30px' }}>
          <Link to="/dashboard" className="btn-glass" style={{ textAlign: 'center', display: 'block' }}>
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}

export default EmployeeDetails;
